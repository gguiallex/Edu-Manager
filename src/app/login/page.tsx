"use client";

import Link from "next/link";
import { useState } from "react";
//import { Metadata } from "next";

/*export const metadata: Metadata = {
  title: "Edu Manager - Login",
  description: "Pagina para logar o usuário",
};*/

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Simulação de erro (remova depois)
    if (username !== "teste" || password !== "123") {
      setError("Usuário ou senha incorretos. Tente novamente.");
      return;
    }

    // Redirecionar após login correto
    //router.push("/dashboard");
  }

  return (
    <div className="flex items-center mt-8 justify-center min-h-[85vh] px-4">
      <div className="bg-blue-400 shadow-lg p-6 rounded-2xl w-full max-w-md">

        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mx-auto text-blue-900"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          <h3 className="mt-3 text-2xl font-bold">Acesse sua conta</h3>
          <p className="text-gray-500">Entre para continuar</p>
        </div>

        {/* Mensagens de erro */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block font-medium">Usuário</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Senha</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Entrar
          </button>
        </form>

        {/* Link para cadastro */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Não tem uma conta?
            <Link href="/register" className="text-blue-600 ml-1 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
