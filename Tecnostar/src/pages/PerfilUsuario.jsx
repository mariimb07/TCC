import { useState } from "react";

export default function PerfilUsuario() {
  const [usuario, setUsuario] = useState({
    nome: "Mariana Miranda",
    idade: 30,
    peso: 75,
    altura: 165,
    objetivo: "Perda de Peso",
    foto: null,
  });

  const [historicoPeso] = useState([
    { data: "01/09", peso: 78 },
    { data: "08/09", peso: 77 },
    { data: "15/09", peso: 76 },
    { data: "22/09", peso: 75 },
  ]);

  const handleFoto = (e) => {
    const arquivo = e.target.files[0];

    if (arquivo) {
      setUsuario({
        ...usuario,
        foto: URL.createObjectURL(arquivo),
      });
    }
  };

  const imc = (
    usuario.peso /
    Math.pow(usuario.altura / 100, 2)
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex flex-col md:flex-row gap-8">

            {/* FOTO */}
            <div className="flex flex-col items-center">
              <img
                src={
                  usuario.foto ||
                  "https://via.placeholder.com/200"
                }
                alt="Perfil"
                className="w-48 h-48 rounded-full object-cover border-4 border-green-500"
              />

              <label className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700">
                Alterar Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFoto}
                  className="hidden"
                />
              </label>
            </div>

            {/* DADOS */}
            <div className="flex-1">

              <h1 className="text-4xl font-bold text-green-600 mb-6">
                Meu Perfil
              </h1>

              <div className="grid md:grid-cols-2 gap-4">

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold">Nome</h3>
                  <p>{usuario.nome}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold">Idade</h3>
                  <p>{usuario.idade} anos</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold">Peso Atual</h3>
                  <p>{usuario.peso} kg</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold">Altura</h3>
                  <p>{usuario.altura} cm</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold">IMC</h3>
                  <p>{imc}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold">Objetivo</h3>
                  <p>{usuario.objetivo}</p>
                </div>

              </div>
            </div>

          </div>

          {/* EVOLUÇÃO */}
          <div className="mt-10">

            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Evolução de Peso
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white border rounded-xl">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="p-3">Data</th>
                    <th className="p-3">Peso</th>
                  </tr>
                </thead>

                <tbody>
                  {historicoPeso.map((item, index) => (
                    <tr key={index} className="text-center border-b">
                      <td className="p-3">{item.data}</td>
                      <td className="p-3">
                        {item.peso} kg
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

          {/* ESTATÍSTICAS */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">

            <div className="bg-green-100 p-6 rounded-xl">
              <h3 className="font-bold text-lg">
                Peso Perdido
              </h3>
              <p className="text-3xl font-bold text-green-700">
                3 kg
              </p>
            </div>

            <div className="bg-blue-100 p-6 rounded-xl">
              <h3 className="font-bold text-lg">
                Dietas Geradas
              </h3>
              <p className="text-3xl font-bold text-blue-700">
                12
              </p>
            </div>

            <div className="bg-orange-100 p-6 rounded-xl">
              <h3 className="font-bold text-lg">
                Meta Atual
              </h3>
              <p className="text-xl font-bold text-orange-700">
                70 kg
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
``