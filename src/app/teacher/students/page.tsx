"use client";

import { useState } from "react";
import Link from "next/link";

export default function TeacherStudentsPage() {
  const [search, setSearch] = useState("");

  // Dados fictícios por enquanto
  const students = [
    { id: 1, name: "Ana Barbosa", className: "7º Ano A" },
    { id: 2, name: "João Ribeiro", className: "7º Ano A" },
    { id: 3, name: "Marcos Teles", className: "8º Ano B" },
    { id: 4, name: "Cristina Rosa", className: "8º Ano B" },
  ];

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Alunos</h1>

      {/* Campo de busca */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Buscar aluno..."
          className="w-full p-2 rounded border border-zinc-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Lista */}
      <ul className="mt-4 space-y-3">
        {filtered.map(student => (
          <li key={student.id}>
            <Link
              href={`/teachers/students/${student.id}`}
              className="block p-4 bg-zinc-100 rounded shadow hover:bg-zinc-200"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{student.name}</span>

                <span className="px-3 py-1 bg-blue-600 text-white rounded">
                  {student.className}
                </span>
              </div>
            </Link>
          </li>
        ))}

        {filtered.length === 0 && (
          <p className="text-zinc-500 mt-3">Nenhum aluno encontrado.</p>
        )}
      </ul>
    </div>
  );
}