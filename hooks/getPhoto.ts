const getPhoto = async (userId: string): Promise<string> => {
    try {
        // Kullanıcı adını ve email'i kontrol et
        const checkResponse = await fetch(`http://localhost:1337/api/all-users?filters[userId][$eq]=${userId}&populate=*`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await checkResponse.json();
        return (data.data[0].attributes.Photo.data.attributes.url)

    } catch (error) {
        const checkResponse = await fetch(`http://localhost:1337/api/deneme-images?filters[num][$eq]=${1}&populate=*`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await checkResponse.json();
        return (data.data[0].attributes.denemeimage.data.attributes.url)

    }
}

export default getPhoto

