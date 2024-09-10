export async function FetchTweets(amount: number): Promise<ITweetProps[] | null> {

    try {
        const response = await fetch(`http://localhost:1337/api/posts?sort=createdAt:desc&pagination[limit]=${amount}&filters[parent][$null]=true`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        return data.data

    } catch (error) {
        return null

    }
}
