import { NextResponse } from "next/server";
import { getRankPerYear } from "@/mongo/movies";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(request: Request, context: { params: Params }){
    const data = await getRankPerYear(parseInt(context.params.year));

    return NextResponse.json(data)
}