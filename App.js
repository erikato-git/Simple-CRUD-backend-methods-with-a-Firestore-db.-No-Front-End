const express = require('express');
const app = express();
const controller = require('./Controller/Controller.js');

// Til test af POST-method
app.use(express.urlencoded({extended: true}));
app.use(express.json())



app.get('/', (req,res) => {
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

app.post('/', (req,res) => {
    // console.log( req.body )

    controller.Create(req.body)
    .then(message => {
        if("PERSONEN FINDES ALLEREDE" == message){
            res.send(message);
        }else{
            res.send("PERSONEN ER OPRETTET")
        }
    })
    .catch(err => {
        console.log(err)
    })
})

app.delete('/:id', (req,res) => {
    // console.log(req.params)

    console.log(controller.Delete())
})

app.put('/:id', (req,res) => {
    // console.log(req.params)

    console.log(controller.Update())
})


app.listen(3000)