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
  models.Todo.findAll({where: { completed: false }})
  .then(function (incompleteTodos) {
    models.Todo.findAll({where: { completed: true }})
      .then(function (completeTodos) {
        res.render('todo', {
          incompleteTodos: incompleteTodos,
          completeTodos: completeTodos
        })
      })
  })
})


app.post('/', function (req, res) {
  const newTodo = models.Todo.build({
    task: req.body.task,
    completed: false
  })
    newTodo.save().then(function () {
      res.redirect('/')
    })

})

app.post('/complete', function (req, res) {
  models.Todo.findOne({where: {task: req.body.tocomplete}
  }).then(function (todo) { // findone gives us the thing
    todo.completed = true // todo sets the attribute
    todo.save().then(function () { // and the save executes
      res.redirect('/')
    })
  })
})

app.post('/delete', function (req, res) {
  models.Todo.destroy({
    where: {
      completed: true
    }
  }).then(function (){
    res.redirect('/')
  })
})



app.listen(3000, function () {
  console.log('ok cool, listening!')
})
