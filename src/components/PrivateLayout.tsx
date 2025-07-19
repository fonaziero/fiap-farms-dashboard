// src/components/PrivateLayout.tsx
import { onAuthStateChanged, type User } from 'firebase/auth';
import Header from './Header';
import Sidebar from './Sidebar';
import { type ReactNode, useEffect, useState } from 'react';
import { auth } from '../firebase';

export default function PrivateLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 min-h-screen bg-card p-0 md:p-6 md:ml-64">
                <Header user={user} setSidebarOpen={setSidebarOpen} />

                <div className="flex-1  bg-card p-3 md:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
