import { useState } from 'react'
import '../App.css'
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-sm fixed w-full z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-600">
                        NutriGuide
                    </h1>

                    <Link className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition" to="/login">Entrar</Link>

                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-r from-green-50 to-emerald-100">
                <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1">
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Alimentação saudável simplificada
                        </span>

                        <h2 className="text-5xl font-bold text-gray-800 mt-6 leading-tight">
                            Transforme sua alimentação com orientação personalizada
                        </h2>

                        <p className="text-gray-600 text-lg mt-6">
                            Receba planos alimentares, acompanhe suas metas nutricionais e
                            obtenha recomendações inteligentes para uma vida mais saudável.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <a
                                href="/login"
                                className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition"
                            >
                                Começar Agora
                            </a>

                            <a
                                href="#beneficios"
                                className="border border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition"
                            >
                                Saiba Mais
                            </a>
                        </div>
                    </div>

                    <div className="flex-1">
                        <img
                            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900"
                            alt="Alimentação saudável"
                            className="rounded-3xl shadow-2xl"
                        />
                    </div>
                </div>
            </section>

            {/* Benefícios */}
            <section
                id="beneficios"
                className="py-24 bg-white"
            >
                <div className="container mx-auto px-6">
                    <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">
                        Como podemos ajudar você
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-green-50 p-8 rounded-2xl">
                            <div className="text-5xl mb-4">🥗</div>
                            <h4 className="text-xl font-bold mb-3">
                                Planos Personalizados
                            </h4>
                            <p className="text-gray-600">
                                Receba sugestões alimentares adaptadas aos seus objetivos e
                                necessidades.
                            </p>
                        </div>

                        <div className="bg-green-50 p-8 rounded-2xl">
                            <div className="text-5xl mb-4">📈</div>
                            <h4 className="text-xl font-bold mb-3">
                                Acompanhamento de Metas
                            </h4>
                            <p className="text-gray-600">
                                Monitore seu progresso e mantenha-se motivado ao longo da sua
                                jornada.
                            </p>
                        </div>

                        <div className="bg-green-50 p-8 rounded-2xl">
                            <div className="text-5xl mb-4">🤖</div>
                            <h4 className="text-xl font-bold mb-3">
                                Recomendações Inteligentes
                            </h4>
                            <p className="text-gray-600">
                                Sugestões baseadas em seus hábitos alimentares para melhorar sua
                                qualidade de vida.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Estatísticas */}
            <section className="py-20 bg-green-600 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h4 className="text-5xl font-bold">10k+</h4>
                            <p className="mt-2">Usuários ativos</p>
                        </div>

                        <div>
                            <h4 className="text-5xl font-bold">95%</h4>
                            <p className="mt-2">Satisfação dos usuários</p>
                        </div>

                        <div>
                            <h4 className="text-5xl font-bold">500+</h4>
                            <p className="mt-2">Receitas saudáveis</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-4xl font-bold text-gray-800">
                        Comece sua jornada para uma vida mais saudável
                    </h3>

                    <p className="text-gray-600 mt-4 text-lg">
                        Crie sua conta e receba orientações nutricionais personalizadas.
                    </p>

                    <a
                        href="/login"
                        className="inline-block mt-8 bg-green-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-green-700 transition"
                    >
                        Fazer Login
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-8">
                <div className="container mx-auto px-6 text-center">
                    <p>© 2026 NutriGuide. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}