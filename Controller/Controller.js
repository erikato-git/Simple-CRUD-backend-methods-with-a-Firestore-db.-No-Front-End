
const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();




exports.Create = async function(args) {

    //Tjek for datatyper og Null
    //TODO: Undersøg om man kan gøre det vha. mongoose

    const findPerson =  await db.collection("Person")
                        .where('name', '==', args.name)
                        .where('phone', '==', args.phone)
                        .get()

    // Hvis personen ikke findes i databasen: Sandt -> Create
    if(findPerson.empty){
        db.collection("Person").doc().set({
            name: args.name,
            phone: args.phone
        })
    }else{
        return "PERSONEN FINDES ALLEREDE";
    }
}


exports.Read = async function() {
    const persons = await db.collection("Person").get()

    return persons.docs.map(doc => doc.data());
}


exports.Update = async function(args) {

    console.log("args: "+args)

    const updatePerson =    await db.collection("Person")
                            .where('name', '==', args.name)
                            .where('phone', '==', args.phone)
                            .set({
                                name: args.name,
                                phone: args.phone
                            })


    return "Update";
}


exports.Delete = function() {

    return "Delete";
}



// JSON Test-data
/*
[
    {
       "id":28,
       "Title":"Sweden"
    },
    {
       "id":56,
       "Title":"USA"
    },
    {
       "id":89,
       "Title":"England"
    }
 
 ]
 */