const router = require("express").Router();
const { promise } = require("bcrypt/promises");
const res = require("express/lib/response");
const Post = require("../models/Post");
const User = require("../models/User");
//create a post

router.post("/", async(req, res) => {
    const newpost = new Post(req.body)
    try {
        const savedPost = await newpost.save()
        res.status(200).json(save)
    } catch (err) {
        res.status(500).json(err)
    }
})
//update post
router.put("/", async(req,res)=>{
    try{
    const post = await post.findById(req.params.id)
    if(post.userId === req.body.userId) {
        await post.updateOne({$set:req.body})
        res.status(200).json("the post has been updated")
    } else {
        res.status(403).json("you can update only your post")
    } 
 } catch(err) {
        res.status(500).json(err)
    }
})
//delete post 
router.delete("/", async(req,res)=>{
    try{
    const post = await post.findById(req.params.id)
    if(post.userId === req.body.userId) {
        await post.deleteOne({$set:req.body})
        res.status(200).json("the post has been deleted")
    } else {
        res.status(403).json("you can delete only your post")
    } 
 } catch(err) {
        res.status(500).json(err)
    }
})
//like / dislike post

router.put("/:id/like", async(req,res) =>{
    try {
        const post = await this.post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: {likes: req.body.userId } })
            res.status(200).json.apply("the post has been liked")
        } else {
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("the post has been disliked")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
//get a post 

router.get("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(err)
    }
})
//get all posts
router.get("/timeline/all", async(req, res)=>{
    try {
        const currentUser = await User.findById(req.body.userId)
        const userPosts = await Post.find({userId: currentUser._id})
        const friendPosts = await promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({ userId: friendId})
            })
        )
        res.json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;