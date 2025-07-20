import StatsCards from '../components/StatsCards';
import NotificationPanel from '../components/NotificationPanel';
import FarmMap from '../components/FarmMap';
import ProductionChartSection from '../components/ProductionChartSection';

export default function Dashboard() {

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
