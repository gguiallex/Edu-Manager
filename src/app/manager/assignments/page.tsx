"use client";

import { HeaderGestor } from "@/components/header";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Teacher {
  id: number;
  name: string;
  role: string;
}

interface Subject {
  id: number;
  name: string;
}

interface Class {
  id: number;
  name: string;
}

interface Assignment {
  link_id: number;
  teacher_name: string;
  subject_name: string;
  class_name: string;
}

export default function AssignmentsManager() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  async function loadData() {
    try {
      const [teachersRes, subjectsRes, classesRes, assignmentsRes] = await Promise.all([
        fetch("/api/users?role=teacher"),
        fetch("/api/subjects"),
        fetch("/api/classes"),
        fetch("/api/teacherSubjectClass"),
      ]);

      const teachersData = await teachersRes.json();
      const subjectsData = await subjectsRes.json();
      const classesData = await classesRes.json();
      const assignmentsData = await assignmentsRes.json();

      setTeachers(teachersData.filter((u: any) => u.role === "teacher"));
      setSubjects(Array.isArray(subjectsData) ? subjectsData : []);
      setClasses(Array.isArray(classesData) ? classesData : []);
      setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
    } catch (err) {
      setMessage("Erro ao carregar dados");
      console.error(err);
    }
  }

  async function assignTeacherToSubjectClass() {
    if (!selectedTeacher || !selectedSubject || !selectedClass) {
      setMessage("Selecione professor, matéria e turma!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/teacherSubjectClass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacher_id: parseInt(selectedTeacher),
          subject_id: parseInt(selectedSubject),
          class_id: parseInt(selectedClass),
        }),
      });

      if (res.ok) {
        setMessage("Atribuição criada com sucesso!");
        setSelectedTeacher("");
        setSelectedSubject("");
        setSelectedClass("");
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

  async function deleteAssignment(id: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/teacherSubjectClass/${id}`, { method: "DELETE" });

      if (res.ok) {
        setMessage("Atribuição removida com sucesso!");
        loadData();
        setDeleteConfirm(null);
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
        <h1 className="text-3xl font-bold">Atribuições (Professor → Matéria → Turma)</h1>
        <Link href="/manager" className="text-blue-400 hover:underline">← Voltar</Link>
      </div>

      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes("sucesso") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Criar Atribuição</h2>
        <div className="grid grid-cols-3 gap-4">
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="p-2 border rounded bg-gray-700 text-white"
            disabled={loading}
          >
            <option value="">Selecione professor...</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="p-2 border rounded bg-gray-700 text-white"
            disabled={loading}
          >
            <option value="">Selecione matéria...</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="p-2 border rounded bg-gray-700 text-white"
            disabled={loading}
          >
            <option value="">Selecione turma...</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={assignTeacherToSubjectClass}
          disabled={loading}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Atribuindo..." : "Atribuir"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-600">
          <thead>
            <tr className="bg-zinc-900 text-white">
              <th className="p-3">Professor</th>
              <th className="p-3">Matéria</th>
              <th className="p-3">Turma</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-400">
                  Nenhuma atribuição encontrada
                </td>
              </tr>
            ) : (
              assignments.map((assignment) => (
                <tr key={assignment.link_id} className="border-b border-gray-600 hover:bg-gray-800">
                  <td className="p-3">{assignment.teacher_name}</td>
                  <td className="p-3">{assignment.subject_name}</td>
                  <td className="p-3">{assignment.class_name}</td>
                  <td className="p-3">
                    {deleteConfirm === assignment.link_id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => deleteAssignment(assignment.link_id)}
                          disabled={loading}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-60"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(assignment.link_id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      >
                        Deletar
                      </button>
                    )}
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