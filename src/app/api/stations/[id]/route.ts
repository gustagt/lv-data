import stationRepository from "@/lib/repository/Station";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    try {
        const deletedStation = await stationRepository.delete(Number(id));
        return Response.json(deletedStation, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao deletar cadastro:", error.message);
            return Response.json({ error: error.message }, { status: 500 });
        }

        console.error("Erro ao deletar cadastro:", error);
        return Response.json(
            { error: "Falha ao deletar cadastro" },
            { status: 500 }
        );
    }
    
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const data = await req.json();

    try {
        const updatedStation = await stationRepository.update(Number(id), data);
        return Response.json(updatedStation, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao editar cadastro:", error.message);
            return Response.json({ error: error.message }, { status: 400 });
        }

        console.error("Erro ao editar cadastro:", error);
        return Response.json(
            { error: "Falha ao editar cadastro" },
            { status: 500 }
        );
    }

}
