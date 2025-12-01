import Link from "next/link";

export default function SubjectsPage() {
  const materias = [
    { id: "matematica", nome: "Matemática" },
    { id: "portugues", nome: "Português" },
    { id: "historia", nome: "História" },
    { id: "ciencias", nome: "Ciências" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Suas disciplinas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {materias.map((m) => (
          <Link
            key={m.id}
            href={`/students/subjects/${m.id}`}
            className="p-4 border rounded shadow hover:bg-gray-100 transition"
          >
            <h2 className="font-semibold">{m.nome}</h2>
            <p className="text-gray-500">Clique para ver detalhes</p>
          </Link>
        ))}
      </div>
    </div>
  );
}