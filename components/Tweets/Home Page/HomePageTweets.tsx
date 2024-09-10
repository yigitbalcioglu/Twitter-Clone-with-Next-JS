"use client"

import React from 'react'
import { Tweet } from '../Tweet Component/Tweet';

interface PostsListProps {
    userId: string
    tweets: ITweetProps[]
    users: IUserProps[]
    urls: IUserPhotoProps[]
    likes: LikeProp[]
    comments: ITweetProps[]
}

const HomePageTweets = ({ userId, tweets, users, urls, likes, comments }: PostsListProps) => {

    return (
        <div>
            {tweets && tweets.length > 0 ?
                (
                    <ul>
                        {tweets.map((tweet) => {
                            // Tweet'teki ownersId ile users içindeki userId'yi karşılaştırıyoruz
                            const tweetOwner = users.find(u => u.userId === tweet.attributes.ownersId);
                            const url = urls.find(u => u.userId === tweet.attributes.ownersId)
                            const usersWhoLikedTweet = likes.filter(like => like.tweetId === tweet.attributes.tweetsId).map(e => e.userId)
                            const relatedComments = comments.filter(comment => comment.attributes.parent === tweet.attributes.tweetsId).map(e => e.attributes)

                            return (
                                <li key={tweet.id}>
                                    <div className='pb-4'>
                                        <Tweet
                                            currentUserId={userId}
                                            post={tweet}
                                            user={tweetOwner!}
                                            url={url?.photoUrl!}
                                            whosLikedTweet={usersWhoLikedTweet}
                                            comments={relatedComments}
                                        />
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <p>{null}</p>
                )
            }
        </div >
    );
};

export default HomePageTweets;
