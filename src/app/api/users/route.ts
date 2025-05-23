import userRepository from "@/lib/repository/User";


export async function GET() {
  const users = await userRepository.findAll();

  return Response.json({ users });
}

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const res = await userRepository.create(data);
    return Response.json(res, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao criar o usuário:", error.message);
      return Response.json({ error: error.message }, { status: 500 });
    }

    console.error("Erro ao criar o usuário:", error);
    return Response.json(
      { error: "Erro ao criar o usuário:" },
      { status: 500 }
    );
  }
}
