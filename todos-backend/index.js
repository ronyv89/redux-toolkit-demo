const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${__dirname}/todos.sqlite3`);
const app = express()


db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, status INT DEFAULT 0, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
});


app.use(express.json())
app.use(cors({ origin: '*' }))
app.get('/todos', (_req, res) => {
  const sql = 'SELECT * from todos'
  return db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err })
    }
    return res.json(rows)
  })
})

app.post('/todos', (req, res) => {
  const sql = 'INSERT INTO todos(title) VALUES(?)'

  return db.run(sql, [req.body.title], (err, result1) => {
    if (err) {
      return res.status(400).json({ error: err })
    }
    return res.json(this)
  })
})

app.get('/todos/:id', (req, res) => {
  const sql = 'SELECT * FROM todos WHERE id = ?'
  const {id} = req.params
  return db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err })
    }
    if (row)
      return res.json(row)
    return res.status(404).json({ error: 'not found' })
  })
})

app.patch('/todos/:id', (req, res) => {
  let sql = 'UPDATE todos SET '
  const updates = [];
  const sqlParams = [];
  ['title', 'status'].forEach(field => {
    if (req.body.hasOwnProperty(field)) {
      updates.push(`${field} = ?`)
      sqlParams.push(req.body[field])
    }
  })
  if (!updates.length)
    return res.status(400).json({ error: 'missing fields'})
  sql += updates.join(', ')
  sql += ' WHERE id = ?'
  sqlParams.push(req.params.id)
  return db.run(sql, sqlParams, (err) => {
    if (err) {
      return res.status(400).json(err)
    }
    return res.json({ status: 'success' })
  })
})

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params
  const sql = `DELETE FROM todos where id = ?`
  db.run(sql, [id], (err, result) => {
    return res.json({ status: "success" })
  }) 
})


const port = process.env.PORT || 4000;
const server = app.listen(port);

process.on('SIGINT', () => {
  console.log('server exiting')
  db.close();
  server.close();
});
