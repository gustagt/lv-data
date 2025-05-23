import stationRepository from "@/lib/repository/Station";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    try {
        const deletedStation = await stationRepository.delete(Number(id));
        return Response.json(deletedStation, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error deleting station:", error.message);
            return Response.json({ error: error.message }, { status: 500 });
        }

        console.error("Error deleting station:", error);
        return Response.json(
            { error: "Failed to delete station" },
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
            console.error("Error updating station:", error.message);
            return Response.json({ error: error.message }, { status: 500 });
        }

        console.error("Error updating station:", error);
        return Response.json(
            { error: "Failed to update station" },
            { status: 500 }
        );
    }

}
