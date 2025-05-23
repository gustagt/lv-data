import userRepository from "@/lib/repository/User";



export async function POST(req: Request) {
  const data = await req.json();

  try {
    const res = await userRepository.login(data);
    return Response.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Usuário invalido", error.message);
      return Response.json({ error: error.message }, { status: 403 });
    }

    console.error("Erro ao criar o usuário:", error);
    return Response.json(
      { error: "Erro ao criar o usuário:" },
      { status: 500 }
    );
  }
}
