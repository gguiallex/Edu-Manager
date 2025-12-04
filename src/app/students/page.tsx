"use client";

import { HeaderAluno } from "@/components/header";
import { useEffect, useState } from "react";

interface Grade {
  id: number;
  subject_id: number;
  type: string;
  grade: number;
}

export default function AlunoDashboard() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  // ⚠️ Depois troca pelo ID real do login
  const studentId = 1;

  async function loadGrades() {
    try {
      const res = await fetch(`/api/grades?student_id=${studentId}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setGrades(data);
      }
    } catch (err) {
      console.error("Erro ao carregar notas:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGrades();
  }, []);

  return (
    <div className="p-8">
      <HeaderAluno />

      <div className="mt-14">
        <h1 className="text-3xl font-bold">Bem-vindo(a) de volta!</h1>
        <p className="text-gray-600 mt-1">
          Aqui estão suas informações mais recentes.
        </p>

        {/* 🔵 Últimas Notas */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Últimas notas</h2>

          {loading ? (
            <p className="text-gray-500">Carregando...</p>
          ) : grades.length === 0 ? (
            <p className="text-gray-500">Nenhuma nota lançada ainda.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {grades.map((g) => (
                <div key={g.id} className="p-4 border rounded shadow-sm">
                  <h3 className="font-semibold">Matéria #{g.subject_id}</h3>
                  <p className="text-gray-500">
                    {g.type} — <strong>{g.grade}</strong>
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 🔶 Avisos importantes */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Avisos importantes</h2>

          <ul className="list-disc pl-6 text-gray-700">
            <li>Semana de provas começa dia 14.</li>
            <li>Entrega dos boletins: 30/06.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
