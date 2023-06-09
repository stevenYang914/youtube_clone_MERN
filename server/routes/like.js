const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike")

const { auth } = require("../middleware/auth");

//====================================
//             Likes & Dislikes
//====================================

router.post('/getLikes', (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {commentId: req.body.commentId}
    }

    Like.find(variable)
    .exec((err, likes) => {
        if (err) return res.status(400).json({ success: false, err })

        return res.status(200).json({ success: true, likes })
    })

})

router.post('/getDislikes', (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {commentId: req.body.commentId}
    }

    Dislike.find(variable)
    .exec((err, dislikes) => {
        if (err) return res.status(400).json({ success: false, err })

        return res.status(200).json({ success: true, dislikes })
    })

})

router.post('/upLike', (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    // save like information in MongoDB
    const like = new Like(variable);
    like.save((err, likeResult) => {
        if (err) return res.status(400).json({ success: false, err })
        
        // If dislike button is clicked already, need to delete the disike 
        Dislike.findOneAndDelete(variable)
        .exec((err, dislikeResult) => {
            if (err) return res.status(400).json({ success: false, err })

            return res.status(200).json({
                success: true
            })
        })
    })

})


router.post('/upDislike', (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    // save dislike information in MongoDB
    const dislike = new Dislike(variable);
    dislike.save((err, dislikeResult) => {
        if (err) return res.status(400).json({ success: false, err })
        
        // If like button is clicked already, need to delete the like
        Like.findOneAndDelete(variable)
        .exec((err, likeResult) => {
            if (err) return res.status(400).json({ success: false, err })

            return res.status(200).json({
                success: true
            })
        })
    })

})


router.post('/unLike', (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Like.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })

        return res.status(200).json({
            success: true
        })
    })

})

router.post('/unDislike', (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })

        return res.status(200).json({
            success: true
        })
    })

})


module.exports = router;