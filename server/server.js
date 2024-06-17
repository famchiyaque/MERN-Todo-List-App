import express from 'express'
import { getTasks, addTask, 
    deleteTask, getWrappers, 
    getJournals, addJournal,
    createList, removeList } from './database.js'
const app = express()

app.use(express.json())
//app.use(express.urlencoded({ extended: true}))

app.get("/home", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.get("/getWrappers", async (req, res) => {
    const response = await getWrappers()
    const formattedResponse = response.map(wrapper => ({
        ...wrapper
    }))
    res.json(formattedResponse)
})

app.get("/todos", async (req, res) => {
    const response = await getTasks()
    const formattedResponse = response.map(task => ({
        ...task,
        isEditing: !!task.isEditing // Convert 0 to false, 1 to true
    }))
    res.json(formattedResponse)
})

app.get("/getJournals", async (req, res) => {
    const response = await getJournals()
    const formattedResponse = response.map(log => ({
        ...log
    }))
    res.json(formattedResponse)
})

app.post("/createList", async (req, res) => {
    try {
        const { listName, listType } = req.body
        await createList(listName, listType)
        const response = await getWrappers()
        const formattedResponse = response.map(wrapper => ({
            ...wrapper
        }))
        res.json(formattedResponse)
    } catch(e) {
        console.error(e)
        res.status(400).json({ message: "Error creating list" })
    }
})

app.post("/removeList", async (req, res) => {
    try {
        const { id } = req.body
        await removeList(id)
        const response = await getWrappers()
        const formattedResponse = response.map(wrapper => ({
            ...wrapper
        }))
        res.json(formattedResponse)
        
    } catch(e) {
        console.error(e)
        res.status(400).json({ message: "Error removing list" })
    }
})

app.post("/addTodo", async (req, res) => {
    try {
        const { todo, forDate, id } = req.body
        await addTask(todo, forDate, id)
        const response = await getTasks()
        const formattedResponse = response.map(task => ({
            ...task,
            isEditing: !!task.isEditing
        }))
        res.json(formattedResponse)
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: "error server side" })
    }
})

app.post("/deleteTodo", async (req, res) => {
    try {
        const taskId = req.body.id
        await deleteTask(taskId)
        const response = await getTasks()
        const formattedResponse = response.map(task => ({
            ...task,
            isEditing: !!task.isEditing
        }))
        res.json(formattedResponse)
    } catch(error) {
        console.error(error)
        res.status(400).json("Error 'deleting task'")
    }
})

app.post("/addJournal", async (req, res) => {
    try {
        const { title, content } = req.body
        await addJournal(title, content)
        // const response = await getJournals()
        // res.json(response)
    } catch(error) {
        console.error(error)
        res.status(400).json("Error getting journals")
    }
})
 
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke.')
})

app.listen(5000, () => {
    console.log("Server started on port 5000")
})