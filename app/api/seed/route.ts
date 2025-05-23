import { NextRequest, NextResponse } from "next/server";
import { createAllMunicipios } from "@/actions/actMunicipio";

export async function GET(req: NextRequest) {
  try {
    const responseData = await createAllMunicipios();
    return NextResponse.json({ success: true, data: responseData });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Erro interno no servidor",
      },
      { status: 500 }
    );
  }
}
