const express = require('express');
const app = express();

// Til test af POST-method
app.use(express.urlencoded({extended: true}));
app.use(express.json())



app.get('/', (req,res) => {
    res.send("Hello");
})

app.post('/', (req,res) => {
    console.log( req.body )
})

app.delete('/:id', (req,res) => {
    console.log(req.params)
})

app.put('/:id', (req,res) => {
    console.log(req.params)
})

app.listen(3000)