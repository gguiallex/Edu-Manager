interface Props { params: { id: string } }

export default function ClassDetails({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Turma {params.id}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <a href={`/teachers/classes/${params.id}/grades`}
           className="p-4 bg-blue-100 rounded shadow hover:bg-blue-200">
          Lançar Notas
        </a>

        <a href={`/teachers/classes/${params.id}/attendance`}
           className="p-4 bg-green-100 rounded shadow hover:bg-green-200">
          Chamada / Frequência
        </a>

        <a href={`/teachers/classes/${params.id}/content`}
           className="p-4 bg-yellow-100 rounded shadow hover:bg-yellow-200">
          Postar Conteúdo / Atividade
        </a>

      </div>
    </div>
  );
}