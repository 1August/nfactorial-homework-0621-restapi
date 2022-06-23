const { Router } = require('express')
const router = Router()
const Todo = require('../models/Todo')

// /api/todo
router.get(
    '/todo',[],
    async (req, res) => {
        try {
            const todos = await Todo.find()
            res.status(200).json(todos)
        } catch (e) {
            console.log(e)
        }
    }
)

// /api/todo
router.post(
    '/todo',[],
    async (req, res) => {
        try {
            const {title, deadline} = req.body
            console.log(deadline)

            if (!title) return res.status(400).json({message: 'Empty title.'})
            const todoItem = await Todo.findOne({title})
            if (todoItem) return res.status(400).json({message: 'Todo with this title already exists.'})

            const newTodoItem = new Todo(deadline ? {title, deadline} : {title})
            await newTodoItem.save()

            res.status(200).json(newTodoItem)
        } catch (e) {
            console.log(e)
        }
    }
)

// /api/todo
router.put(
    '/todo',[],
    async (req, res) => {
        try {
            const { id, title } = req.body

            const result = await Todo.updateOne({id}, {title})
            res.status(200).json(result)
        } catch (e) {
            console.log(e)
        }
    }
)

// /api/todo
router.delete(
    '/todo',[],
    async (req, res) => {
        try {
            const id = req.query.id

            const result = await Todo.findByIdAndDelete(id)
            res.status(200).json(result)
        } catch (e) {
            console.log(e)
        }
    }
)

module.exports = router