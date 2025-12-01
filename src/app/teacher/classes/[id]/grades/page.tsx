interface Props { params: { id: string } }

export default function GradesPage({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Notas — Turma {params.id}</h1>

      <p className="mt-2 text-zinc-600">Aqui o professor insere ou edita notas.</p>
    </div>
  );
}