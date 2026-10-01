import { useState } from "react";

export default function PlanoAlimentar() {
  const [plano] = useState({
    calorias: 2200,
    proteinas: 180,
    carboidratos: 220,
    gorduras: 65,
  });

  const refeicoes = [
    {
      horario: "07:00",
      titulo: "Café da Manhã",
      alimentos: [
        "3 ovos mexidos",
        "2 fatias de pão integral",
        "1 banana",
      ],
    },
    {
      horario: "10:00",
      titulo: "Lanche da Manhã",
      alimentos: [
        "Iogurte natural",
        "Castanhas",
      ],
    },
    {
      horario: "13:00",
      titulo: "Almoço",
      alimentos: [
        "150g Frango grelhado",
        "100g Arroz integral",
        "Feijão",
        "Salada",
      ],
    },
    {
      horario: "16:00",
      titulo: "Lanche da Tarde",
      alimentos: [
        "Banana",
        "Aveia",
        "Pasta de amendoim",
      ],
    },
    {
      horario: "20:00",
      titulo: "Jantar",
      alimentos: [
        "Peixe grelhado",
        "Batata-doce",
        "Legumes",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-600">
            Meu Plano Alimentar
          </h1>

          <p className="text-gray-600 mt-2">
            Acompanhe sua alimentação e metas nutricionais.
          </p>
        </div>

        {/* RESUMO */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-gray-500">Calorias</h3>
            <p className="text-3xl font-bold text-green-600">
              {plano.calorias}
            </p>
            <span>kcal/dia</span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-gray-500">Proteínas</h3>
            <p className="text-3xl font-bold text-blue-600">
              {plano.proteinas}g
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-gray-500">Carboidratos</h3>
            <p className="text-3xl font-bold text-yellow-500">
              {plano.carboidratos}g
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-gray-500">Gorduras</h3>
            <p className="text-3xl font-bold text-red-500">
              {plano.gorduras}g
            </p>
          </div>

        </div>

        {/* REFEIÇÕES */}
        <h2 className="text-2xl font-bold mb-4">
          Refeições do Dia
        </h2>

        <div className="grid lg:grid-cols-2 gap-5">

          {refeicoes.map((refeicao, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-2xl p-6"
            >
              <div className="flex justify-between mb-4">
                <h3 className="font-bold text-xl">
                  {refeicao.titulo}
                </h3>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg">
                  {refeicao.horario}
                </span>
              </div>

              <ul className="space-y-2">
                {refeicao.alimentos.map((item, i) => (
                  <li key={i}>
                    ✅ {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* PROGRESSO */}
        <div className="mt-10 bg-white rounded-2xl p-6 shadow">

          <h2 className="text-2xl font-bold mb-6">
            Progresso Diário
          </h2>

          <div className="mb-4">
            <div className="flex justify-between">
              <span>Plano Alimentar</span>
              <span>75%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full w-3/4"></div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between">
              <span>Consumo de Água</span>
              <span>2L / 3L</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-blue-500 h-4 rounded-full w-2/3"></div>
            </div>
          </div>

        </div>

        {/* AÇÕES */}
        <div className="mt-8 flex gap-4">

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl">
            Gerar Novo Plano com IA
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
            Baixar Plano PDF
          </button>

        </div>

      </div>
    </div>
  );
}