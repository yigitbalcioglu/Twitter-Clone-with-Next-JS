"use client"

import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { ProfilePhoto } from '@/components/Image/ProfilePhoto';
import TweetsButtons from '../Button/TweetsButtons';
import Post from './Post';

interface PostsListProps {
    post: ITweetProps
    currentUserId: string
    user: IUserProps
    url: string
    whosLikedTweet: string[]
    comments: ITweetProps[]
}

export const Tweet: FC<PostsListProps> = ({ user, post, currentUserId, url, whosLikedTweet, comments }) => {

    return (
        <>
            <div className="flex cursor-pointer pb-4" >

                <ProfilePhoto
                    ownerId={post.attributes.ownersId}
                    photo={url}
                />

                <Post
                    user={user}
                    post={post}
                />

            </div>

            <TweetsButtons
                currentUserId={currentUserId}
                post={post}
                user={user}
                commentLength={comments.length}
                whosLikedTweet={whosLikedTweet}
                retweetLenght={0} />
        </>
    )
}
