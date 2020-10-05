const express = require('express');
const server = express();
const port = 3000;
const postsRouter = require("./posts/posts-router")
const cors = require('cors')


server.use(express.json())
server.use(cors())
server.use(postsRouter)

server.get('/', (req, res) => {
    res.json({
		message: "Welcome to our API",
	})
})


server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

