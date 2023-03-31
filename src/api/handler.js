import express from 'express'
import mongoose from 'mongoose'
import SchoolsRouter from './routes/schools'


// api config
const app = express()

// middleware
app.use(express.json())

// db config
mongoose.connect(import.meta.env.VITE_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// api routes
app.get('/api/', (req, res) => {
    res.json({ message: 'Hello World' })
})

app.use('/api/schools', SchoolsRouter)

app.get('/api/*', (req, res) => {
    res.status(404).json({ message: 'Not Found' })
})

// export
export const handler = app