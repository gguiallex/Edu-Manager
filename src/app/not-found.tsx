import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-center font-bold mt-9 text-6xl">
                Página 404 não encontrada!
            </h1>
            
            <p className="mt-5 mb-7">Essa página que tentou acessar não existe!</p>
            
            <Link href='/' className="cursor-pointer m-9">
                Voltar para home
            </Link>
        </div>
    );
}