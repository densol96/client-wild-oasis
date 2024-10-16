import { getCabin } from "@/app/_lib/data-service";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    return Response.json({ status: "success", data: await getCabin(id) });
  } catch (e) {
    console.log(e);
    return Response.json({ status: "error", message: "Invalid id" });
  }
}

// export async function POST() {}
