
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
        const uuid = ""+Date.now()

        db.collection("Person").doc(uuid).set({
            id: uuid,  //Unique ID: Milliseconds from 1970
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

    const findPerson =  await db.collection("Person")
                        .where('id', '==', args.id)
                        .get()

    // console.log(findPerson.docs.map(doc => doc.data()))
 
    if(!findPerson.empty){
       db.collection("Person").doc(args.id).update({
            'name': args.name || findPerson.name,
            'phone': args.phone || findPerson.phone
        })

    }else{
        return "PERSONEN FINDES IKKE";
    }

}


exports.Delete = function(args) {

    db.collection("Person").doc(args.id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

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