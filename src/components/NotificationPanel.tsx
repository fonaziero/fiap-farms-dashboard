import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Info, AlertTriangle } from "lucide-react";

type Notification = {
  message: string;
  severity: "critical" | "medium" | "info";
};

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const querySnapshot = await getDocs(collection(db, "notifications"));
      const list: Notification[] = querySnapshot.docs.map(doc => doc.data() as Notification);
      setNotifications(list);
    };

    fetchNotifications();
  }, []);

  const grouped = {
    critical: notifications.filter(n => n.severity === "critical"),
    medium: notifications.filter(n => n.severity === "medium"),
    info: notifications.filter(n => n.severity === "info"),
  };

  return (
    <div className="bg-background p-6 rounded shadow animate-in fade-in duration-300">
      <h2 className="text-xl font-semibold mb-4">Notificações</h2>

      {Object.entries(grouped).map(([severity, items]) =>
        items.length > 0 ? (
          <div key={severity} className="mb-4">
            <ul className="space-y-2">
              {items.map((note, index) => {
                const icon =
                  severity === "critical" ? (
                    <AlertCircle className="text-red-600 w-5 h-5" />
                  ) : severity === "medium" ? (
                    <AlertTriangle className="text-yellow-600 w-5 h-5" />
                  ) : (
                    <Info className="text-blue-600 w-5 h-5" />
                  );

                const badgeColor =
                  severity === "critical"
                    ? "bg-red-100 text-red-700"
                    : severity === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-700";

                return (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-4 p-3 rounded-md border bg-card text-card-foreground hover:bg-secondary transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      {icon}
                      <span>{note.message}</span>
                    </div>
                    <Badge className={badgeColor}>{severity}</Badge>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null
      )}
    </div>
  );
}
