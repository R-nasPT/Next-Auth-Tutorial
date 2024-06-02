type TypeParams = {
  params: { id: string };
};

export async function GET(request: Request, { params }: TypeParams) {
  return Response.json({ name: "Test", id: params.id });
}
