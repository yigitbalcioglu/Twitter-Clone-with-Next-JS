export const postRequest = async (tweetBody: string, userId: string, parent: string | null) => {
    const response = await fetch("/api/tweets/sendTweet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId,
            tweet: tweetBody,
            date: new Date(),
            parent: parent
        }),
    });

    if (!response.ok) {
        throw new Error("Tweet gönderimi başarısız oldu.");
    }
};