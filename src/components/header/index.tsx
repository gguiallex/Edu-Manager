import Link from "next/link";

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 flex px-2 py-4 bg-zinc-900 text-white">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
                <div>
                    Edu Manager
                </div>

                <nav>
                    <ul className="flex items-center justify-center gap-2">
                        <li>
                            <Link href='/'>
                                Home                            
                            </Link>

                        </li>
                        <li>
                            <Link href='/students'>
                                Boletim
                            </Link>
                        </li>
                        <li>
                            <Link href='/agosto'>
                                Perfil
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export function HeaderAluno() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 flex px-2 py-4 bg-zinc-900 text-white">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
                <div>
                    Edu Manager
                </div>

                <nav>
                    <ul className="flex items-center justify-center gap-2">
                        <li>
                            <Link href='/students'>
                                Início                            
                            </Link>

                        </li>
                        <li>
                            <Link href='/students/subjects'>
                                Matérias
                            </Link>
                        </li>
                        <li>
                            <Link href='/students/report'>
                                Boletim
                            </Link>
                        </li>
                        <li>
                            <Link href='/students/profile'>
                                Perfil
                            </Link>
                        </li>

                        <li>
                        <Link href='/'>
                            Deslogar
                        </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export function HeaderProfessor() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 flex px-2 py-4 bg-zinc-900 text-white">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
                <div>
                    Edu Manager
                </div>

                <nav>
                    <ul className="flex items-center justify-center gap-2">
                        <li>
                            <Link href='/teacher'>
                                Início                           
                            </Link>

                        </li>
                        <li>
                            <Link href='/teacher/classes'>
                                Turmas
                            </Link>
                        </li>
                        <li>
                            <Link href='/agosto'>
                                Perfil
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}