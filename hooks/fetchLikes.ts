export const fetchLikes = async (tweets: ITweetProps[]): Promise<LikeProp[] | null> => {

    const tweetIds = tweets?.map(tweet => tweet.attributes.tweetsId);

    // Use the ownerIds in a query to fetch corresponding users from your API
    const query = tweetIds?.map(id => `filters[tweetId][$eq]=${id}`).join('&');

    try {
        const checkResponse = await fetch(`http://localhost:1337/api/likes?${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!checkResponse.ok) {
            throw new Error('Post failed.');
        }

        const data = await checkResponse.json();

        const datas = data.data.map((x: { attributes: LikeProp }) => x.attributes);

        return datas;

    } catch (error) {
        throw error
    }
}

export const getSingleTweetsLikes = async (tweets: ITweetProps): Promise<LikeProp[] | null> => {

    try {
        const checkResponse = await fetch(`http://localhost:1337/api/likes?filters[tweetId][$eq]=${tweets.attributes.tweetsId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!checkResponse.ok) {
            throw new Error('Post failed.');
        }

        const data = await checkResponse.json();

        const datas = data.data.map((x: { attributes: LikeProp }) => x.attributes);

        return datas;

    } catch (error) {
        throw error
    }
}