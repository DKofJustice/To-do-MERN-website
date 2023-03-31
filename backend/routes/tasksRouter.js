const router = require('express').Router()
const Task = require('./../models/Task')

router.get('/', async (req, res) => {
    try {
        const getTask = await Task.find().sort({ title: -1 }).limit(50)
        res.json(getTask)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Sorry, we could not load the tasks'})
    }
})

router.post('/create', async (req, res) => {
    try {
        const { title, date, time } = await req.body

        const createTask = await new Task({ title, date, time })
        await createTask.save()
        res.status(201).json({createTask, message: 'Task created successfuly'})
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Sorry, we could not craete the task. Please try again...'})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id)
        res.status(201).json({deleteTask, message: 'Task deleted successfuly'})
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Sorry, we could not delete the task. Please try again...'})
    }
})

module.exports = router