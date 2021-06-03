

function getTasks(){
    console.log("getTasks()")

    fetch('/tasks')
    .then(res => res.json())
    .then(e => console.log(e))
}


function postTask(args){
    console.log("postTask()")
    
    //TODO: preventDefault-mekanisme
    //TODO: hash/kryptering

    fetch('/',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            name: args.post_name.value,
            phone: args.post_phone.value
        })
    })
}

function testResults(event){
    console.log(event.inputbox.value)
}





getTasks()