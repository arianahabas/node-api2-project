import React from 'react'
import PostCard from './PostCard'

const PostList = ({post}) => {
    console.log('posts from list' , post)
    return (
        <div>
            <h1>Posts</h1>
            {post.map((item)=>{
                return (
                    <PostCard item={item}/>
                )
            })
        }
        </div>
    )
}

export default PostList
