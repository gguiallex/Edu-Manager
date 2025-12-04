"use client";

import { Header } from "@/components/header";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: any) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage("Erro: " + data.error);
      } else {
        setMessage("Conta criada com sucesso! Faça login.");
        setName("");
        setEmail("");
        setPassword("");
        setRole("student");
      }
    } catch (err: any) {
      setMessage("Erro ao conectar ao servidor.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
        <Header/>
      <div className="bg-blue-400 p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Criar Conta
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">

          <div>
            <label className="block mb-1 font-semibold">Nome completo</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">E-mail</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Senha</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Tipo de usuário</label>
            <select
              className="w-full p-3 border rounded-lg"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="student">Aluno</option>
              <option value="teacher">Professor</option>
              <option value="manager">Gestor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Criando conta..." : "Registrar"}
          </button>

        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("sucesso") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center mt-4 text-sm text-gray-600">
          Já tem uma conta?{" "}
          <a href="/login" className="text-blue-600 font-semibold">
            Entrar
          </a>
        </p>

      </div>
    </div>
  );
}