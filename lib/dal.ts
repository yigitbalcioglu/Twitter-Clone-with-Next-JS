import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from './session'
import { redirect } from 'next/navigation'
import { cache } from 'react';

export const verifySession = cache(async () => {
    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie as string)

    if (!session?.userId) {
        redirect('/login')
        return { isAuth: false, userId: "" }
    }

    return { isAuth: true, userId: session.userId as string }
})

export const getUser = cache(async () => {
    const session = await verifySession()

    if (!session) return null

    //düzelt
    try {
        // Kullanıcı adını ve email'i kontrol et
        const response = await fetch(`http://localhost:1337/api/all-users?filters[userId][$eq]=${session.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();

        if (!data || data.data.length === 0) {
            throw new Error('Kullanıcı bulunamadı.');
        }

        const user = data.data[0].attributes;

        return user
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})