"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import QueryString from 'qs'

interface IPostProp {
    post: ITweetProps
    user: IUserProps
}

const Post = ({ post, user }: IPostProp) => {

    const month = new Date(post.attributes.date).getMonth()
    const year = new Date(post.attributes.date).getFullYear()
    const hour = new Date(post.attributes.date).getHours()
    const minute = new Date(post.attributes.date).getMinutes()

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


    const router = useRouter()

    return (
        <div onClick={() => {
            router.push(`/tweet?${QueryString.stringify({
                tweetId: `${post.attributes.tweetsId}`
            })}`)
        }}
            className='w-full'>
            <div className='flex'>
                <p className='text-white font-semibold mt-5'>{user.username}</p>
                <p className='text-gray-500 mt-5 pl-1'>@{user.nickname}</p>
                <p className='text-gray-500 mt-4 pl-1'>.</p>
                <p className='text-gray-500 mt-5 pl-1'>{hour}</p>
                <p className='text-gray-500 mt-5'>:</p>
                <p className='text-gray-500 mt-5'>{minute}</p>
                <p className='text-gray-500 ml-2 mt-5 pl-1'>{months[month]}</p>
                <p className='text-gray-500 mt-5 pl-1'>{year}</p>

            </div>
            <p className='text-white'>{post.attributes.tweet}</p>
        </div>
    )
}

export default Post