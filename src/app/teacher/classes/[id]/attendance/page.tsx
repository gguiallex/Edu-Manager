interface Props { params: { id: string } }

export default function AttendancePage({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Chamada — Turma {params.id}</h1>
      <p className="mt-2 text-zinc-600">Inserir presença/ausência.</p>
    </div>
  );
}