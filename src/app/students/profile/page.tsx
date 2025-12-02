import { HeaderAluno } from "@/src/components/header";

export default function StudentProfile() {
  return (
    <div className="p-8">

      <HeaderAluno />
      <div className="mt-11">
        <h1 className="text-3xl font-bold">Meu Perfil</h1>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-gray-600">Nome completo</p>
            <p className="font-semibold">Guilherme Alexandre da Silva</p>
          </div>

          <div>
            <p className="text-gray-600">Turma</p>
            <p className="font-semibold">3º Ano - Turma B</p>
          </div>

          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-semibold">guilherme@email.com</p>
          </div>
        </div>

        <button className="mt-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Editar informações
        </button>
      </div>
    </div>
  );
}