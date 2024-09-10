import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { FromWho,
        tweetsId,
        parent,
        tweet } = await req.json();

    try {
        const post = await fetch(`http://localhost:1337/api/posts`, {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    tweet: tweet,
                    ownersId: FromWho,
                    tweetsId: tweetsId,
                    date: new Date(),
                    parent: parent,
                }
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!post.ok) {
            const errorMessage = await post.text(); // Veya .json() kullanarak daha detaylı hata bilgisi alın
            console.error("Strapi Error:", errorMessage);
            throw new Error('Post failed.');
        }

        return NextResponse.json({ message: "Success" }, { status: 201 });

    } catch (error) {
        return Response.json({ message: "Internal Error" }, { status: 500 })
    }
}

