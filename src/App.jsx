import React, { useState, useMemo } from 'react';
import { 
  Home, 
  Building2, 
  DollarSign, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Users, 
  Car, 
  Maximize2,
  Info,
  MessageCircle,
  Briefcase,
  ShieldCheck,
  ChevronRight
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
    costoEquipamiento: 110000,
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
    precioBase: 1450000,
    costoEquipamiento: 110000,
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
    precioBase: 2150000,
    costoEquipamiento: 195000,
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
    precioBase: 2550000,
    costoEquipamiento: 195000,
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
    precioBase: 3100000,
    costoEquipamiento: 220000,
    proximamente: true,
    color: 'purple'
  }
];

const App = () => {
  const [creditType, setCreditType] = useState('bancario'); // 'bancario' | 'infonavit'
  const [selectedId, setSelectedId] = useState(PROTOTIPOS[0].id);
  const [withEquipment, setWithEquipment] = useState(false);
  const [enganchePercent, setEnganchePercent] = useState(10); // 10 | 30
  
  const plazoAnios = 20;
  const tasaBancaria = 10.5;
  const tasaInfonavit = 9.2; // Tasa simulada Infonavit

  const seleccionado = useMemo(() => 
    PROTOTIPOS.find(p => p.id === selectedId), [selectedId]
  );

  const calculos = useMemo(() => {
    const precioTotal = seleccionado.precioBase + (withEquipment ? seleccionado.costoEquipamiento : 0);
    const tasaFinal = creditType === 'infonavit' ? tasaInfonavit : tasaBancaria;
    
    // Para Infonavit el enganche suele ser desde la subcuenta, aquí simulamos un pago basado en el 100% financiado o parcial
    const realEnganche = creditType === 'bancario' ? enganchePercent : 0;
    const montoEnganche = (precioTotal * realEnganche) / 100;
    const montoCredito = precioTotal - montoEnganche;
    
    const tasaMensual = (tasaFinal / 100) / 12;
    const numeroPagos = plazoAnios * 12;
    
    const mensualidad = montoCredito * (tasaMensual * Math.pow(1 + tasaMensual, numeroPagos)) / 
      (Math.pow(1 + tasaMensual, numeroPagos) - 1);

    const ahorroEdge = 950;

    return {
      precioTotal,
      montoEnganche,
      montoCredito,
      mensualidad: Math.round(mensualidad),
      ahorroEdge,
      pagoNeto: Math.round(mensualidad - ahorroEdge)
    };
  }, [seleccionado, withEquipment, creditType, enganchePercent]);

  const formatCurrency = (val) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Banner Superior */}
      <div className="bg-indigo-900 text-white py-3 px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
        <Zap size={14} className="text-yellow-400" /> Viviendas Sustentables con Certificación EDGE
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Cotizador Real Solare</h1>
          <p className="text-slate-500 mt-2 text-lg">Configura tu próximo hogar en pasos sencillos.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CONFIGURACIÓN */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* PASO 1: TIPO DE CRÉDITO */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="bg-indigo-100 w-6 h-6 rounded-full flex items-center justify-center text-[10px]">1</span>
                Tipo de Crédito
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setCreditType('infonavit')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    creditType === 'infonavit' ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <Briefcase className={creditType === 'infonavit' ? 'text-orange-600' : 'text-slate-400'} />
                  <span className={`font-bold ${creditType === 'infonavit' ? 'text-orange-700' : 'text-slate-600'}`}>Infonavit</span>
                </button>
                <button 
                  onClick={() => setCreditType('bancario')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    creditType === 'bancario' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <Building2 className={creditType === 'bancario' ? 'text-indigo-600' : 'text-slate-400'} />
                  <span className={`font-bold ${creditType === 'bancario' ? 'text-indigo-700' : 'text-slate-600'}`}>Bancario</span>
                </button>
              </div>
            </section>

            {/* PASO 2: MODELO */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="bg-indigo-100 w-6 h-6 rounded-full flex items-center justify-center text-[10px]">2</span>
                Elige tu Prototipo
              </h2>
              <div className="space-y-3">
                {PROTOTIPOS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      selectedId === p.id ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-50 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedId === p.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {p.tipo === 'Casa' ? <Home size={24}/> : <Building2 size={24}/>}
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-slate-800">{p.nombre}</h3>
                        <p className="text-xs text-slate-500 uppercase font-medium">{p.tipo} • {p.construccion} m²</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-indigo-600">{formatCurrency(p.precioBase)}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Precio Base</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* PASO 3: EQUIPAMIENTO */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="bg-indigo-100 w-6 h-6 rounded-full flex items-center justify-center text-[10px]">3</span>
                Equipamiento
              </h2>
              <div 
                onClick={() => setWithEquipment(!withEquipment)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  withEquipment ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-slate-50'
                }`}
              >
                <div className="flex gap-4 items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${withEquipment ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Paquete Premium</h4>
                    <p className="text-xs text-slate-500">Cocina integral + Clósets + Cancelería de baño</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${withEquipment ? 'text-emerald-700' : 'text-slate-400'}`}>
                    +{formatCurrency(seleccionado.costoEquipamiento)}
                  </p>
                  <span className={`text-[10px] font-bold uppercase ${withEquipment ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {withEquipment ? 'Agregado' : 'Opcional'}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* PANEL DE RESULTADOS */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-4">
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
                {/* Decoración */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Pago Mensual Fijo</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <h2 className="text-5xl font-bold">{formatCurrency(calculos.mensualidad)}</h2>
                      <span className="text-slate-400 text-sm">/mes*</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-t border-slate-800 pt-6 mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Modelo seleccionado</span>
                    <span className="font-medium">{seleccionado.nombre}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Inversión Total</span>
                    <span className="font-medium">{formatCurrency(calculos.precioTotal)}</span>
                  </div>

                  {/* Lógica Condicional de Enganche */}
                  {creditType === 'bancario' ? (
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-3 text-center">Opción de Enganche</span>
                      <div className="flex gap-2">
                        {[10, 30].map(val => (
                          <button 
                            key={val}
                            onClick={() => setEnganchePercent(val)}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                              enganchePercent === val ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400/50' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                            }`}
                          >
                            {val}%
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-between mt-4 text-xs">
                        <span className="text-slate-400">Total a pagar de enganche:</span>
                        <span className="text-indigo-300 font-bold">{formatCurrency(calculos.montoEnganche)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-orange-950/30 p-4 rounded-xl border border-orange-900/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Info size={14} className="text-orange-400" />
                        <span className="text-orange-400 text-[10px] font-bold uppercase">Crédito Infonavit</span>
                      </div>
                      <p className="text-xs text-orange-200/70 leading-tight">
                        La mensualidad se calcula sobre el monto total financiable. Tu ahorro en la Subcuenta de Vivienda reduce el monto del préstamo.
                      </p>
                    </div>
                  )}

                  {/* Beneficio EDGE */}
                  <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 flex items-center justify-between">
                    <div>
                      <p className="text-emerald-400 text-[10px] font-bold uppercase">Mensualidad Real*</p>
                      <p className="text-xl font-bold text-emerald-50 text-emerald-100">{formatCurrency(calculos.pagoNeto)}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-emerald-400 justify-end">
                        <Zap size={12} />
                        <span className="text-[10px] font-bold">Ahorro EDGE</span>
                      </div>
                      <p className="text-[10px] text-emerald-400/80">-{formatCurrency(calculos.ahorroEdge)} /mes</p>
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                  onClick={() => alert('¡Excelente elección! Un asesor validará tu precalificación.')}
                >
                  Iniciar Trámite <ArrowRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  Descargar PDF
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors shadow-md">
                  <MessageCircle size={16}/> WhatsApp
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center px-4">
                *Mensualidad estimada a 20 años. No incluye gastos notariales ni avalúo. Sujeto a cambios sin previo aviso. La mensualidad real considera el ahorro proyectado en servicios de luz y agua.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;