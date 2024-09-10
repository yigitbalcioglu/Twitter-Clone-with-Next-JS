//düzelt

/*
useEffect(() => {
    const fetchTweets = async () => {
        const comments = await getComments(post.attributes.tweetsId)
        const likes = await getLikes(post.attributes.tweetsId) as any[]

        if (likes) {
            setLikesLength(likes.length)
            for (const i in likes) {
                if (currentUserId === likes[i].attributes.UserId) {
                    console.log("User has already liked this post:");
                }
                else {
                    console.log("User has not liked this post yet.");
                }
            }

        }
        else {
            setLikesLength(0)
        }

        if (comments) {
            setCommentLength(comments.length)
        }
        else {
            setCommentLength(0)
        }

        setPhoto(await getPhoto(user.userId) as string)


    };

    fetchTweets();
}, [post]);
*/