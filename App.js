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
    controller.Delete(req.params.id)
})

app.put('/:id', (req,res) => {
    // console.log("req.body.name: "+req.body.name)
    // console.log("req.body.phone: "+req.body.phone)
    const updatePerson = 
    {  
        id: req.params.id,
        name: req.body.name,
        phone: req.body.phone
    }

    controller.Update(updatePerson)
})


app.listen(3000)