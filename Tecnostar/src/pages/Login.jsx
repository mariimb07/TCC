import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {

      const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui futuramente você fará a autenticação
    navigate("/dashboard");
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-emerald-100 flex items-center justify-center px-6">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Lado esquerdo */}
        <div className="hidden lg:flex flex-col justify-center bg-green-600 text-white p-12">
          <h1 className="text-5xl font-bold mb-6">
            NutriGuide
          </h1>

          <p className="text-lg text-green-100 mb-8">
            Sua plataforma de orientação alimentar saudável e acompanhamento nutricional.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-xl">
                🥗 Planos personalizados
              </h3>
              <p className="text-green-100">
                Recomendações adaptadas ao seu perfil.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl">
                📈 Acompanhamento de metas
              </h3>
              <p className="text-green-100">
                Monitore sua evolução diariamente.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl">
                🤖 Inteligência nutricional
              </h3>
              <p className="text-green-100">
                Sugestões inteligentes para hábitos mais saudáveis.
              </p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800">
                Bem-vindo de volta
              </h2>

              <p className="text-gray-500 mt-3">
                Entre para acessar sua jornada saudável
              </p>
            </div>

           <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  E-mail
                </label>

                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Senha
                </label>

                <input
                  type="password"
                  placeholder="********"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Lembrar-me
                </label>

                <a
                  href="#"
                  className="text-green-600 hover:text-green-700"
                >
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300"
              >
                Entrar
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500">
                Ainda não possui conta?
              </p>

              <button className="mt-3 w-full border border-green-600 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition">
                Criar Conta
              </button>
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                ← Voltar para página inicial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}