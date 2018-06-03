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

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'public/views'))
app.use(express.static(path.join(__dirname, 'public/views')))

app.get('/', (req, res) => res.render('login'))
app.post('/login', (req, res) => {
  const { id, pw } = req.body
  connection.query(`SELECT * FROM users where id='${id}' and pw='${pw}'`, function (error, results, fields) {
    if (error) throw error
    if (results.length === 0) {
      return res.json({
        status: false
      })
    } else {
      const { name, level, count } = results[0]
      return res.json({
        name,
        level,
        count
      })
    }
  })
})

app.listen(3000, () => console.log('example app listening on port 3000!'))
