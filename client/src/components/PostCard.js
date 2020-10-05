import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
    border:2px solid black;
    width: 30vw;
    margin: 20px auto;
    padding: 20px;

`

const PostCard = ({item}) => {
    return (
        <Card>
            <h4>Title</h4>
            {item.title}
            <br/>
            <h4>Contents</h4>
            {item.contents}
        </Card>
    )
}

export default PostCard
