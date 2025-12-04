"use client";

import { useEffect, useState } from "react";
import { HeaderAluno } from "@/components/header";

interface TeacherInfo {
  teacher_id: number;
  name: string;
  email: string;
  specialization: string;
  assignments: Assignment[];
}

interface Assignment {
  subject_id: number;
  subject_name: string;
  class_id: number;
  class_name: string;
}

interface TeacherStats {
  totalClasses: number;
  totalSubjects: number;
  totalStudents: number;
}

export default function Professor() {
  const [teacherInfo, setTeacherInfo] = useState<TeacherInfo | null>(null);
  const [stats, setStats] = useState<TeacherStats>({
    totalClasses: 0,
    totalSubjects: 0,
    totalStudents: 0,
  });
  const [loading, setLoading] = useState(true);

  // ⚠️ Depois troca pelo ID real do login
  const teacherId = 1;

  async function loadTeacherData() {
    try {
      setLoading(true);

      // 1. Carregar informações do professor
      const teacherRes = await fetch(`/api/teachers/${teacherId}`);
      const teacherData = await teacherRes.json();
      setTeacherInfo(teacherData);

      // 2. Calcular estatísticas
      if (teacherData && teacherData.assignments) {
        const assignments = teacherData.assignments;
        const uniqueClasses = new Set(
          assignments.map((a: Assignment) => a.class_id)
        ).size;
        const uniqueSubjects = new Set(
          assignments.map((a: Assignment) => a.subject_id)
        ).size;

        setStats({
          totalClasses: uniqueClasses,
          totalSubjects: uniqueSubjects,
          totalStudents: 0, // Calcular depois se necessário
        });
      }
    } catch (err) {
      console.error("Erro ao carregar dados do professor:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTeacherData();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <HeaderAluno />

      <div className="mt-14">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Bem-vindo, Professor{teacherInfo?.name ? ` ${teacherInfo.name}` : ""}!
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie suas turmas, matérias e alunos nesta área.
          </p>
        </div>

        {/* 📊 Estatísticas */}
        {teacherInfo && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
              <p className="text-gray-600 text-sm uppercase font-semibold">
                Turmas
              </p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {stats.totalClasses}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
              <p className="text-gray-600 text-sm uppercase font-semibold">
                Matérias
              </p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.totalSubjects}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
              <p className="text-gray-600 text-sm uppercase font-semibold">
                Email
              </p>
              <p className="text-lg font-semibold text-purple-600 mt-2 break-all">
                {teacherInfo.email}
              </p>
            </div>
          </section>
        )}

        {/* 🎓 Informações Pessoais */}
        {teacherInfo && (
          <section className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Informações Pessoais
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 uppercase">Nome</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  {teacherInfo.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 uppercase">Email</p>
                <p className="text-lg font-semibold text-gray-800 mt-1 break-all">
                  {teacherInfo.email}
                </p>
              </div>

              {teacherInfo.specialization && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 uppercase">Especialização</p>
                  <p className="text-lg font-semibold text-gray-800 mt-1">
                    {teacherInfo.specialization}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 📚 Turmas e Matérias Atribuídas */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Suas Turmas e Matérias
          </h2>

          {loading ? (
            <p className="text-gray-500">Carregando informações...</p>
          ) : teacherInfo && teacherInfo.assignments && teacherInfo.assignments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teacherInfo.assignments.map((assignment, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-500"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                        {assignment.subject_name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        <span className="inline-block bg-gray-100 px-3 py-1 rounded">
                          {assignment.class_name}
                        </span>
                      </p>
                    </div>
                  </div>

                  <a
                    href={`/teacher/classes/${assignment.class_id}`}
                    className="mt-4 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition-colors text-sm font-semibold"
                  >
                    Ver Detalhes
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
              <p className="text-yellow-800">
                Nenhuma turma ou matéria atribuída no momento.
              </p>
            </div>
          )}
        </section>

        {/* 🔗 Ações Rápidas */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Ações Rápidas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/teacher/classes"
              className="p-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all"
            >
              <h3 className="font-semibold text-xl mb-1">Minhas Turmas</h3>
              <p className="text-blue-100">
                Gerenciar cada turma que você ensina.
              </p>
            </a>

            <a
              href="/teacher/students"
              className="p-6 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-green-500 hover:to-green-700 transition-all"
            >
              <h3 className="font-semibold text-xl mb-1">Alunos</h3>
              <p className="text-green-100">
                Consultar informações dos alunos.
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
