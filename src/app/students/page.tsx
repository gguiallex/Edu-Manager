"use client"

export default function Alunos() {
return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Bem-vindo(a)!</h1>
      <p className="text-gray-600 mt-1">
        Aqui estão suas informações mais recentes.
      </p>

      {/* Últimas notas */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Últimas notas lançadas</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* CARD */}
          <div className="p-4 border rounded shadow-sm">
            <h3 className="font-semibold">Matemática</h3>
            <p className="text-gray-500">Prova 1 — 8.5</p>
          </div>
          
          <div className="p-4 border rounded shadow-sm">
            <h3 className="font-semibold">Português</h3>
            <p className="text-gray-500">Redação — 9.0</p>
          </div>

          <div className="p-4 border rounded shadow-sm">
            <h3 className="font-semibold">História</h3>
            <p className="text-gray-500">Trabalho — 7.0</p>
          </div>
        </div>
      </section>

      {/* Avisos */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Avisos importantes</h2>

        <ul className="list-disc pl-6 text-gray-700">
          <li>Semana de provas começa dia 14.</li>
          <li>Entrega dos boletins: 30/06.</li>
        </ul>
      </section>
    </div>
  );
}