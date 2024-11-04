import { getAccessToken } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { title: string } }) {
    const { title } = params;
    const token = await getAccessToken();

    // Fetch URLを正しく構築
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(title)}&type=track`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch track data' }, { status: response.status });
        }

        const data = await response.json();
        const track = data.tracks.items[0]; // 検索結果の最初のトラックを取得

        if (!track) {
            return NextResponse.json({ error: 'Track not found' }, { status: 404 });
        }

        return NextResponse.json(track);
    } catch (error) {
        console.error('Error fetching track:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}