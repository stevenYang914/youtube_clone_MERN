import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { List, Avatar, Typography, Row, Col } from 'antd';

import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber'
import Comments from './Sections/Comments'

function DetailVideoPage(props) {

    const videoId = props.match.params.videoId;
    const [Video, setVideo] = useState([]);

    const [CommentLists, setCommentLists] = useState([]);

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
        .then(response => {
            if (response.data.success) {

                console.log(response.data.video)
                setVideo(response.data.video)

            } else {
                alert("fail to get videos info")
            }
        })
    }, [])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    if (Video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
    
                        <List.Item
                            actions={[ <Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} /> ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={<a href="https://ant.design"> {Video.title} </a>}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>

                        <Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={updateComment} />
    
                    </div>
                </Col>
    
                <Col lg={6} xs={24}>
                    
                    <SideVideo />
                    
                </Col>
                
            </Row>
            
        )
    } else {
        return(
            <div>Loading...</div>
        )
    }

    
}

export default DetailVideoPage