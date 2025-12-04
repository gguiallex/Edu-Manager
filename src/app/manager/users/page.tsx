"use client";

import { HeaderGestor } from "@/components/header";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "teacher" | "manager";
}

export default function UsersManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form create
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher" | "manager">("student");

  // Form edit
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState<"student" | "teacher" | "manager">("student");

  async function loadUsers() {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage("Erro ao carregar usuários");
      console.error(err);
    }
  }

  async function createUser() {
    if (!name || !email || !password) {
      setMessage("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (res.ok) {
        setMessage("Usuário criado com sucesso!");
        setName("");
        setEmail("");
        setPassword("");
        setRole("student");
        setShowCreateForm(false);
        loadUsers();
      } else {
        const err = await res.json();
        setMessage(`Erro: ${err.error || "Não foi possível criar"}`);
      }
    } catch (err) {
      setMessage("Erro de rede");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(id: number) {
    if (!editName || !editEmail) {
      setMessage("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, email: editEmail, role: editRole }),
      });

      if (res.ok) {
        setMessage("Usuário atualizado com sucesso!");
        setEditingId(null);
        loadUsers();
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

  async function deleteUser(id: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage("Usuário removido com sucesso!");
        loadUsers();
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

  function startEdit(user: User) {
    setEditingId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-10 pt-24">
      <HeaderGestor />
      <h1 className="text-3xl font-bold mb-6">Gerenciar Usuários</h1>

      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes("sucesso") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      <button
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showCreateForm ? "Cancelar" : "+ Criar Novo Usuário"}
      </button>

      {showCreateForm && (
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Novo Usuário</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded bg-gray-700 text-white"
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded bg-gray-700 text-white"
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded bg-gray-700 text-white"
              disabled={loading}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full p-2 border rounded bg-gray-700 text-white"
              disabled={loading}
            >
              <option value="student">Aluno</option>
              <option value="teacher">Professor</option>
              <option value="manager">Gestor</option>
            </select>
            <button
              onClick={createUser}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
            >
              {loading ? "Criando..." : "Criar Usuário"}
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-600">
          <thead>
            <tr className="bg-zinc-900 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Nome</th>
              <th className="p-3">Email</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  Nenhum usuário encontrado
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-gray-600 hover:bg-gray-800">
                  <td className="p-3">{user.id}</td>
                  {editingId === user.id ? (
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
                      <td className="p-3">
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full p-1 border rounded bg-gray-700 text-white"
                          disabled={loading}
                        />
                      </td>
                      <td className="p-3">
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value as any)}
                          className="w-full p-1 border rounded bg-gray-700 text-white"
                          disabled={loading}
                        >
                          <option value="student">Aluno</option>
                          <option value="teacher">Professor</option>
                          <option value="manager">Gestor</option>
                        </select>
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => updateUser(user.id)}
                          disabled={loading}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-60"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
                        >
                          Cancelar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-sm ${
                          user.role === "student" ? "bg-blue-600" :
                          user.role === "teacher" ? "bg-purple-600" :
                          "bg-red-600"
                        }`}>
                          {user.role === "student" ? "Aluno" : user.role === "teacher" ? "Professor" : "Gestor"}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => startEdit(user)}
                          className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                        >
                          Editar
                        </button>
                        {deleteConfirm === user.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => deleteUser(user.id)}
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
                            onClick={() => setDeleteConfirm(user.id)}
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