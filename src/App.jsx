import React, { useState, useMemo } from 'react';
import { 
  Home, 
  Building2, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Users, 
  Car, 
  Maximize2,
  Info,
  MessageCircle
} from 'lucide-react';

const PROTOTIPOS = [
  {
    id: 'piamonte',
    nombre: 'Piamonte',
    tipo: 'Departamento',
    construccion: 46,
    recamaras: 2,
    banos: 1,
    estacionamiento: 1,
    precioBase: 1250000,
    descripcion: '2 recámaras, sala, comedor, cocina, patio de servicio.',
    color: 'blue'
  },
  {
    id: 'alcala',
    nombre: 'Alcalá',
    tipo: 'Departamento',
    construccion: 53,
    recamaras: 2,
    banos: 1,
    estacionamiento: 1,
    areaTV: true,
    precioBase: 1450000,
    descripcion: '2 recámaras + Área de TV, sala, comedor, cocina.',
    color: 'indigo'
  },
  {
    id: 'cordoba',
    nombre: 'Córdoba',
    tipo: 'Casa',
    construccion: 68.74,
    recamaras: 2,
    banos: 1.5,
    estacionamiento: 2,
    niveles: 2,
    precioBase: 2150000,
    descripcion: '2 niveles, jardín privado, 2 cajones de estacionamiento.',
    color: 'emerald'
  },
  {
    id: 'cantabria',
    nombre: 'Cantabria',
    tipo: 'Casa',
    construccion: 91,
    recamaras: 3,
    banos: 1.5,
    estacionamiento: 2,
    niveles: 2,
    precioBase: 2550000,
    descripcion: 'El modelo más amplio. 3 recámaras, jardín y acabados premium.',
    color: 'teal'
  },
  {
    id: 'nuevo',
    nombre: 'Nuevo Prototipo 2026',
    tipo: 'Residencial Plus',
    construccion: 115,
    recamaras: 3,
    banos: 2.5,
    estacionamiento: 2,
    niveles: 2,
    precioBase: 3100000,
    proximamente: true,
    descripcion: 'Lanzamiento Mayo/Junio. Diseñada para el nuevo segmento residencial.',
    color: 'purple'
  }
];

