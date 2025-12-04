"use client";

import { HeaderGestor } from "@/components/header";
import Link from "next/link";

export default function ManagerDashboard() {
  return (
    <div className="p-10 pt-24">
      <HeaderGestor/>
      <h1 className="text-3xl font-bold mb-6">Painel do Gestor</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        <Link href="/manager/users" className="p-6 bg-zinc-800 text-white rounded-lg shadow hover:bg-zinc-700 transition">
          <h2 className="text-xl font-semibold">Usuários</h2>
          <p className="text-sm text-zinc-300 mt-2">Criar, editar e remover usuários</p>
        </Link>

        <Link href="/manager/requests" className="p-6 bg-zinc-800 text-white rounded-lg shadow hover:bg-zinc-700 transition">
          <h2 className="text-xl font-semibold">Solicitações</h2>
          <p className="text-sm text-zinc-300 mt-2">Aprovar ou rejeitar pedidos</p>
        </Link>

        <Link href="/manager/classes" className="p-6 bg-zinc-800 text-white rounded-lg shadow hover:bg-zinc-700 transition">
          <h2 className="text-xl font-semibold">Turmas</h2>
          <p className="text-sm text-zinc-300 mt-2">Criar e gerenciar turmas</p>
        </Link>

        <Link href="/manager/students" className="p-6 bg-zinc-800 text-white rounded-lg shadow hover:bg-zinc-700 transition">
          <h2 className="text-xl font-semibold">Alunos em Turmas</h2>
          <p className="text-sm text-zinc-300 mt-2">Vincular alunos às turmas</p>
        </Link>

        <Link href="/manager/subjects" className="p-6 bg-zinc-800 text-white rounded-lg shadow hover:bg-zinc-700 transition">
          <h2 className="text-xl font-semibold">Matérias</h2>
          <p className="text-sm text-zinc-300 mt-2">Criar e gerenciar matérias</p>
        </Link>

        <Link href="/manager/assignments" className="p-6 bg-zinc-800 text-white rounded-lg shadow hover:bg-zinc-700 transition">
          <h2 className="text-xl font-semibold">Atribuições</h2>
          <p className="text-sm text-zinc-300 mt-2">Professor → Matéria → Turma</p>
        </Link>

      </div>
    </div>
  );
}