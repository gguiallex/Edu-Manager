"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao fazer login");
        setLoading(false);
        return;
      }

      const user = data.user;
      if (!user) {
        setError("Resposta inválida do servidor.");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      // Redirecionamento por role
      if (user.role === "student") {
        router.push("/students");
      } else if (user.role === "teacher") {
        router.push("/teacher");
      } else if (user.role === "manager") {
        router.push("/manager");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      console.error(err);
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center mt-8 justify-center min-h-[85vh] px-4">
      <Header />
      <div className="bg-blue-400 shadow-lg p-6 rounded-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <h3 className="mt-3 text-2xl font-bold">Acesse sua conta</h3>
          <p className="text-gray-500">Entre para continuar</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

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