export async function getComments(tweetId: string): Promise<ITweetProps[] | null> {

    try {

        const response = await fetch(`http://localhost:1337/api/posts?sort=createdAt:desc&filters[parent][$eq]=${tweetId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();

        if (!data || data.data.length === 0) {
            throw new Error('Kullanıcı bulunamadı.');
        }

        return data.data

    } catch (error) {
        return null
    }

}

export async function getHomePageComments(tweets: ITweetProps[]): Promise<ITweetProps[] | null> {
    try {
        // Tüm tweetId'ler için paralel fetch işlemi yapıyoruz
        const fetchPromises = tweets.map((tweet) => {
            return fetch(`http://localhost:1337/api/posts?filters[parent][$eq]=${tweet.attributes.tweetsId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json());
        });

        // Tüm fetch işlemlerinin bitmesini bekliyoruz
        const responses = await Promise.all(fetchPromises);

        // Tüm response'ların data kısımlarını birleştiriyoruz
        const allComments = responses.flatMap(response => response.data || []);

        if (allComments.length === 0) {
            throw new Error('Yorum bulunamadı.');
        }

        return allComments;
    } catch (error) {
        return null;
    }
}
