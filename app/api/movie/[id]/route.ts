import { NextResponse } from "next/server";
import { deleteMovie, getMovie } from "@/mongo/movies";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function DELETE(request: Request, context: { params: Params }){
    const deletedCount = await deleteMovie(context.params.id);

    return NextResponse.json({deletedCount})
}


export async function GET(request: Request, context: { params: Params }){
    const data = await getMovie(context.params.id);

    return NextResponse.json(data)
}