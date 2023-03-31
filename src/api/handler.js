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
    const path = key.replace('/src/api/routes/', '/api/').replace('.js', '').replace('.ts', '').toLowerCase()
    app.use(path, API_ROUTES[key].default)
})



export const handler = app