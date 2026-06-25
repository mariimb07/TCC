import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-600 text-white shadow-xl">
        <div className="p-6 border-b border-green-500">
          <h1 className="text-3xl font-bold">
            NutriGuide
          </h1>
          <p className="text-green-100 text-sm mt-1">
            Painel Administrativo
          </p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-700 transition"
              >
                📊 Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/admin/usuarios"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-700 transition"
              >
                👥 Usuários
              </Link>
            </li>

            <li>
              <Link
                to="/admin/planos"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-700 transition"
              >
                🥗 Planos Alimentares
              </Link>
            </li>

            <li>
              <Link
                to="/admin/refeicoes"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-700 transition"
              >
                🍽️ Refeições
              </Link>
            </li>

            <li>
              <Link
                to="/admin/acompanhamento"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-700 transition"
              >
                📈 Acompanhamento Nutricional
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 w-72 p-4 border-t border-green-500">
          <button className="w-full bg-green-700 hover:bg-green-800 py-3 rounded-xl transition">
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800">
            Dashboard
          </h2>

          <p className="text-gray-500 mt-2">
            Visão geral da plataforma NutriGuide.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Usuários</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">
              128
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Planos</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">
              34
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Refeições</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">
              512
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Acompanhamentos</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">
              76
            </p>
          </div>
        </div>

        {/* Atividades recentes */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-2xl font-semibold mb-4">
            Atividades Recentes
          </h3>

          <div className="space-y-4">
            <div className="border-b pb-3">
              Novo usuário cadastrado.
            </div>

            <div className="border-b pb-3">
              Plano alimentar atualizado.
            </div>

            <div className="border-b pb-3">
              Nova refeição adicionada ao sistema.
            </div>

            <div>
              Relatório nutricional gerado.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}