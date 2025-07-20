import { useState } from 'react';
import { BarChart, LineChart, AreaChart, X } from 'lucide-react';
import GenericChart from './GenericChart';
import { Badge } from './ui/badge';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';

type Produto = {
  name: string;
  producao: number;
  gastos: number;
  receita: number;
  aguardando: number;
  emProducao: number;
  colhido: number;
};


const fullData: { mes: string; produtos: Produto[] }[] = [
  {
    mes: 'Jan',
    produtos: [
      { name: 'milho', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'café', producao: 200, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'cana', producao: 600, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'trigo', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
    ],
  },
  {
    mes: 'Fev',
    produtos: [
      { name: 'milho', producao: 200, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'café', producao: 600, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'cana', producao: 800, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'trigo', producao: 1000, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
    ],
  },
  {
    mes: 'Mar', produtos: [
      { name: 'milho', producao: 800, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'café', producao: 100, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'cana', producao: 600, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'trigo', producao: 300, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
    ],
  },
  {
    mes: 'Abr', produtos: [
      { name: 'milho', producao: 900, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'café', producao: 700, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'cana', producao: 300, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'trigo', producao: 700, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
    ],
  },
  {
    mes: 'Mai', produtos: [
      { name: 'milho', producao: 900, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'café', producao: 600, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'cana', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'trigo', producao: 700, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
    ],
  },
  {
    mes: 'Jun', produtos: [
      { name: 'milho', producao: 100, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'café', producao: 200, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'cana', producao: 700, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'trigo', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
    ],
  },
  {
    mes: 'Jul', produtos: [
      { name: 'milho', producao: 300, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'café', producao: 500, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'cana', producao: 500, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'trigo', producao: 700, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
    ],
  },
  {
    mes: 'Ago', produtos: [
      { name: 'milho', producao: 800, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'café', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'cana', producao: 200, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'trigo', producao: 700, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
    ],
  },
  {
    mes: 'Set', produtos: [
      { name: 'milho', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'café', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'cana', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'trigo', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
    ],
  },
  {
    mes: 'Out', produtos: [
      { name: 'milho', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'café', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'cana', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'trigo', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
    ],
  },
  {
    mes: 'Nov', produtos: [
      { name: 'milho', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'café', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'cana', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'trigo', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
    ],
  },
  {
    mes: 'Dez', produtos: [
      { name: 'milho', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'café', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'cana', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
      { name: 'trigo', producao: 400, gastos: 200, receita: 600, aguardando: 10, emProducao: 20, colhido: 5 },
    ],
  },
];

const availableMetrics = [
  { key: 'producao', label: 'Produção' },
  { key: 'gastos', label: 'Gastos' },
  { key: 'receita', label: 'Receita' },
  { key: 'aguardando', label: 'Aguardando' },
  { key: 'emProducao', label: 'Em Produção' },
  { key: 'colhido', label: 'Colhido' },
];

const colorMap: Record<string, string> = {
  milho: '#22c55e',
  café: '#f97316',
  cana: '#3b82f6',
  trigo: '#eab308',
};

export default function ProductionChartSection() {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('line');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['producao']);

  const allProductNames = Array.from(
    new Set(fullData.flatMap(item => item.produtos.map(p => p.name)))
  );
  const [selectedProducts, setSelectedProducts] = useState<string[]>([allProductNames[0]]);

  const toggleMetric = (key: string) => {
    setSelectedMetrics(prev =>
      prev.includes(key) ? prev.filter(m => m !== key) : [...prev, key]
    );
  };

  const removeProduct = (product: string) => {
    setSelectedProducts(selectedProducts.filter(p => p !== product));
  };

  const addProduct = (product: string) => {
    if (!selectedProducts.includes(product)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const data = fullData.map(item => {
    const entry: Record<string, any> = { mes: item.mes };
    selectedProducts.forEach(product => {
      const prod = item.produtos.find(p => p.name === product);
      selectedMetrics.forEach(metric => {
        entry[`${product}-${metric}`] = prod?.[metric as keyof Produto] ?? 0;
      });
    });
    return entry;
  });

  const dataKeys = selectedProducts.flatMap(product =>
    selectedMetrics.map(metric => `${product}-${metric}`)
  );

  const labels = selectedProducts.flatMap(product =>
    selectedMetrics.map(metric => {
      const label = availableMetrics.find(m => m.key === metric)?.label || metric;
      return `${capitalize(product)} - ${label}`;
    })
  );

  const colors = selectedProducts.flatMap(product =>
    selectedMetrics.map(() => colorMap[product] || '#8884d8')
  );

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="bg-background p-6 rounded shadow col-span-full">
      {/* Header: Título + Filtros */}
      <div className="flex flex-col gap-3 md:gap-6 md:flex-row md:justify-between md:items-start">

        {/* Bloco 1: Título + Filtros de Métricas */}
        <div className="flex flex-col md:max-w-[60%]">
          <h2 className="text-xl font-semibold mb-4">Comparativo de Produção</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {availableMetrics.map(metric => (
              <Badge
                key={metric.key}
                onClick={() => toggleMetric(metric.key)}
                className={`cursor-pointer flex items-center gap-1 ${selectedMetrics.includes(metric.key)
                  ? 'bg-green-600 text-white hover:bg-green-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-secondary hover:text-card-foreground'
                  }`}
              >
                {metric.label}
                {selectedMetrics.includes(metric.key) && (
                  <X size={12} className="ml-1" />
                )}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedProducts.map(product => (
              <Badge
                key={product}
                className="flex items-center gap-1"
                style={{ backgroundColor: colorMap[product], color: 'white' }}
              >
                {capitalize(product)}
                <X
                  size={12}
                  className="cursor-pointer"
                  onClick={() => removeProduct(product)}
                />
              </Badge>
            ))}

            {allProductNames
              .filter(p => !selectedProducts.includes(p))
              .map(product => (
                <button
                  key={product}
                  onClick={() => addProduct(product)}
                  className="px-3 py-1 rounded border text-sm bg-gray-200 text-gray-800 hover:bg-secondary hover:text-card-foreground capitalize"
                >
                  + {product}
                </button>
              ))}
          </div>
        </div>


        <div className="mt-6 flex flex-col md:flex-col md:justify-between md:items-end gap-4">
          {/* Botões de tipo de gráfico */}
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded ${chartType === 'line'
                ? 'bg-card text-card-foreground'
                : 'bg-secondary'
                }`}
            >
              <LineChart size={18} />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded ${chartType === 'bar'
                ? 'bg-card text-card-foreground'
                : 'bg-secondary'
                }`}
            >
              <BarChart size={18} />
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`p-2 rounded ${chartType === 'area'
                ? 'bg-card text-card-foreground'
                : 'bg-secondary'
                }`}
            >
              <AreaChart size={18} />
            </button>
          </div>

          {/* Botões de exportação */}
          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              onClick={() => exportToCSV('dados-producao', data)}
            >
              Exportar CSV
            </button>
            <button
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
              onClick={() => exportToPDF('dados-producao', data)}
            >
              Exportar PDF
            </button>
          </div>
        </div>
      </div>


      {/* Gráfico */}
      <div className="mt-6">
        <GenericChart
          data={data}
          xKey="mes"
          dataKeys={dataKeys}
          labels={labels}
          colors={colors}
          type={chartType}
          height={300}
        />
      </div>
    </div>

  );
}