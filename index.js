const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const mysql      = require('mysql')
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'adopt'
})
// connection.connect()

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'pug')
// app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'public/views'))
app.use(express.static(path.join(__dirname, 'public/views')))

app.get('/', (req, res) => res.render('login'))
app.post('/login', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error
    console.log('The solution is: ', results[0].solution)
    console.log(req.body)
    res.json({
      hi: 'hello'
    })
  })
})

app.listen(3000, () => console.log('example app listening on port 3000!'))
