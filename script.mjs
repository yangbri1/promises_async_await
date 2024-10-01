// Async & Await practice (could be done using promises & .then()...)
// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./database.mjs";

async function getUserData(id) {

    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
    };

    try {

        // Look in central to tell us what db contains user
        const returnedCentralValue = await central(id); // needs "async" in front of function but can use "async" w/o "await"

        // look in specific user database, recommended by central
        const basicUserData = await dbs[returnedCentralValue](id);

        // look in vault for PRIVATE user data
        const privateUserData = await vault(id);

        let userData = gatherData(id, basicUserData, privateUserData);
        // return privateUserData;

        return userData;

    } 
    catch (err) {
        console.error(err);
    }
    
}

// Helper function
function gatherData(id, basicUD, privateUD){ // these are placeholders so they can be any

    return {
        // data manipulation -- retrieve data & organize
        id: id,
        name: privateUD.name, // use dot notation b/c it's an obj
        username: basicUD.username,
        email: privateUD.email,
        address: privateUD.address, // unless specified we don't need to make a deep copy
        phone: privateUD.phone,
        website: basicUD.website,
        company: basicUD.company

    }
}
// console.log(await db1(2)); // just to check that we are connected -- need "await" keyword to show as said in lecture & by Vishaun

console.log(await getUserData(3)); // only 1-10 value 
// console.log(await )
// What do we know?
// Central db: tells us what other db to look in for an user
// db1, db2, db3 contains user info
// dbs[valueReturnedFromCentral](id)
// value contains private user info
// const returnedValue = await vault(id);


// {
//     id: number,
//     name: string,
//     username: string,
//     email: string,
//     address: {
//       street: string,
//       suite: string,
//       city: string,
//       zipcode: string,
//       geo: {
//         lat: string,
//         lng: string
//       }
//     },
//     phone: string,
//     website: string,
//     company: {
//       name: string,
//       catchPhrase: string,
//       bs: string
//     }
// }