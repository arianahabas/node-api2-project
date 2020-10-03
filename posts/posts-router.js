const express = require("express")

const router = express.Router()
const db = require('../data/db')
const posts = require('../data/db')

//POST - Creates a post using the information sent inside the request body


//POST - Creates a comment for the post with the specified id using information sent inside of the request body.


//GET - Returns an array of all the post objects contained in the database. 

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

//GET - Returns the post object with the specified id.


//GET - Returns an array of all the comment objects associated with the post with the specified id.


//DELETE - Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.


//PUT - Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.




module.exports = router