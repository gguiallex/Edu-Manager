export function Titulo(promps: any) {
    if(promps.tipo == "Aluno"){
    return (
        <div>
            <h1 className="text-lg font-bold">Edu Manager - {promps.principal ?? "Pagina Desconhecida"}</h1>
            <h2 className="text-sm text-zinc">{promps.secundario}</h2>
        </div>
    );
    } else if(promps.tipo == "") {
    return (
        <div>
            
        </div>
    );
    }
}