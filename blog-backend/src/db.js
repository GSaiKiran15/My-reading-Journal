import { MongoClient } from "mongodb"

let db;

const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);

async function connectToDb(cb) {
    const client = new MongoClient(`mongodb+srv://ganeshsaikiran7:Saikiran%4015@cluster0.c21cv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    await client.connect()
    db = client.db('react-blog-db')
    cb()
}

export {db, connectToDb}