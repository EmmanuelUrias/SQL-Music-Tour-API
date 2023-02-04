// DEPENDENCIES
const band = require('express').Router()
const db = require('../models')
const { Band } = db 

//FIND ALL BANDS
band.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll()
        res.status(200).json(foundBands)
    } catch (error) {
     // res.status(500).json(error) : this is a security hazard because a user can get a lot of info from an error
     res.status(500).send('Server error')
     console.log(err)
    }
})

//FIND A SPECIFIC BAND
band.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { band_id: req.params.id }
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).send('Server error')
        console.log(err)
    }
})



// EXPORT
module.exports = band
