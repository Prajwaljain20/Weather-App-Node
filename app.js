const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const viewPath = path.join(__dirname,'./templates/views')
const partialsPath = path.join(__dirname,'./templates/partials')
app.use(express.static(path.join(__dirname,'./public')))
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.get('', (req, res) => {
    res.render('index')
})
app.get('*', (req, res) => {
    res.status(404).send('Page Not Found')
})
app.listen(3000)