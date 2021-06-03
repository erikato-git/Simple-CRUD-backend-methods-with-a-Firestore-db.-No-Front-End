const express = require('express');
const app = express();
const controller = require('./controller/Controller.js');

// Til test af POST-method
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// Sending views-folder to client
app.use(express.static(__dirname + '/views'));


app.get('/', (req,res) => {
    res.sendFile("views/index.html")
})

app.get('/tasks', (req,res) => {
    // console.log(req.body)

    controller.Read(req.body)
    .then((persons) => {
        // console.log(persons)
        return res.send(JSON.stringify(persons))
    })
    .catch(err => {
        return "Error";
    })
})

app.post('/', async (req,res) => {
    console.log( req.body )

    const status = await controller.Create(req.body)

    res.send(status);
})

app.delete('/:id', (req,res) => {
    const personSlettet = controller.Delete(req.params)
    console.log(personSlettet)
})

app.put('/:id', async (req,res) => {
    // console.log("req.body.name: "+req.body.name)
    // console.log("req.body.phone: "+req.body.phone)
    const updatePerson = 
    {  
        id: req.params.id,
        name: req.body.name,
        phone: req.body.phone
    }

    const status = await controller.Update(updatePerson)
    console.log("Status: "+status)
})


app.listen(3000)