"use client"

import React, { FC, } from 'react'
import { useRouter } from 'next/navigation';
import QueryString from 'qs';
import { ProfilePhoto } from '@/components/Image/ProfilePhoto';
import TweetsButtons from '../Button/TweetsButtons';

interface PostsListProps {
    post: ITweetProps;
    currentUserId: string;
    user: IUserProps
    url: string
    whosLikedTweet: LikeProp[]
    commentLength: number
    retweets: LikeProp[] | null
}

export const TweetonRoute: FC<PostsListProps> = ({ post, currentUserId, user, url, whosLikedTweet, commentLength, retweets }) => {
    const router = useRouter()

    const month = new Date(post.attributes.date).getMonth()
    const year = new Date(post.attributes.date).getFullYear()
    const hour = new Date(post.attributes.date).getHours()
    const minute = new Date(post.attributes.date).getMinutes()

    //kullanıcı id'leri olan bir string arrayi
    const usersWhoLikedTweet = whosLikedTweet.map(e => e.userId)

    const months = [
        "Ocak",  // 0
        "Şubat", // 1
        "Mart",  // 2
        "Nisan", // 3
        "Mayıs", // 4
        "Haziran", // 5
        "Temmuz", // 6
        "Ağustos", // 7
        "Eylül", // 8
        "Ekim", // 9
        "Kasım", // 10
        "Aralık" // 11
    ];


    return (
        <>
            <div className="cursor-pointer pb-4 ml-4" >
                <div className='flex'>
                    <ProfilePhoto
                        ownerId={post.attributes.ownersId}
                        photo={url} />

                    <div onClick={() => {
                        router.push(`/tweet?${QueryString.stringify({
                            tweetId: `${post.attributes.tweetsId}`
                        })}`)
                    }} className='w-full'>
                        <div className=''>

                            <p className='text-white font-semibold mt-5 pl-1'>{user.username}</p>
                            <p className='text-gray-500 pl-1'>@{user.nickname}</p>
                        </div>
                    </div>

                </div>
                <p className='text-white mt-3 ml-1'>{post.attributes.tweet}</p>
                <div className='text-gray-400 ml-1 mr-5 mt-3 flex  border-b-2 border-neutral-800 pb-6'>
                    <p className='mt-1'>{minute}:{hour} </p>
                    <p className='mx-2 '>.</p>
                    <p className='mt-1'>{months[month]} {year}</p></div>

            </div>
            <TweetsButtons
                currentUserId={currentUserId}
                post={post}
                user={user}
                commentLength={commentLength}
                whosLikedTweet={usersWhoLikedTweet}
                retweetLenght={retweets?.length} />
        </>
    )
}