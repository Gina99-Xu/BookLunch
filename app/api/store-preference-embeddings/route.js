import { updateUserPreferenceEmbeddings } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";


export async function POST(request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, embedding } = await request.json();

    if (session.user.id !== userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await updateUserPreferenceEmbeddings(embedding);

    if (data.error) {
        return NextResponse.json({
            success: false,
            message: data.error.message
        }, { status: 500 })
    }

    return NextResponse.json({
        success: true,
        message: 'Embeddings stored successfully'
    }, { status: 200 })
}
