const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const expressFileUpload = require('express-fileupload');
const bodyParse = require('body-parser');
const handlebars = require('handlebars');
const router = require('express').Router();
handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

require('dotenv').config();

const port = 3001;

app.set('port', process.env.PORT || port);


app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(express.static(__dirname + '/public'));

//app.use('/bootstrap/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
//app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
//app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));

app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: "main",
        layoutsDir: `${__dirname}/views/layouts`,
        partialsDir: `${__dirname}/views/components`,
    })
    );
app.set('view engine', 'handlebars');

const authRoutes = require('./routes/auth');
const validaterute = require('./routes/validate_toke');
const userRoutes = require('./routes/users');


app.use('/', authRoutes);
app.use('/users',validaterute , userRoutes); 


// 404 Page
app.get("*", (req, res) => {
    const error = {
        error: 'No existe la ruta'
    }
    res.status(404).render('Auth',  { error: error.error });
})

// server is listening
app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto ' + app.get('port'));
});
