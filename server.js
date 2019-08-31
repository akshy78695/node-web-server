const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let log = `${req.method} ${req.url}`;
    fs.appendFile('server.log' , log + '\n' , (e) => {
        if(e){
            console.log('unable to append file');
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('toUpper',(Text) => {
    return Text.toUpperCase();
} );

app.use(express.static(__dirname + '/public'));

// app.use((req, res, next) => {
//     res.render('maintenace.hbs');
// });

app.get('/', (req,res) => {
    res.render('home.hbs', {
        title: 'home page',
        wellcomeMsg: 'wellcome to default route',
        footer: `copyright ${new Date().getFullYear()}`
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        wellcomeMsg: 'wellcome to about.hbs'
    });
});

app.get('/bad', (req, res) => {
    res.send('bad request 404.');
});

app.listen(3000, () => {
    'server port is up on 3000'
});