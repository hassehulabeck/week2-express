const express = require('express')
const app = express()
const uuidv1 = require('uuid/v1');
let tasks = require('./tasks.json')

// Kunna hantera postningar från Postman
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/', (req, res) => {
    if (req.query.todo == "true") {
        // Visa enbart de som återstår att göra
        let todos = tasks.filter((task) => {
            return task.isDone === false
        })
        res.json(todos)
    } else {
        // Visa alla tasks
        res.json(tasks)
    }
    res.end()
})

app.post('/', (req, res) => {
    // Ingen säkerhetskontroll, bara in med uppgiften
    // Däremot "friserar" vi den.
    let newTask = {}
    newTask.id = uuidv1()
    newTask.task = req.body.task
    newTask.isDone = false
    tasks.push(newTask)
    res.json(tasks).end()
})

app.patch('/', (req, res) => {
    // Hämta ut en tasks index i arrayen utifrån medskickat id.
    let index = tasks.findIndex((task => task.id == req.body.id))
    tasks[index].isDone = true
    res.json(tasks[index]).end()
})

app.delete('/', (req, res) => {
    let undoneTasks = tasks.filter((task) => {
        return task.isDone == false
    })
    // Skriv över gamla tasks med nya
    tasks = undoneTasks
    res.json(tasks).end()
})

app.listen(3000, () => {
    console.log("Todolist snurrar.")
})