"use client";

import { HeaderGestor } from "@/components/header";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Student {
  user_id: number;
  name: string;
  email: string;
  class_id: number | null;
  class_name: string | null;
}

interface Class {
  id: number;
  name: string;
}

export default function StudentsManager() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadData() {
    try {
      const [studentsRes, classesRes] = await Promise.all([
        fetch("/api/students"),
        fetch("/api/classes"),
      ]);

      const studentsData = await studentsRes.json();
      const classesData = await classesRes.json();

      setStudents(Array.isArray(studentsData) ? studentsData : []);
      setClasses(Array.isArray(classesData) ? classesData : []);
    } catch (err) {
      setMessage("Erro ao carregar dados");
      console.error(err);
    }
  }

  async function assignStudentToClass(studentId: number, classId: number) {
    setLoading(true);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          class_id: classId,
          user_id: studentId,
        }),
      });

      if (res.ok) {
        setMessage("Aluno vinculado com sucesso!");
        loadData();
      } else {
        const err = await res.json();
        setMessage(`Erro: ${err.error}`);
      }
    } catch (err) {
      setMessage("Erro de rede");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-10 pt-24">
      <HeaderGestor />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vincular Alunos em Turmas</h1>
        <Link href="/manager" className="text-blue-400 hover:underline">← Voltar</Link>
      </div>

      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes("sucesso") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-600">
          <thead>
            <tr className="bg-zinc-900 text-white">
              <th className="p-3">Aluno</th>
              <th className="p-3">Email</th>
              <th className="p-3">Turma Atual</th>
              <th className="p-3">Ação</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-400">
                  Nenhum aluno encontrado
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.user_id} className="border-b border-gray-600 hover:bg-gray-800">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">
                    {student.class_name ? (
                      <span className="px-2 py-1 bg-blue-600 rounded text-sm">
                        {student.class_name}
                      </span>
                    ) : (
                      <span className="text-gray-400">Sem turma</span>
                    )}
                  </td>
                  <td className="p-3">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          assignStudentToClass(student.user_id, parseInt(e.target.value));
                        }
                      }}
                      disabled={loading}
                      className="p-2 border rounded bg-gray-700 text-white disabled:opacity-60"
                    >
                      <option value="">Selecione turma...</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}