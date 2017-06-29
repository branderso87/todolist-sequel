const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const models = require('./models')

app.use(express.static('public'))
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function (req, res) {
  models.Todo.findOne({
    where: {
      completed: false
      }
    }).then(function (todos) {
      res.render('todo', {
        todos: todos
      })
    })
})

app.get('/complete', function (req, res) {
  models.Todo.findOne({
    where: {
      completed: true
    }
  }).then(function (complete) {
    res.render('todo', {
      complete: complete
    })
  })
})

// app.post('/', function (req, res) {
//   const newTodo = models.Todo.build({
//     task: req.body.task,
//     completed: false
//   }).then(function () {
//     newTodo.save()
//     res.redirect('/')
//   })
// })
//
// app.post('/complete', function (req, res) {
//   models.Todo.update({
//     completed: true,
//     where: {
//       task: req.body.tocomplete
//     }
//   }).then(function () {
//     res.redirect('/')
//   })
// })
//
// app.post('/delete', function (req, res) {
//   models.Todo.destroy({
//     where: {
//       completed: true
//     }
//   }).then(function (){
//     res.redirect('/')
//   })
// })



app.listen(3000, function () {
  console.log('ok cool, listening!')
})
