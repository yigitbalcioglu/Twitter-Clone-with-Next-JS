import React from 'react'
import { verifySession } from '@/lib/dal';
import { EditButton } from './Buttons/EditButton';
import { SendMessageButton } from './Buttons/SendMessageButton';
import { FollowButton } from './Buttons/FollowButton';

interface Prop {
    userId: string;
}

export default async function UserBioButtons({ userId }: Prop) {
    const session = await verifySession()


    return (
        <div className='text-white'>
            {session.userId === userId ?
                (<EditButton />)
                :
                (<div className='flex'>
                    <SendMessageButton />
                    <FollowButton />
                </div>)}
        </div>
    )
}
