import getPhoto from "./getPhoto";

export default async function fetchRelatedUrls(users: IUserProps[]): Promise<IUserPhotoProps[] | null> {
    try {
        // Tüm kullanıcıların fotoğraf URL'lerini tutacak array
        const photoUrls: IUserPhotoProps[] = [];

        // Tüm kullanıcıları dolaşarak getPhoto fonksiyonu ile fotoğraflarını al
        for (const user of users) {
            photoUrls.push({
                photoUrl: await getPhoto(user.userId),
                userId: user.userId
            }); // Her bir kullanıcı için URL'yi array'e ekle
        }

        return photoUrls;

    } catch (error) {
        throw error
    }
}
