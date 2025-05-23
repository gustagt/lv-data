import { getAuthUsername, isValidate } from "@/lib/helper/auth";
import stationRepository from "@/lib/repository/Station";

export async function GET() {
  const stations = await stationRepository.findAll();

  return Response.json({ stations });
}

export async function POST(req: Request) {

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !isValidate(authHeader.split(" ")[1])) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  const username = await getAuthUsername(authHeader.split(" ")[1]);


  const data = await req.json();

  try {
    const newStation = await stationRepository.create({...data, userCreated: username});
    return Response.json(newStation, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao criar a cadastro:", error.message);
      return Response.json({ error: error.message }, { status: 400 });
    }

    console.error("Erro ao criar a cadastro:", error);
    return Response.json(
      { error: "Falha ao criar a cadastro" },
      { status: 500 }
    );
  }
}
