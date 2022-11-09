<<<<<<< HEAD
const { request, response } = require('express');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json())


//array for post requestt
const hello = [
    {id: 1, name: 'hello1' },
    {id: 2, name: 'hello2' },
    {id: 3, name: 'hello3' },
]

const port = process.env.API_PORT || 3000;

app.get('/', (req, res) => {
    res.send('this is an api')
});

app.get('/api/v1/hello', (req, res) => {
    res.send(hello);
});

app.post('/api/v1/hello', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('you did this wrong. go read the non existant documentation')
    };
    
    const hi = {
        id: hello.length + 1, //chage to 1
        name: req.body.name
    };
    hello.push(hi);
    res.send(hi);
})

app.get('/api/v1/hello/:id', (req, res) => {
   const hi = hello.find(c => c.id === parseInt(req.params.id));
   if (!hi) res.status(404).send('the hello you wanted to get did not have any hello')
   res.send(hi)
})

app.listen(port, () => console.log(`this might be an api idk tho. Listening on port ${port}. To change the port change the API_PORT enviormental variable. The default port is 3000`))