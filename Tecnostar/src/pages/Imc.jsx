import { useState } from "react";

export default function Imc() {
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [resultado, setResultado] = useState(null);
    const [classificacao, setClassificacao] = useState("");

    const calcularIMC = () => {
        const imc = peso / (altura * altura);

        setResultado(imc.toFixed(2));

        if (imc < 18.5) setClassificacao("Abaixo do peso");
        else if (imc < 25) setClassificacao("Peso normal");
        else if (imc < 30) setClassificacao("Sobrepeso");
        else if (imc < 35) setClassificacao("Obesidade Grau I");
        else if (imc < 40) setClassificacao("Obesidade Grau II");
        else setClassificacao("Obesidade Grau III");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Cabeçalho */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-green-600">
                        Calculadora de IMC
                    </h1>
                </div>
            </header>

            {/* Conteúdo */}
            <main className="container mx-auto px-6 py-12">
                <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Descubra seu IMC
                    </h2>

                    <p className="text-center text-gray-600 mb-8">
                        Informe seu peso e altura para calcular seu Índice de Massa Corporal.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Peso (kg)
                            </label>
                            <input
                                type="number"
                                value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                                className="w-full border rounded-lg p-3"
                                placeholder="Ex: 70"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Altura (m)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={altura}
                                onChange={(e) => setAltura(e.target.value)}
                                className="w-full border rounded-lg p-3"
                                placeholder="Ex: 1.75"
                            />
                        </div>

                        <button
                            onClick={calcularIMC}
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                        >
                            Calcular IMC
                        </button>
                    </div>

                    {resultado && (
                        <div className="mt-8 bg-green-50 p-6 rounded-xl text-center">
                            <h3 className="text-xl font-bold text-gray-800">
                                Seu IMC é: {resultado}
                            </h3>
                            <p className="text-green-700 font-semibold mt-2">
                                {classificacao}
                            </p>
                        </div>
                    )}

                    {/* Tabela de referência */}
                    <div className="mt-8">
                        <h4 className="font-bold text-lg mb-4">
                            Classificação do IMC
                        </h4>

                        <div className="space-y-2 text-gray-600">
                            <p>Abaixo de 18,5 → Abaixo do peso</p>
                            <p>18,5 a 24,9 → Peso normal</p>
                            <p>25,0 a 29,9 → Sobrepeso</p>
                            <p>30,0 a 34,9 → Obesidade Grau I</p>
                            <p>35,0 a 39,9 → Obesidade Grau II</p>
                            <p>40,0 ou mais → Obesidade Grau III</p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}