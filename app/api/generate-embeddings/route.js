import { NextResponse } from "next/server";

// Force this route to be dynamic (not statically generated)
export const dynamic = 'force-dynamic';

export async function POST(request) {

    console.log('Generating embeddings...request is ', request)

    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: 'No text provided' }, { status: 400 })
        }

        const response = await fetch(`http://localhost:11434/api/embeddings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'nomic-embed-text',
                prompt: text
            })
        })

        if ((!response.ok)) {
            return NextResponse.json({ error: 'Failed to generate embeddings' }, { status: 500 })
        }
        const data = await response.json();
        console.log('generate embeddings data is ', data);
        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

}