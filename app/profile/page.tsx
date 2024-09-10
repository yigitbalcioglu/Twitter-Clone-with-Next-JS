import { UserProfile } from "@/components/profile/userProfile"
import { cookies } from "next/headers"
import { decrypt } from "@/lib/session"
import { JWTPayload } from "jose"


interface ProfileProp {
    searchParams: {
        cameFrom?: string
    }
}

export default async function Profile({ searchParams }: ProfileProp) {
    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie) as JWTPayload
    const url = searchParams?.cameFrom ?? session.userId as string
    return (
        <>
            <UserProfile
                profileId={url} />
        </>
    )
}


