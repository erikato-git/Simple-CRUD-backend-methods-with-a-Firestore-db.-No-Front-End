const express = require('express');
const app = express();
const controller = require('./controller/Controller.js');
const path = require('path');

// Til test af POST-method
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get('/', (req,res) => {
    const status = "America First!"
    res.render("index", {'variabel' : status});
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
    // console.log( req.body )

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