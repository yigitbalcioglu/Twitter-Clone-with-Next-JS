interface searchParamsProp {
    searchParams: {
        tweetId: string;
    }
}

const getOneTweet = async ({ searchParams }: searchParamsProp): Promise<ITweetProps | null> => {
    try {
        const response = await fetch(`http://localhost:1337/api/posts/?filters[tweetsId][$eq]=${searchParams.tweetId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data.data[0]

    } catch (error) {
        return null

    }
}

export default getOneTweet