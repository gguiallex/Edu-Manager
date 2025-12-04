"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  role: string;
}

/* ============================================================
   HEADER PRINCIPAL
============================================================ */
export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex px-2 py-4 bg-zinc-900 text-white shadow-lg">
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
        <Link href="/" className="text-xl font-bold hover:text-blue-400 transition">
          Edu Manager
        </Link>

        <nav>
          <ul className="flex items-center justify-center gap-6 text-sm">
            <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link href="/login" className="hover:text-blue-400 transition">Entrar</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

/* ============================================================
   HEADER DO ALUNO
============================================================ */
export function HeaderAluno() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/");
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-zinc-900 text-white shadow-lg">
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-4 py-4">
        <Link href="/students" className="text-lg font-bold hover:text-blue-400 transition">
          Edu Manager
        </Link>

        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link href="/students" className="hover:text-blue-400 transition">
                Início
              </Link>
            </li>

            <li>
              <Link href="/students/subjects" className="hover:text-blue-400 transition">
                Matérias
              </Link>
            </li>

            <li>
              <Link href="/students/report" className="hover:text-blue-400 transition">
                Boletim
              </Link>
            </li>

            <li className="text-gray-400 border-l border-gray-600 pl-6">
              {user ? `${user.name}` : "Carregando..."}
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded transition"
              >
                Deslogar
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

/* ============================================================
   HEADER DO PROFESSOR
============================================================ */
export function HeaderProfessor() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/");
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-zinc-900 text-white shadow-lg">
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-4 py-4">
        <Link href="/teacher" className="text-lg font-bold hover:text-blue-400 transition">
          Edu Manager
        </Link>

        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link href="/teacher" className="hover:text-blue-400 transition">
                Início
              </Link>
            </li>

            <li>
              <Link href="/teacher/classes" className="hover:text-blue-400 transition">
                Turmas
              </Link>
            </li>

            <li>
              <Link href="/teacher/students" className="hover:text-blue-400 transition">
                Alunos
              </Link>
            </li>

            <li className="text-gray-400 border-l border-gray-600 pl-6">
              {user ? `${user.name}` : "Carregando..."}
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded transition"
              >
                Deslogar
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

/* ============================================================
   HEADER DO GESTOR
============================================================ */
export function HeaderGestor() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/");
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-zinc-900 text-white shadow-lg">
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-4 py-4">
        <Link href="/manager" className="text-lg font-bold hover:text-blue-400 transition">
          Edu Manager
        </Link>

        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link href="/manager" className="hover:text-blue-400 transition">
                Painel
              </Link>
            </li>

            <li>
              <Link href="/manager/users" className="hover:text-blue-400 transition">
                Usuários
              </Link>
            </li>

            <li>
              <Link href="/manager/classes" className="hover:text-blue-400 transition">
                Turmas
              </Link>
            </li>

            <li>
              <Link href="/manager/subjects" className="hover:text-blue-400 transition">
                Matérias
              </Link>
            </li>

            <li>
              <Link href="/manager/assignments" className="hover:text-blue-400 transition">
                Atribuições
              </Link>
            </li>

            <li className="text-gray-400 border-l border-gray-600 pl-6">
              {user ? `${user.name}` : "Carregando..."}
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded transition"
              >
                Deslogar
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}