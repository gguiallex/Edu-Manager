interface Props { params: { id: string } }

export default function TeacherStudentProfile({ params }: Props) {

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Aluno {params.id}</h1>

      <section className="mt-4 p-4 bg-zinc-100 rounded shadow">
        <h2 className="text-xl font-semibold">Informações gerais</h2>
        <p className="text-zinc-600 mt-2">Dados do aluno aqui...</p>
      </section>
    </div>
  );
}