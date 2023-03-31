import express from 'express'
import mongoose from 'mongoose'

const app = express()


mongoose.connect(import.meta.env.VITE_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.get('/api/', (req, res) => {
    res.json({ message: 'Hello World' })
})

const API_ROUTES = import.meta.glob("/src/api/routes/**/*.(js|ts)", {
    eager: true
})

Object.keys(API_ROUTES).map((key) => {
    const path = key.replace('/src/api/routes/', '/api/').replace('.js', '').toLowerCase()
    app.use(path, API_ROUTES[key].default)
})


app.get('/api/*', (req, res) => {
    res.status(404).json({ message: 'Not Found' })
})

export const handler = app