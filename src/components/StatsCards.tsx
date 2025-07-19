// src/components/StatsCards.tsx
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Stat {
  id: string;
  title: string;
  value: number;
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function StatsCards() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const snapshot = await getDocs(collection(db, 'sales'));
      const data = snapshot.docs.map((doc) => {
        const { title, value } = doc.data();
        return {
          id: doc.id,
          title,
          value: Number(value),
        };
      });

      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-background p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Vendas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.id}>
            <CardHeader className="font-semibold text-gray-500 text-sm">{stat.title}</CardHeader>
            <CardContent className="text-2xl font-bold">{formatCurrency(stat.value)}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
