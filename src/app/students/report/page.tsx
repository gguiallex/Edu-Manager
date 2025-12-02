import { HeaderAluno } from "@/src/components/header";

export default function ReportPage() {
  const boletim = [
    { materia: "Matemática", media: 8.2 },
    { materia: "Português", media: 7.5 },
    { materia: "História", media: 9.1 },
    { materia: "Ciências", media: 8.8 },
  ];

  return (
    <div className="p-8">

      <HeaderAluno/>
      <div className="mt-11">
      <h1 className="text-3xl font-bold">Boletim</h1>

      <table className="mt-8 w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">Matéria</th>
            <th className="p-3 border">Média Final</th>
          </tr>
        </thead>

        <tbody>
          {boletim.map((b) => (
            <tr key={b.materia}>
              <td className="p-3 border">{b.materia}</td>
              <td className="p-3 border text-center">{b.media}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}