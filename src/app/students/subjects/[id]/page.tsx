import { HeaderAluno } from "@/src/components/header";

interface Props {
  params: { id: string };
}

export default function SubjectDetails({ params }: Props) {
  const { id } = params;

  return (
    <div className="p-8">

      <HeaderAluno/>

      <h1 className="text-3xl font-bold capitalize">{id}</h1>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Notas</h2>

        <ul className="mt-2 text-gray-700">
          <li>Prova 1: 8.5</li>
          <li>Prova 2: 7.0</li>
          <li>Trabalhos: 9.0</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Faltas</h2>
        <p className="text-gray-700 mt-2">Total: 3 faltas</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Material da disciplina</h2>

        <ul className="list-disc pl-6 text-gray-700 mt-2">
          <li>PDF da aula 01</li>
          <li>Plano de ensino</li>
          <li>Slides da prova</li>
        </ul>
      </section>
    </div>
  );
}
