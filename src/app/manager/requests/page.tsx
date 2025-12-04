"use client";

import { HeaderGestor } from "@/components/header";
import { useEffect, useState } from "react";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);

  async function load() {
    const res = await fetch("/api/requests");
    const data = await res.json();
    setRequests(data);
  }

  async function handleApprove(id: number) {
    await fetch(`/api/requests/${id}`, { method: "PUT" });
    load();
  }

  async function handleReject(id: number) {
    await fetch(`/api/requests/${id}`, { method: "DELETE" });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-10">
      <HeaderGestor/>
      <h1 className="text-2xl font-bold mb-4">Solicitações de Cadastro</h1>

      {requests.length === 0 && <p>Nenhuma solicitação pendente.</p>}

      {requests.map((req: any) => (
        <div key={req.id} className="p-4 bg-zinc-800 text-white rounded mb-4">
          <p><strong>Nome:</strong> {req.name}</p>
          <p><strong>Email:</strong> {req.email}</p>
          <p><strong>Tipo:</strong> {req.type}</p>

          <div className="mt-3 flex gap-3">
            <button 
              onClick={() => handleApprove(req.id)}
              className="px-3 py-1 bg-green-600 rounded"
            >
              Aprovar
            </button>

            <button 
              onClick={() => handleReject(req.id)}
              className="px-3 py-1 bg-red-600 rounded"
            >
              Rejeitar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}