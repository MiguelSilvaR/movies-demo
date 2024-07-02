import { NextResponse } from "next/server";
import { getMovies } from "@/mongo/movies";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(request: Request, context: { params: Params }){
    const data = await getMovies(Number(context.params.page));

    return NextResponse.json(data)
}