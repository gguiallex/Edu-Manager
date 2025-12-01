export default function TeacherClasses() {
  const classes = [
    { id: 1, name: "7º Ano A" },
    { id: 2, name: "8º Ano B" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Minhas Turmas</h1>

      <ul className="mt-4 space-y-3">
        {classes.map(turma => (
          <li key={turma.id}>
            <a
              href={`/teachers/classes/${turma.id}`}
              className="block p-4 bg-zinc-100 rounded shadow hover:bg-zinc-200"
            >
              {turma.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}