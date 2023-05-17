import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { List, Avatar, Typography, Row, Col } from 'antd';

function SideVideo() {
    
    const [SideVideos, setSideVideos] = useState([]);

    useEffect(() => {
        axios.get('/api/video/getVideos')
        .then(response => {
            if (response.data.success) {

                console.log(response.data.videos)
                setSideVideos(response.data.videos)

            } else {
                alert("fail to get videos")
            }
        })
    }, [])

    const sideVideoItem = SideVideos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return (
            <div style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
                <div style={{ width: '40%', marginRight:'1rem' }}>
                    <a href={`/video/${video._id}`} style={{ color:'gray' }}>
                        <img style={{ width: '100%' }} alt ="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                    </a>
                </div>

                <div style={{ width:'50%' }}>
                    <a href={`/video/${video._id}`} style={{ color:'gray' }}>
                        <span style={{ frontSize: '1rem', color: 'black' }}> {video.title} </span><br />
                        <span>{video.writer.name}</span><br />
                        <span>{video.views}</span><br />
                        <span>{minutes}:{seconds}</span><br />
                    </a>
                </div>
            </div>
        )
    })

    return (

        <div style={{ marginTop: '3rem' }}>
            {sideVideoItem}
        </div>
        
    )
}

export default SideVideo