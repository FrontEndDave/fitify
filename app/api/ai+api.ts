import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { content } = await req.json();

    if (!content) {
        return new Response("No content provided", { status: 400 });
    }

    try {
        const encoder = new TextEncoder();
        const stream = new TransformStream();
        const writer = stream.writable.getWriter();

        const completion = openai.beta.chat.completions
            .stream({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `Jesteś profesjonalnym trenerem personalnym. Odpowiadaj krótko i konkretnie na pytania 
                                dotyczące treningów, diety i zdrowego stylu życia. Używaj języka polskiego lub angielskiego w zaleności od języka uytego w pytaniu. 
                                Formatuj odpowiedź w czytelny sposób z użyciem emoji.`,
                    },
                    {
                        role: "user",
                        content: content,
                    },
                ],
                stream: true,
            })
            .on("content", async (delta) => {
                await writer.write(encoder.encode(delta));
            })
            .on("end", async () => {
                await writer.close();
            });

        return new Response(stream.readable, {
            headers: {
                "Content-Type": "text/plain",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
    } catch (error) {
        console.error(error);
        return new Response("Error", { status: 500 });
    }
}
