import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import StatsCards from '../components/StatsCards';
import NotificationPanel from '../components/NotificationPanel';
import FarmMap from '../components/FarmMap';
import Sidebar from '../components/Sidebar';
import ProductionChartSection from '../components/ProductionChartSection';
import Header from '../components/Header';

export default function Dashboard() {



  const data = [
    { mes: 'Jan', producao: 400, gastos: 200 },
    { mes: 'Fev', producao: 600, gastos: 300 },
    { mes: 'Mar', producao: 550, gastos: 250 },
    { mes: 'Abr', producao: 700, gastos: 400 },
    { mes: 'Mai', producao: 670, gastos: 280 },
    { mes: 'Jun', producao: 800, gastos: 450 },
    { mes: 'Jul', producao: 0, gastos: 0 },
    { mes: 'Ago', producao: 0, gastos: 0 },
    { mes: 'Set', producao: 0, gastos: 0 },
    { mes: 'Out', producao: 0, gastos: 0 },
    { mes: 'Nov', producao: 0, gastos: 0 },
    { mes: 'Dez', producao: 0, gastos: 0 },
  ];

  return (
    <div className="relative flex">
      <main className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="bg-background p-6 rounded shadow col-span-full">
          <h2 className="text-xl font-semibold mb-4">Localização das Fazendas</h2>
          <FarmMap />
        </div>

        <StatsCards />
        <NotificationPanel />

        <ProductionChartSection />
      </main>
    </div>
  );
}
