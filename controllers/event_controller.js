// DEPENDENCIES
const event = require('express').Router()
const db = require('../models')
const { Event } = db 
const { Op } = require('sequelize')

//FIND ALL Events
event.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll()
        res.status(200).json(foundEvents)
    } catch (error) {
     // res.status(500).json(error) : this is a security hazard because a user can get a lot of info from an error
     res.status(500).send('Server error')
     console.log(err)
    }
})

//FIND A SPECIFIC event
event.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundevent)
    } catch (error) {
        res.status(500).send('Server error')
        console.log(err)
    }
})

//CREATE A event
event.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'New event created',
            data: newEvent

        })
    } catch (err) {
        res.status(500).send('Server error')
        console.log(err)
    }
})

//UPDATE event
event.put('/:id', async (req, res) => {
    try {
        const  updatedEvents = Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Updated ${updatedEvents} event(s)`
        })
    } catch (err) {
        res.status(500).send('Server error')
        console.log(err)
    }
})

// DELETE event
event.delete('/:id', async (req, res) => {
    try {
        const  deletedEvents = Event.destroy({
                where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `deleted ${deletedEvents} event(s)`
        })
    } catch (err) {
        res.status(500).send('Server error')
        console.log(err)
    }
})

// EXPORT
module.exports = event

