const express = require('express');
const cors = require('cors');
const server = express();
server.use(express.json());
server.use(cors());
const actionRouter = require('./routes/actionRouter');
const projectRouter = require('./routes/projectRouter');
const port = 8000;

server.get('/', (req, res) => {
    res.send('<h2>Hello Sprint</h2>')
});

server.use('/projects', projectRouter);
server.use('/actions', actionRouter);


server.listen(port, () => console.log(`This is up and running on port ${port}`));