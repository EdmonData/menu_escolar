const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const expressFileUpload = require('express-fileupload');
const bodyParse = require('body-parser');
const jwt = require('jsonwebtoken');
const secretKey = 'kjsajdljskdkljdaasdasd';
const handlebars = require('handlebars');
handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));





const { nuevoUsuario, getUsuario, getAllOlderes, getOrdersByUser, getAllUsers } = require('./consultas');

const port = 3001;

app.set('port', process.env.PORT || port);

app.listen(app.get('port'), () => {
    console.log('Server is running on port ' + app.get('port'));
});

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(express.static(__dirname + '/public'));

app.use('/bootstrap/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));

app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: "main",
        layoutsDir: `${__dirname}/views/layouts`,
        partialsDir: `${__dirname}/views/components`,
    })
    );
app.set('view engine', 'handlebars');

app.get('/', async (req, res) => {
    const { token } = req.query;
    if (token) {
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                res.render('Auth', { error: 'Token invalido' });
            } else {
                const { data } = decoded;
                const { id } = data;
                if (id === 1 ){
                const orders = await getAllOlderes();
                const users = await getAllUsers(id);
                res.render('Admin',{ data: data, orders: orders, users: users });
                } else {
                    const orders = await getOrdersByUser(id);
                    res.render('Home',{ data: data, orders: orders });
                }
            }
        });
    } else {
        res.render('login');
    }
});


app.get('/login', (req, res) => {
    res.render('Login');
});


app.post('/login', async (req, res) => {
    const { emailLogin, passwordLogin } = req.body;
    const user = await getUsuario(emailLogin, passwordLogin);
    if (user) {
             const data = { id: user.id, email: user.email, nombre: user.name };
            const token = jwt.sign({ data } , secretKey, { expiresIn: '1h' });
            res.send(token);
       } else {
            res.status(404).send({
                error: 'Usuario no encontrado',
                code: 404
            });
        }
    });


app.get('/registro', (req, res) => {
    res.render('Registro');
});

app.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const usuario = await nuevoUsuario( nombre, email, password );
        res.status(201).send(usuario);
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal ${e}`,
            code:500
        });
    }
});

app.get('/pedido', (req, res) => {
    res.render('Pedido');
}); 



app.get('*', (_req, res) => {
    res.status(404).send({
        error: 'Error 404 Area Restringida',
        code: 404
    });
});
