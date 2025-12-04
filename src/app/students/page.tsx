"use client";

import { HeaderAluno } from "@/components/header";
import { useEffect, useState } from "react";

interface Grade {
  id: number;
  subject_id: number;
  type: string;
  grade: number;
}

interface StudentInfo {
  user_id: number;
  name: string;
  email: string;
  class_id: number;
  class_name: string;
  class_year: string;
}

interface SubjectWithTeachers {
  subject_id: number;
  subject_name: string;
  teachers: {
    teacher_id: number;
    teacher_name: string;
  }[];
}

export default function AlunoDashboard() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [subjects, setSubjects] = useState<SubjectWithTeachers[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  // ⚠️ Depois troca pelo ID real do login
  const studentId = 1;

  async function loadStudentData() {
    try {
      setLoading(true);

      // 1. Carregar informações do estudante (nome, turma, etc)
      const studentRes = await fetch(`/api/students/${studentId}`);
      const studentData = await studentRes.json();

      if (studentData && studentData.length > 0) {
        const student = studentData[0];
        setStudentInfo(student);

        // 2. Carregar matérias da turma com seus professores
        if (student.class_id) {
          const subjectsRes = await fetch(
            `/api/teacherSubjectClass?class_id=${student.class_id}`
          );
          const subjectsData = await subjectsRes.json();

          // Agrupar professores por matéria
          const subjectMap: {
            [key: number]: SubjectWithTeachers;
          } = {};

          subjectsData.forEach(
            (item: {
              subject_id: number;
              subject_name: string;
              teacher_id: number;
              teacher_name: string;
            }) => {
              if (!subjectMap[item.subject_id]) {
                subjectMap[item.subject_id] = {
                  subject_id: item.subject_id,
                  subject_name: item.subject_name,
                  teachers: [],
                };
              }
              subjectMap[item.subject_id].teachers.push({
                teacher_id: item.teacher_id,
                teacher_name: item.teacher_name,
              });
            }
          );

          setSubjects(Object.values(subjectMap));
        }
      }

      // 3. Carregar notas do estudante
      const gradesRes = await fetch(`/api/grades?student_id=${studentId}`);
      const gradesData = await gradesRes.json();

      if (Array.isArray(gradesData)) {
        setGrades(gradesData);
      }
    } catch (err) {
      console.error("Erro ao carregar dados do estudante:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudentData();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <HeaderAluno />

      <div className="mt-14">
        <h1 className="text-3xl font-bold">
          Bem-vindo(a) de volta, {studentInfo?.name || "Estudante"}!
        </h1>
        <p className="text-gray-600 mt-1">
          Aqui estão suas informações mais recentes.
        </p>

        {/* 📚 Informações da Turma */}
        {studentInfo && (
          <section className="mt-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              Sua Turma
            </h2>
            <p className="text-gray-700">
              <strong>Turma:</strong> {studentInfo.class_name} ({studentInfo.class_year}
              º ano)
            </p>
          </section>
        )}

        {/* 📖 Matérias e Professores */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Matérias e Professores</h2>

          {loading ? (
            <p className="text-gray-500">Carregando informações...</p>
          ) : subjects.length === 0 ? (
            <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
              <p className="text-yellow-800">
                Nenhuma matéria atribuída à sua turma ainda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <div
                  key={subject.subject_id}
                  className="bg-white p-5 rounded-lg shadow-md border-t-4 border-indigo-500 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-indigo-900 mb-3">
                    {subject.subject_name}
                  </h3>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Professor(es):
                    </p>
                    {subject.teachers.length > 0 ? (
                      <ul className="space-y-1">
                        {subject.teachers.map((teacher) => (
                          <li
                            key={teacher.teacher_id}
                            className="text-sm text-gray-700 flex items-center"
                          >
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                            {teacher.teacher_name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        Sem professor atribuído
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 🔵 Últimas Notas */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Últimas Notas</h2>

          {loading ? (
            <p className="text-gray-500">Carregando notas...</p>
          ) : grades.length === 0 ? (
            <div className="bg-gray-100 p-4 rounded border border-gray-300">
              <p className="text-gray-600">Nenhuma nota lançada ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {grades.map((g) => (
                <div
                  key={g.id}
                  className="bg-white p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-800">
                    Matéria #{g.subject_id}
                  </h3>
                  <p className="text-gray-500 mt-2">
                    <span className="inline-block bg-gray-100 px-2 py-1 rounded text-sm mr-2">
                      {g.type}
                    </span>
                    <strong className="text-lg text-blue-600">{g.grade}</strong>
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 🔶 Avisos Importantes */}
        <section className="mt-8 bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
          <h2 className="text-xl font-semibold text-orange-900 mb-3">
            Avisos Importantes
          </h2>

          <ul className="space-y-2 text-orange-800">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Semana de provas começa dia 14.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Entrega dos boletins: 30/06.</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
