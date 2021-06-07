
// Build with a list

function getTasks(){

    fetch('/tasks')
    .then(res => res.json())
    .then((data) => {
        const root = document.getElementById("root");

        let output = '<id="taskList">'
        data.forEach((item) => {
            output += `
                <ul id=${item.id} class="list-group mb-3">
                    <li name="name" class="list-group-item">${item.name}</li>
                    <li name="phone" class="list-group-item">${item.phone}</li>
                </ul>
            `;
        });
        output += '</table>'

        root.innerHTML = output;
    })
}



// Not necessary to be implemented. Just to have an example in future

function postTask(args){
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


// Not completed

function updateTask(args){

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











// Get Task - Build with a Table instead of a List

// function getTasks(){

//     fetch('/tasks')
//     .then(res => res.json())
//     .then((data) => {
//         const root = document.getElementById("root");

//         let output = '<table id="taskTable" border="1"><tr><th>Name:</th><th>Phone:</th></tr>'
//         data.forEach((item) => {
//             output += `
//                 <tr id=${item.id}>
//                     <th name="name">${item.name}</th>
//                     <th name="phone">${item.phone}</th>
//                 </tr>
//             `;
//         });
//         output += '</table>'

//         root.innerHTML = output;
//     })
// }
