export default async function fetchRelatedUsers(tweets: ITweetProps[]): Promise<IUserProps[] | null> {
    try {
        // Collect all ownerIds from the tweets
        const ownerIds = tweets.map(tweet => tweet.attributes.ownersId);

        // Use the ownerIds in a query to fetch corresponding users from your API
        const query = ownerIds.map(id => `filters[userId][$eq]=${id}`).join('&');

        const response = await fetch(`http://localhost:1337/api/all-users?${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!data || data.data.length === 0) {
            throw new Error('Kullanıcı bulunamadı.');
        }

        // Return only the attributes part of each user
        const usersWithAttributes = data.data.map((user: { attributes: IUserProps }) => user.attributes);

        return usersWithAttributes;

    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
}
