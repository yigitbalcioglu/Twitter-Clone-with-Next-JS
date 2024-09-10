import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import getWithEmail from "@/app/api/getWithEmail";
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export async function signup(values: any) {

    try {

        // Kullanıcı adını ve email'i kontrol et
        const checkResponse = await fetch(`http://localhost:1337/api/all-users?filters[$or][0][username][$eq]=${values.username}&filters[$or][1][email][$eq]=${values.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const checkData = await checkResponse.json();

        if (checkData.data.length > 0) {
            throw new Error('Kullanıcı adı veya email zaten kullanımda.');
        }
        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(values.password, 10);

        const uniqueTweetId = uuidv4();

        // Form verilerini API'ye gönder
        const formData = {
            username: values.username,
            email: values.email,
            password: hashedPassword,
            userId: uniqueTweetId
        };

        // Örneğin, Strapi API'ye POST isteği:
        const response = await fetch('http://localhost:1337/api/all-users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: formData }),
        });

        if (!response.ok) {
            throw new Error('Kayıt başarısız oldu');
        }
        toast.success('Kayıt başarılı!');



    } catch (error) {
        throw (error)
    }

    // Call the provider or db to create a user...
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google,
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null

                // logic to salt and hash password
                //const pwHash = saltAndHashPassword(credentials.password)

                // logic to verify if the user exists
                user = await getWithEmail(credentials.email)

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    throw new Error("User not found.")
                }

                // return user object with their profile data
                return user
            },
        }),
    ],
})