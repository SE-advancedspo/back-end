// index.js
const express = require('express')

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

const routes = require('./routes/routes')
app.use('/', routes)

// Export the Express API
module.exports = app