import React from 'react'
import { UserHeader } from './userHeader'
import { UserPhoto } from './userPhoto'
import { UserBio } from './userBio'
import { UserButtons } from './userButtons'
import { UserTweets } from './userTweets'
import UserBioButtons from './userBioButtons'

interface UserProfileProp {
    profileId: string
}

export const UserProfile: React.FC<UserProfileProp> = ({ profileId }) => {
    return (
        <div>
            <UserHeader />
            <UserPhoto userId={profileId} />
            <div className='flex justify-between'>
                <UserBio userId={profileId} />
                <div className='m-5'>
                    <UserBioButtons userId={profileId} />
                </div>
            </div>
            <UserButtons />
            <UserTweets userId={profileId} />
        </div>
    )
}
