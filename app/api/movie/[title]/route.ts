import { NextResponse } from "next/server";
import { env } from "process";

export async function GET(request: Request, { params }: { params: { title: string } }) {
    const { title } = params;
    const apiKey = env.TMDB_API_KEY
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch movie data' }, { status: response.status });
        }

        const data = await response.json();
        const movie = data.results[0]; // 検索結果の最初の映画を取得

        if (!movie) {
            return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
        }

        return NextResponse.json(movie);
    } catch (error) {
        console.error('Error fetching track:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}