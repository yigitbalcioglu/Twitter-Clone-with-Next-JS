interface OwnerIdProp {
    ownersId: string;
}

export default async function GetCurrentUser({ ownersId }: OwnerIdProp) {

    try {

        // Örneğin, Strapi API'ye POST isteği:
        const response = await fetch(`http://localhost:1337/api/all-users?filters[userId][$eq]=${ownersId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();

        if (!data || data.data.length === 0) {
            throw new Error('Kullanıcı bulunamadı.');
        }

        return data.data[0].attributes

    } catch (error) {
        throw (error)
    }
}