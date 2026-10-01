import { useState } from "react";
import { Link } from "react-router-dom";

export default function CriarConta() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        console.log(formData);
        alert("Conta criada com sucesso!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-emerald-100 p-6">
            <div className="bg-white shadow-xl rounded-3xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-600">
                        NutriGuide
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Crie sua conta gratuitamente
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Digite seu nome"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            E-mail
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Digite seu e-mail"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Senha
                        </label>
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            name="confirmarSenha"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Confirme sua senha"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                    >
                        Criar Conta
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Já possui uma conta?
                    </p>

                    <Link
                        to="/login"
                        className="text-green-600 font-semibold hover:text-green-700"
                    >
                        Fazer Login
                    </Link>
                </div>
            </div>
        </div>
    );
}