import React from 'react'
import { verifySession } from '@/lib/dal';
import getOneTweet from '@/hooks/getOneTweet';
import { RelatedComments } from '@/components/Comment/RelatedComments';
import { getComments, getHomePageComments } from '@/hooks/getComments';
import GetUser from '@/hooks/getUser';
import { TweetonRoute } from '@/components/Tweets/Tweet Component/TweetonRoute';
import SendPost from '@/components/Tweets/Send Tweet/SendPost';
import getPhoto from '@/hooks/getPhoto';
import { fetchLikes, getSingleTweetsLikes } from '@/hooks/fetchLikes';
import fetchRelatedUsers from '@/hooks/fetchTweetsUsers';
import { fetchRetweets, getSingleTweetsRetweets } from '@/hooks/fetchRetweets';

interface searchParamsProp {
    searchParams: {
        tweetId: string;
    }
}

export default async function page({ searchParams }: searchParamsProp) {
    const session = await verifySession()
    const post = await getOneTweet({ searchParams }) as ITweetProps
    const owner = await GetUser(post!.attributes.ownersId)
    const id = session.userId

    // ana tweetin mentleri
    const comments = await getComments(post!.attributes.tweetsId) as ITweetProps[]

    //alttaki mentlerin mentleri
    const commentsOfComments = await getHomePageComments(comments) as ITweetProps[]

    const users = await fetchRelatedUsers(comments) as IUserProps[]
    const likes = await getSingleTweetsLikes(post) as LikeProp[]
    const commentsLikes = await fetchLikes(comments) as LikeProp[]

    //retweets
    const postsRetweets = await getSingleTweetsRetweets(post)
    const retweets = await fetchRetweets(comments)
    console.log(retweets)
    console.log("aa:", postsRetweets)


    return (
        <div>
            <TweetonRoute
                currentUserId={session.userId}
                post={post!}
                user={owner}
                whosLikedTweet={likes}
                commentLength={comments?.length}
                url={await getPhoto(owner.userId)}
                retweets={postsRetweets}
            />

            <SendPost
                mode="Cevap"
                userId={id}
                photoUrl={await getPhoto(id)}
                post={post!}
            />

            <RelatedComments
                currentUserId={session.userId}
                users={users}
                post={post!}
                comments={comments}
                whosLikedTweet={commentsLikes}
                secondaryComments={commentsOfComments}
                retweets={retweets}
            />
        </div>
    )
}
