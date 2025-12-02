import { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/header";

export const metadata: Metadata = {
  title: "Edu Manager - Início",
  description: "Projeto utilizando React com Next.js e TypeScript",
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-6">

    <Header/>

      {/* Seção principal */}
      <section className="text-center py-10 rounded-xl shadow-md w-full max-w-4xl mt-10">
        <h1 className="font-bold text-5xl text-blue-600 mt-5">
          Bem-Vindo(a) ao EduManager
        </h1>

        <p className="text-gray-600 mt-3 mb-13 text-lg">
          Uma plataforma que conecta alunos, professores e gestores em um único ambiente educacional.
        </p>

        <Link 
        href={"/login"} 
        className="cursor-pointer bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mt-8 transition">
          Acessar Plataforma
        </Link>
      </section>

      {/* Recursos */}
      <section className="mt-4 w-full max-w-5xl">
        <h2 className="text-center text-3xl font-semibold mb-8 text-blue-600">Recursos do Sistema</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-gray-900 border rounded-xl shadow-md p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-5-3.87M7 20H2v-2a4 4 0 015-3.87M12 14a4 4 0 100-8 4 4 0 000 8z" />
            </svg>

            <h5 className="mt-4 text-xl font-semibold">Acompanhamento Escolar</h5>

            <p className="mt-2 text-gray-600">
              Alunos e responsáveis podem visualizar notas, frequência e informações acadêmicas em tempo real.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-900 border rounded-xl shadow-md p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v12a2 2 0 01-2 2z" />
            </svg>

            <h5 className="mt-4 text-xl font-semibold">Gestão de Avaliações</h5>

            <p className="mt-2 text-gray-600">
              Professores podem registrar notas, faltas e avaliações de forma prática e centralizada.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900 border rounded-xl shadow-md p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>

            <h5 className="mt-4 text-xl font-semibold">Comunicação Integrada</h5>

            <p className="mt-2 text-gray-600">
              Facilite o diálogo entre professores, alunos e administração para melhorar o aprendizado.
            </p>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="mt-10 p-6 bg-blue-900 text-white rounded-xl max-w-4xl">
        <div className="text-center">
          <h4 className="text-2xl font-semibold">Sobre o EduManager</h4>

          <p className="mt-3 text-lg">
            O EduManager foi criado para simplificar a rotina escolar, promovendo uma gestão moderna e colaborativa.
            Acreditamos que tecnologia e educação caminham juntas para transformar o ensino.
          </p>
        </div>
      </section>
    </div>
  );
}
