import {
  User,
  Target,
  Scale,
  Droplets,
  Utensils,
} from "react";

export default function DashboardCliente() {
  const usuario = {
    nome: "Mariana Miranda",
    pesoAtual: 75,
    pesoMeta: 70,
    calorias: 2200,
    agua: 2,
    metaAgua: 3,
  };

  const percentualPeso =
    ((usuario.pesoMeta / usuario.pesoAtual) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-600">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Bem-vinda, {usuario.nome}
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between">
              <h3 className="font-semibold">
                Peso Atual
              </h3>

              <Scale className="text-green-600" />
            </div>

            <p className="text-3xl font-bold mt-4">
              {usuario.pesoAtual} kg
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between">
              <h3 className="font-semibold">
                Meta
              </h3>

              <Target className="text-blue-600" />
            </div>

            <p className="text-3xl font-bold mt-4">
              {usuario.pesoMeta} kg
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between">
              <h3 className="font-semibold">
                Calorias
              </h3>

              <Utensils className="text-orange-500" />
            </div>

            <p className="text-3xl font-bold mt-4">
              {usuario.calorias}
            </p>

            <span>kcal/dia</span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between">
              <h3 className="font-semibold">
                Água
              </h3>

              <Droplets className="text-cyan-500" />
            </div>

            <p className="text-3xl font-bold mt-4">
              {usuario.agua}L
            </p>

            <span>Meta: {usuario.metaAgua}L</span>
          </div>

        </div>

        {/* PERFIL */}
        <div className="bg-white rounded-2xl shadow mt-8 p-6">

          <div className="flex items-center gap-4">

            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <User size={40} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {usuario.nome}
              </h2>

              <p className="text-gray-500">
                Acompanhamento Nutricional
              </p>
            </div>

          </div>

        </div>

        {/* EVOLUÇÃO */}
        <div className="bg-white rounded-2xl shadow mt-8 p-6">

          <h2 className="text-2xl font-bold mb-4">
            Evolução da Meta
          </h2>

          <div className="w-full bg-gray-200 rounded-full h-5">

            <div
              className="bg-green-600 h-5 rounded-full"
              style={{
                width: `${percentualPeso}%`,
              }}
            ></div>

          </div>

          <p className="mt-3 text-gray-600">
            Progresso: {percentualPeso}%
          </p>

        </div>

        {/* PLANO ALIMENTAR */}
        <div className="bg-white rounded-2xl shadow mt-8 p-6">

          <h2 className="text-2xl font-bold mb-5">
            Plano Alimentar de Hoje
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="border rounded-xl p-4">
              <h3 className="font-bold text-green-600">
                Café da Manhã
              </h3>
              <p>2 ovos mexidos</p>
              <p>1 banana</p>
              <p>Aveia</p>
            </div>

            <div className="border rounded-xl p-4">
              <h3 className="font-bold text-green-600">
                Almoço
              </h3>
              <p>150g frango</p>
              <p>100g arroz integral</p>
              <p>Salada</p>
            </div>

            <div className="border rounded-xl p-4">
              <h3 className="font-bold text-green-600">
                Lanche
              </h3>
              <p>Iogurte natural</p>
              <p>Castanhas</p>
            </div>

            <div className="border rounded-xl p-4">
              <h3 className="font-bold text-green-600">
                Jantar
              </h3>
              <p>Peixe grelhado</p>
              <p>Legumes</p>
            </div>

          </div>

        </div>

        {/* BOTÕES */}
        <div className="flex flex-wrap gap-4 mt-8">

          <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700">
            Gerar Nova Dieta IA
          </button>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
            Ver Perfil
          </button>

          <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700">
            Histórico
          </button>

        </div>

      </div>
    </div>
  );
}