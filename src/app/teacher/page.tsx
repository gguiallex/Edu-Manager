export default function Professor() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Área do Professor</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <a href="/teacher/classes" className="p-4 bg-blue-400 rounded shadow hover:bg-blue-700">
          <h2 className="font-semibold text-xl">Minhas Turmas</h2>
          <p className="text-zinc-600">Gerenciar cada turma que você ensina.</p>
        </a>

        <a href="/teacher/students" className="p-4 bg-blue-400 rounded shadow hover:bg-blue-700">
          <h2 className="font-semibold text-xl">Alunos</h2>
          <p className="text-zinc-600">Consultar informações dos alunos.</p>
        </a>

      </div>
    </div>
  );
}
