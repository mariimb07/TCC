import { useState } from "react";

export default function AcompNutri() {
    const [dados, setDados] = useState({
        nome: "",
        idade: "",
        sexo: "",
        peso: "",
        altura: "",
        objetivo: "",
        atividade: "",
        restricoes: "",
    });

    const [resultado, setResultado] = useState(null);

    const handleChange = (e) => {
        setDados({
            ...dados,
            [e.target.name]: e.target.value,
        });
    };

    const gerarPlano = (e) => {
        e.preventDefault();

        const alturaMetros = dados.altura / 100;
        const imc = (
            dados.peso /
            (alturaMetros * alturaMetros)
        ).toFixed(1);

        let calorias = 2000;

        if (dados.objetivo === "emagrecer") calorias = 1800;
        if (dados.objetivo === "manter") calorias = 2200;
        if (dados.objetivo === "ganhar") calorias = 2800;

        setResultado({
            imc,
            calorias,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">

                    <h1 className="text-4xl font-bold text-center text-green-600 mb-3">
                        Acompanhamento Nutricional
                    </h1>

                    <p className="text-center text-gray-600 mb-8">
                        Preencha seus dados para receber uma sugestão alimentar personalizada.
                    </p>

                    <form
                        onSubmit={gerarPlano}
                        className="grid md:grid-cols-2 gap-6"
                    >
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome completo"
                            value={dados.nome}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="number"
                            name="idade"
                            placeholder="Idade"
                            value={dados.idade}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <select
                            name="sexo"
                            value={dados.sexo}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        >
                            <option value="">Selecione o sexo</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                        </select>

                        <input
                            type="number"
                            name="peso"
                            placeholder="Peso (kg)"
                            value={dados.peso}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="number"
                            name="altura"
                            placeholder="Altura (cm)"
                            value={dados.altura}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <select
                            name="objetivo"
                            value={dados.objetivo}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        >
                            <option value="">Objetivo</option>
                            <option value="emagrecer">Perder Peso</option>
                            <option value="manter">Manter Peso</option>
                            <option value="ganhar">Ganhar Massa</option>
                        </select>

                        <select
                            name="atividade"
                            value={dados.atividade}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        >
                            <option value="">Nível de Atividade</option>
                            <option value="sedentario">Sedentário</option>
                            <option value="leve">Leve</option>
                            <option value="moderado">Moderado</option>
                            <option value="intenso">Intenso</option>
                        </select>

                        <textarea
                            name="restricoes"
                            placeholder="Restrições alimentares, alergias ou preferências"
                            value={dados.restricoes}
                            onChange={handleChange}
                            className="border p-3 rounded-lg md:col-span-2"
                            rows="4"
                        />

                        <button
                            type="submit"
                            className="md:col-span-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                        >
                            Gerar Plano Nutricional
                        </button>
                    </form>

                    {resultado && (
                        <div className="mt-10 bg-green-50 p-6 rounded-2xl">
                            <h2 className="text-2xl font-bold text-green-700 mb-4">
                                Plano Personalizado
                            </h2>

                            <p>
                                <strong>Nome:</strong> {dados.nome}
                            </p>

                            <p>
                                <strong>IMC:</strong> {resultado.imc}
                            </p>

                            <p>
                                <strong>Meta Calórica:</strong>{" "}
                                {resultado.calorias} kcal/dia
                            </p>

                            <p>
                                <strong>Objetivo:</strong> {dados.objetivo}
                            </p>

                            <p>
                                <strong>Restrições:</strong>{" "}
                                {dados.restricoes || "Nenhuma informada"}
                            </p>

                            <div className="mt-4">
                                <h3 className="font-bold text-lg">
                                    Sugestão de Dieta
                                </h3>

                                <ul className="list-disc ml-5 mt-2">
                                    <li>Café da manhã: Ovos, frutas e aveia.</li>
                                    <li>Almoço: Arroz integral, proteína magra e salada.</li>
                                    <li>Lanche: Iogurte ou castanhas.</li>
                                    <li>Jantar: Legumes e proteína leve.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}