"use client";

import { HeaderGestor } from "@/components/header";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Subject {
  id: number;
  name: string;
}

export default function SubjectsManager() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  async function loadSubjects() {
    try {
      const res = await fetch("/api/subjects");
      const data = await res.json();
      setSubjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage("Erro ao carregar matérias");
      console.error(err);
    }
  }

  async function createSubject() {
    if (!name) {
      setMessage("Preencha o nome da matéria!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setMessage("Matéria criada com sucesso!");
        setName("");
        loadSubjects();
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

  async function updateSubject(id: number) {
    if (!editName) {
      setMessage("Preencha o nome da matéria!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/subjects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName }),
      });

      if (res.ok) {
        setMessage("Matéria atualizada com sucesso!");
        setEditingId(null);
        loadSubjects();
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

  async function deleteSubject(id: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/subjects/${id}`, { method: "DELETE" });

      if (res.ok) {
        setMessage("Matéria removida com sucesso!");
        loadSubjects();
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

  function startEdit(subject: Subject) {
    setEditingId(subject.id);
    setEditName(subject.name);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
  }

  useEffect(() => {
    loadSubjects();
  }, []);

  return (
    <div className="p-10 pt-24">
      <HeaderGestor />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciar Matérias</h1>
        <Link href="/manager" className="text-blue-400 hover:underline">← Voltar</Link>
      </div>

      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes("sucesso") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Criar Nova Matéria</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Nome da matéria"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-2 border rounded bg-gray-700 text-white"
            disabled={loading}
          />
          <button
            onClick={createSubject}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Criando..." : "Criar"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-600">
          <thead>
            <tr className="bg-zinc-900 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Nome</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {subjects.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-400">
                  Nenhuma matéria encontrada
                </td>
              </tr>
            ) : (
              subjects.map((subject) => (
                <tr key={subject.id} className="border-b border-gray-600 hover:bg-gray-800">
                  <td className="p-3">{subject.id}</td>
                  {editingId === subject.id ? (
                    <>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full p-1 border rounded bg-gray-700 text-white"
                          disabled={loading}
                        />
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => updateSubject(subject.id)}
                          disabled={loading}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-60"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                        >
                          Cancelar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3">{subject.name}</td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => startEdit(subject)}
                          className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                        >
                          Editar
                        </button>
                        {deleteConfirm === subject.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => deleteSubject(subject.id)}
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
                            onClick={() => setDeleteConfirm(subject.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                          >
                            Deletar
                          </button>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}