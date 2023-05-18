import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import axios from 'axios';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)

    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = {};

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {

        axios.post('/api/like/getLikes', variable)
        .then(response => {
            if (response.data.success) {

                // How many likes does this video or comment have
                setLikes(response.data.likes.length)
                
                // Check ff already clicked like button or not to set appearance of button
                response.data.likes.map((like) => {
                    if (like.userId === props.userId) {
                        setLikeAction('liked')
                    }
                })

            } else {
                alert("Failed to get likes")
            }
        })

        axios.post('/api/like/getDislikes', variable)
        .then(response => {
            if (response.data.success) {

                // How many likes does this video or comment have
                setDislikes(response.data.dislikes.length)
                
                // If already clicked like button or not
                response.data.dislikes.map((dislike) => {
                    if (dislike.userId === props.userId) {
                        setDislikeAction('disliked')
                    }
                })

            } else {
                alert("Failed to get dislikes")
            }
        })


    }, [])

    const onLike = () => {
        // Case 1: like button not cliked yet
        if (LikeAction === null) {

            axios.post('/api/like/upLike', variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(Likes + 1);
                    setLikeAction('liked')

                    // if dislike button is already clicked
                    if (DislikeAction !== null) {
                        setDislikeAction(null);
                        setDislikes(Dislikes - 1);
                    }
                    

                } else {
                    alert("Failed to increase like")
                }
            })

        }

        // Case 2: like button is already cliked (unlike)
        else {

            axios.post('/api/like/unLike', variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(Likes - 1);
                    setLikeAction(null)

                } else {
                    alert("Failed to decrease like")
                }
            })

        }

        
    }


    const onDisLike = () => {
        if (DislikeAction === null) {

            axios.post('/api/like/upDislike', variable)
            .then(response => {
                if (response.data.success) {

                    setDislikes(Dislikes + 1);
                    setDislikeAction("disliked")

                    // if like button is already clicked
                    if (LikeAction !== null) {
                        setLikeAction(null);
                        setLikes(Likes - 1);
                    }

                } else {
                    alert("Failed to increase Dislike")
                }
            })
            
        } else {

            axios.post('/api/like/unDislike', variable)
            .then(response => {
                if (response.data.success) {

                    setDislikes(Dislikes - 1);
                    setDislikeAction(null);

                } else {
                    alert("Failed to unDislike")
                }
            })

        }
    }

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction == "liked" ? 'filled' : 'outlined'}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={DislikeAction == "disliked" ? 'filled' : 'outlined'}
                        onClick={onDisLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislikes