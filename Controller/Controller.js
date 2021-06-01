
const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


exports.Create = async function(args) {

    const person =  await db.collection("Person")
                    .where('name', '==', args.name)
                    .where('phone', '==', args.phone)
                    .get()

    // Hvis personen ikke findes i databasen: Sandt -> Create
    if(person.empty){
        db.collection("Person").doc().set({
            name: args.name,
            phone: args.phone
        })
    }else{
        return "PERSONEN FINDES ALLEREDE";
    }

}


exports.Read = function() {

    return "Read";
}


exports.Update = function() {

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