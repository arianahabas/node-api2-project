import React, {useState} from 'react';
import axios from 'axios'
import PostList from './components/PostList'
import './App.css';

function App() {

const [post, setPost] = useState([])

const fetchPost = () => {
  axios
  .get('http://localhost:3000/api/posts/')
  .then((res)=>{
    console.log('res',res)
    setPost(res.data)
  })
  .catch((err)=>{
    console.log(err);
  })
}

const onClick = (e) => {
  e.preventDefault()
  fetchPost()
}

  return (
    <div className="App">
      <button onClick={onClick}>Fetch Posts</button>
      <PostList post={post}/>
    </div>
  );

  }

export default App;
