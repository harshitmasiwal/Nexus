//do the npm i mongodb for getting the mongodb drivers 

const {MongoClient} = require('mongodb')

const url = "mongo_db_uri"

const client = new MongoClient(url) 
const dbName = "Nexus"


async function main(){

    await client.connect()
    console.log("connected sucessfully to the server")
    const db = client.db(dbName)
    const collection = db.collection('users')

    // const insertUser = await collection.insertOne({name:"masiwal",worth:100000000})
    // console.log("inserted document : " , insertUser)

    // const insertUser = await collection.insertMany([{name:"masiwal",worth:100000000},{name:"harshit",phone:"999999999"}])
    // console.log("inserted document : " , insertUser)

    // const findUsers = await collection.find({}).toArray()
    // console.log("whole document : " , findUsers)

    // const deleteUser = await collection.deleteOne({name:"harshit"})
    // console.log("deletion sucessfull")


    const deleteUser = await collection.deleteMany({name:"harshit"})
    console.log("deletion sucessfull")


    const findUsers = collection.find({})
    // const ans = await findUsers.toArray()   //this is heavy operation as the data could be soo big 
    // console.log(findUsers)
    for await(const doc of findUsers){
        console.log(doc)
    }
    // console.log("whole document : " , findUsers)


    return "done"

}

main().then(console.log).catch(console.log).finally(()=>client.close())