import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from "cors"
import Event from './models/Event.js';
dotenv.config()
const app = express();
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB).then((res) => {
    console.log("db has been connected!")
}).catch((err) => {
    console.log("It's a Occurred Error", err)
})

app.post('/event', async (req, res) => {
    try {
        const newEvent = new Event({ ...req.body })
        await newEvent.save()
        res.status(200).json(req.body)
    } catch (err) {
        res.status(200).json("Something went wrong!")
    }
})

// get all events

app.get('/', async (req, res) => {
    try {
        const allEvents=await Event.find({})
      let filterEvent= req.query.search!=='' && allEvents.filter(filterEvents)
       function filterEvents(filter){
            return filter.cat.toLowerCase().includes(req.query.search.toLowerCase())
        }
        filterEvent?res.status(200).json(filterEvent):res.status(200).json(allEvents);
    } catch (err) {
        res.status(200).json("Something went wrong!")
    }
})

app.listen(PORT, () => {
    console.log(`server is running on port number ${PORT}`)
})