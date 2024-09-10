export const handleRetweet = async (userId: string, tweetId: string) => {
    try {
        // Kullanıcı adını ve email'i kontrol et
        const checkResponse = await fetch(`http://localhost:1337/api/retweets`, {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    userId: userId,
                    tweetId: tweetId,
                }
            }),
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (!checkResponse.ok) {
            throw new Error('Post failed.');
        }

        return Response.json({ message: "Success" }, { status: 201 });

    } catch (error) {
        throw error
    }
}
export const handleRemoveRetweet = async (userId: string, tweetId: string) => {
    try {
        // İlk önce o beğeninin ID'sini bulmak için bir GET isteği yapalım
        const getResponse = await fetch(`http://localhost:1337/api/retweets?filters[userId][$eq]=${userId}&filters[tweetId][$eq]=${tweetId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await getResponse.json();

        if (!data.data || data.data.length === 0) {
            throw new Error('Like not found.');
        }

        // Beğeniyi silmek için ID'yi kullanarak DELETE isteği yapıyoruz
        const retweetId = data.data[0].id; // Beğeninin ID'sini alıyoruz
        const deleteResponse = await fetch(`http://localhost:1337/api/retweets/${retweetId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!deleteResponse.ok) {
            throw new Error('Delete failed.');
        }

        return { message: "Success" };

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};





