// DEPENDENCIES
const stage = require('express').Router()
const db = require('../models')
const { Stage } = db 
const { Op } = require('sequelize')

//FIND ALL Stages
stage.get('/', async (req, res) => {
    try {
        const stageStages = await Stage.findAll()
        res.status(200).json(stageStages)
    } catch (error) {
     // res.status(500).json(error) : this is a security hazard because a user can get a lot of info from an error
     res.status(500).send('Server error')
     console.log(err)
    }
})

//FIND A SPECIFIC stage
stage.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).send('Server error')
        console.log(err)
    }
})

//CREATE A stage
stage.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'New stage created',
            data: newStage

        })
    } catch (err) {
        res.status(500).send('Server error')
        console.log(err)
    }
})

//UPDATE stage
stage.put('/:id', async (req, res) => {
    try {
        const  updatedStages = Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Updated ${updatedStages} stage(s)`
        })
    } catch (err) {
        res.status(500).send('Server error')
        console.log(err)
    }
})

// DELETE stage
stage.delete('/:id', async (req, res) => {
    try {
        const  deletedStages = Stage.destroy({
                where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `deleted ${deletedStages} stage(s)`
        })
    } catch (err) {
        res.status(500).send('Server error')
        console.log(err)
    }
})

// EXPORT
module.exports = stage