const App = () => {
  const [selectedId, setSelectedId] = useState(PROTOTIPOS[0].id);
  const [enganchePercent, setEnganchePercent] = useState(10);
  const [plazoAnios, setPlazoAnios] = useState(20);
  const tasaAnual = 10.5; // Tasa promedio fija para el ejercicio

  const seleccionado = useMemo(() => 
    PROTOTIPOS.find(p => p.id === selectedId), [selectedId]
  );

  const calculos = useMemo(() => {
    const montoEnganche = (seleccionado.precioBase * enganchePercent) / 100;
    const montoCredito = seleccionado.precioBase - montoEnganche;
    const tasaMensual = (tasaAnual / 100) / 12;
    const numeroPagos = plazoAnios * 12;
    
    // Fórmula de pago amortizado: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    const mensualidad = montoCredito * (tasaMensual * Math.pow(1 + tasaMensual, numeroPagos)) / 
      (Math.pow(1 + tasaMensual, numeroPagos) - 1);

    // Ahorro estimado EDGE (50% en servicios base de ~1800 pesos)
    const ahorroEdge = 900;

    return {
      montoEnganche,
      montoCredito,
      mensualidad: Math.round(mensualidad),
      ahorroEdge,
      pagoEfectivo: Math.round(mensualidad - ahorroEdge)
    };
  }, [seleccionado, enganchePercent, plazoAnios]);

  const formatCurrency = (val) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Real Solare</h1>
            <p className="text-slate-500 mt-1">Cotizador Residencial Interactivo</p>
          </div>
          <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 self-center md:self-auto">
            <Zap size={16} /> Certificación EDGE: Ahorro hasta 50% en servicios
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Columna Izquierda: Selección */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Modelos */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Home size={20} className="text-indigo-600" /> 
                1. Selecciona tu prototipo
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROTOTIPOS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all text-left flex flex-col gap-2 ${
                      selectedId === p.id 
                      ? 'border-indigo-600 bg-white shadow-lg ring-4 ring-indigo-50' 
                      : 'border-white bg-white hover:border-slate-200 shadow-sm'
                    }`}
                  >
                    {p.proximamente && (
                      <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md uppercase">
                        Próximamente
                      </span>
                    )}
                    <div className="flex justify-between items-start">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        p.tipo === 'Casa' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {p.tipo}
                      </span>
                      <span className="font-bold text-indigo-600">{formatCurrency(p.precioBase)}</span>
                    </div>
                    <h3 className="font-bold text-lg">{p.nombre}</h3>
                    <div className="flex gap-4 text-slate-500 text-xs">
                      <span className="flex items-center gap-1"><Maximize2 size={14}/> {p.construccion}m²</span>
                      <span className="flex items-center gap-1"><Users size={14}/> {p.recamaras} rec.</span>
                      <span className="flex items-center gap-1"><Car size={14}/> {p.estacionamiento}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Configuración Financiera */}
            <section className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 border-b pb-4">
                <DollarSign size={20} className="text-indigo-600" /> 
                2. Configura tu crédito
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-medium text-slate-600">Porcentaje de Enganche</label>
                  <span className="text-lg font-bold text-indigo-600">{enganchePercent}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="40" 
                  step="5"
                  value={enganchePercent}
                  onChange={(e) => setEnganchePercent(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest px-1">
                  <span>Mínimo (10%)</span>
                  <span>40%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                    <Calendar size={14}/> Plazo
                  </label>
                  <select 
                    value={plazoAnios}
                    onChange={(e) => setPlazoAnios(parseInt(e.target.value))}
                    className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={10}>10 años</option>
                    <option value={15}>15 años</option>
                    <option value={20}>20 años</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                    <Info size={14}/> Tasa Anual
                  </label>
                  <div className="p-3 rounded-lg border border-slate-100 bg-slate-100 text-slate-500 font-semibold cursor-not-allowed">
                    {tasaAnual}% (Fija)
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Columna Derecha: Resultado */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-4">
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
                
                <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-6">Resumen de mensualidad</h3>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold tracking-tight">{formatCurrency(calculos.mensualidad)}</span>
                  <span className="text-slate-400 ml-2">/ mes*</span>
                </div>

                <div className="space-y-4 border-t border-slate-800 pt-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Precio de lista</span>
                    <span className="font-semibold">{formatCurrency(seleccionado.precioBase)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Enganche ({enganchePercent}%)</span>
                    <span className="font-semibold">{formatCurrency(calculos.montoEnganche)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-4">
                    <span className="text-slate-400">Monto a financiar</span>
                    <span className="font-semibold">{formatCurrency(calculos.montoCredito)}</span>
                  </div>
                  
                  <div className="bg-emerald-950/50 p-4 rounded-xl border border-emerald-900/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-emerald-400 text-xs font-bold uppercase">Mensualidad Real (con ahorro EDGE)</span>
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-emerald-100">{formatCurrency(calculos.pagoEfectivo)}</span>
                      <span className="text-xs text-emerald-500 line-through">{formatCurrency(calculos.mensualidad)}</span>
                    </div>
                    <p className="text-[10px] text-emerald-400/80 mt-2">
                      Ahorras aprox. {formatCurrency(calculos.ahorroEdge)} mensuales en servicios gracias a tu casa ecológica.
                    </p>
                  </div>
                </div>

                <button 
                  className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                  onClick={() => alert('¡Gracias por tu interés! Un asesor de Real Solare te contactará pronto.')}
                >
                  Me interesa esta opción <ArrowRight size={18} />
                </button>
              </div>

              {/* Botones secundarios */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
                  <Info size={16}/> Ver detalles
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition-colors">
                  <MessageCircle size={16}/> WhatsApp
                </button>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl text-[11px] text-blue-700/80 leading-relaxed border border-blue-100">
                *Este cálculo es informativo y aproximado. El monto final puede variar dependiendo del perfil crediticio, gastos notariales, seguros y el valor comercial actualizado de la vivienda. La certificación EDGE garantiza un estándar constructivo de alta eficiencia energética.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;