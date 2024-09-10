import { Comment } from './Comment';
import getPhoto from '@/hooks/getPhoto';

interface PostProp {
    comments: ITweetProps[] | null
    users: IUserProps[]
    currentUserId: string
    whosLikedTweet: LikeProp[]
    post: ITweetProps
    secondaryComments: ITweetProps[] | null
    retweets: LikeProp[] | null
}

export const RelatedComments = async ({ currentUserId, post, comments, users, whosLikedTweet, secondaryComments, retweets }: PostProp) => {

    return (
        <div>
            {comments && comments.length > 0 ?
                (
                    <ul>
                        {comments.map(async (comment) => {
                            // Tweet'teki ownersId ile users içindeki userId'yi karşılaştırıyoruz
                            const usersWhoLikedTweet = whosLikedTweet.filter(like => like.tweetId === comment.attributes.tweetsId).map(e => e.userId)
                            const tweetOwner = users.find(user => user.userId === comment.attributes.ownersId)
                            const photoUrl = await getPhoto(tweetOwner?.userId!);
                            //const relatedComments = comments.filter(comment => comment.attributes.parent === post.attributes.tweetsId).map(e => e.attributes)

                            const commentsOfComments = secondaryComments?.filter(secondaryComment => secondaryComment.attributes.parent === comment.attributes.tweetsId).map(e => e.attributes)

                            return (
                                <li key={comment.id}>
                                    <div className=' hover:bg-gray-950'>
                                        <Comment
                                            currentUserId={currentUserId}
                                            post={comment}
                                            user={tweetOwner!}
                                            photo={photoUrl}
                                            comments={commentsOfComments}
                                            whosLikedTweet={usersWhoLikedTweet}
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

    )
}



