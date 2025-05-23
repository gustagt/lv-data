import stationRepository from "@/lib/repository/Station";

export async function GET() {
  const stations = await stationRepository.findAll();

  return Response.json({ stations });
}

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const newStation = await stationRepository.create(data);
    return Response.json(newStation, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating station:", error.message);
      return Response.json({ error: error.message }, { status: 500 });
    }

    console.error("Error creating station:", error);
    return Response.json(
      { error: "Failed to create station" },
      { status: 500 }
    );
  }
}
