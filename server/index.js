const PORT = 8000
const express = require('express')
const {MongoClient} = require('mongodb')
const {v4: uuidv4} = require('uuid')

const uri = 'mongodb+srv://ptisma2002:asdf65asASDD9Uh@cluster0.egj2ofm.mongodb.net/?retryWrites=true&w=majority'

const app = express()

// Default
app.get('/', (req, res) => {
    res.json('Hello to my app')
})

app.post('/signup', (req, res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body

    const generateduserId = uuidv4()
    const hashedpassword = bcrypt.hashSync(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = users.findOne({email})

        if (existingUser) {
            return res.status(409).json('User already exists')
        }

        const email.toLowerCase() = email.toLowerCase()
    }
})

// Sign up to the Database
app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)


    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')


        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    } finally {
        await client.close()
    }
})
app.listen(PORT, () => console.log('server running on PORT ' + PORT))
