const express = require("express")
const { findById } = require("../data/db")

const router = express.Router()
const posts = require('../data/db')

//POST - Creates a post using the information sent inside the request body - DONE
router.post('/api/posts' , (req,res) =>{
    if(!req.body.title || !req.body.contents){
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    } else {
        posts.insert(req.body)
        .then((post)=>{
            res.status(201).json(post)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).json({
              error: "There was an error while saving the post to the database",
            })
        })
    }   
})

//POST - Creates a comment for the post with the specified id using information sent inside of the request body. --ERROR
router.post('/api/posts/:id/comments', (req,res) => {
  
    if(!req.body.text){
        return res.status(400).json({
            errorMessage: "Please provide text for the comment."
        })
    } 

    posts.insertComment(req.body)
    .then((comment)=>{
        if(comment){
            res.status(201).json(comment)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({
            error: "There was an error while saving the post to the database",
        })
    })
    
})

//GET - Returns an array of all the post objects contained in the database. -DONE
router.get('/api/posts', (req,res) =>{
    posts.find()
    .then((post)=> {
        res.status(200).json(post)
    })
    .catch((err)=>{
        console.log(error)
			res.status(500).json({
				message: "Error retrieving the posts",
			})
    })
})

//GET - Returns the post object with the specified id. --STATUS 404 not working
router.get('/api/posts/:id',  (req, res) => { 
    posts.findById(req.params.id)
    .then((post)=>{
        if (post) {
            res.status(200).json(post)
        } else {
            //status 400 not working - returns an empty array
            res.status(404).json({
                message:'Post not found'
            })
        }
    })
    .catch((err)=>{
        console.log(error)
			res.status(500).json({
				message: "Error retrieving the post",
			})
    })
})

//GET - Returns an array of all the comment objects associated with the post with the specified id. --STATUS 404 not working
router.get('/api/posts/:id/comments',  (req,res) => {
    posts.findPostComments(req.params.id)
        .then((comments)=>{
            if(comments){
                res.status(200).json(comments)
            } else {
                // //status 404 not working - returns  an empty array
                res.status(404).json({
                    message:'Post not found'
                })
            }
        })
        .catch((err)=>{
            console.log(error)
			res.status(500).json({
				message: "Error retrieving the comments",
			})
        })
})

//DELETE - Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement. --DONE
router.delete('/api/posts/:id', (req,res) => {
    posts.remove(req.params.id)
        .then((post)=>{
            if(post > 0){
                res.status(200).json({
                    message: "The post is destroyed successfully"
                })
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((error)=>{
            console.log(error)
                res.status(500).json({
                    error: "The post could not be removed",
                })
        })
})

//PUT - Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original. --DONE
router.put('/api/posts/:id',  (req,res) => {
    //update
    if(!req.body.title || !req.body.contents){
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    
    } else {
        posts.update(req.params.id, req.body)
        .then((post)=>{
            if(post){
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((error)=>{
            res.status(500).json({
                error: "The post information could not be modified."
            })
        })
    }
})



module.exports = router