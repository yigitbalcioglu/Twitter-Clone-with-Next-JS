"use client"

import { useState, useEffect } from "react";
import { Tweet } from "../Tweets/Tweet Component/Tweet";

interface PostsListProps {
    userId: string;
    user: IUserProps
}

export const UserTweets = ({ userId, user }: PostsListProps) => {

    const [posts, setPosts] = useState<ITweetProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [show, setShow] = useState<number>(0)
    const [body, setBody] = useState<string>("")
    const [username, setUsername] = useState("")
    const [nickname, setNickname] = useState("")

    useEffect(() => {
        const fetchTweets = async () => {
            try {

                const response = await fetch(`http://localhost:1337/api/posts?sort=createdAt:desc&filters[ownersId][$eq]=${userId}&filters[parent][$null]=true`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch tweets');
                }

                const data = await response.json();
                setPosts(data.data);
            } catch (error) {
                throw (error)
            }
        };

        fetchTweets();
    }, [userId]);
    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Tweet
                            user={user}
                            currentUserId={userId}
                            post={post} />

                    </li>
                ))}
            </ul>
        </div >
    )
}
