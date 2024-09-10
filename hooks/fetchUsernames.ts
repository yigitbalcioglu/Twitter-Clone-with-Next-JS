export const fetchUsername = async (tweetId: number) => {
    try {
        const response = await fetch(`http://localhost:1337/api/all-users?filters[userId][$eq]=${tweetId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        const user = data.data[0]?.attributes;
        return user ? user.username : "Unknown User";
    } catch (error) {
        console.error("Unexpected error occurred while fetching username:", error);
        return "Unknown User";
    }
};