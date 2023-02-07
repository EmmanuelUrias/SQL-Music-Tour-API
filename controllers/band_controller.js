// DEPENDENCIES
const band = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event, SetTime } = db 
const { Op } = require('sequelize')

// start by typing /api/band/...

//FIND ALL BANDS
band.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: {[Op.like]: `%${req.query.name || ''}%`}
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
     // res.status(500).json(error) : this is a security hazard because a user can get a lot of info from an error
     res.status(500).send('Server error')
     console.log(err)
    }
})

//FIND A SPECIFIC BAND
band.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
          //  attributes: ['band_id', 'name', 'genre'],
            include: [
                { 
                model: MeetGreet, 
                as: 'meet_greets',
                include: { 
                    model: Event, 
                    as: 'event',
                    where: { name: {[Op.like]: `%${req.query.name || ''}%`}
                    } 
                }
            }, 
            {
                model: SetTime,
                as: 'set_times',
                include: {
                    model: Event, 
                    as: 'event',
                    where: {
                        name: { [Op.like]: `%${req.query.event || ''}%` }
                    }
                }
            }
            ]
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).send('Server error')
        console.log(error)
    }
})

//CREATE A BAND
band.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'New band created',
            data: newBand

        })
    } catch (err) {
        res.status(500).send('Server error')
        console.log(err)
    }
})

//UPDATE BAND
band.put('/:id', async (req, res) => {
    try {
        const  updatedBands = Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Updated ${updatedBands} band(s)`
        })
    } catch (err) {
        res.status(500).send('Server error')
        console.log(err)
    }
})

// DELETE BAND
band.delete('/:id', async (req, res) => {
    try {
        const  deletedBands = Band.destroy({
                where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `deleted ${deletedBands} band(s)`
        })
    } catch (err) {
        res.status(500).send('Server error')
        console.log(err)
    }
})



// EXPORT
module.exports = band
