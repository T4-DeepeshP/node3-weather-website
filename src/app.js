const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getWeather = require('./utils/weather');

const app = express()
const port= process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Deepesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Deepesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Deepesh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    getWeather(req.query.address, (error, response) => {
        if (error) {
            res.send({
                error
            });
        }
        else {
            res.send(response);
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deepesh',
        errorMessage: 'Help article not found.'
    })
})




app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deepesh',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})