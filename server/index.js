const PORT = 8000
const express = require('express')
const {MongoClient} = require('mongodb')
const {v4: uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')

const uri = 'mongodb+srv://ptisma2002:aiuc345nAIN6ASc@cluster0.egj2ofm.mongodb.net/?retryWrites=true&w=majority'

const app = express()
app.use(cors())
app.use(express.json())

// Default
app.get('/', (req, res) => {
    res.json('Hello to my app')
})

app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    console.log(req.body)
    const {email, password} = req.body

    const generateduserId = uuidv4()
    const hashedpassword = bcrypt.hashSync(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({email})

        if (existingUser) {
            return res.status(409).json('User already exists')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generateduserId,
            email: sanitizedEmail,
            hashed_password: hashedpassword
        }

        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24
        })
        res.status(201).json({token, userId: generateduserId, email:sanitizedEmail})

    } catch (err) {
        console.log(err)
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
