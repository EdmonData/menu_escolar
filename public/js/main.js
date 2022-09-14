$('form').submit(function(e){
    e.preventDefault();
});
const tokenGguardado = localStorage.getItem('token');

const logout = () => {
    window.location.href = '/login';
}

const registrar = async () => {
    const email = $('#email').val()
    const nombre = $('#nombre').val()
    const password = $('#password').val()

    const data = { nombre, email, password }

    try {
        await axios.post('/registro', data)
        alert('Usuario creado')

        window.location.href = '/login'
    }
    catch ({ response }) {
        const { data } = response
        const { error } = data
        alert(error)
    }
};


const verificar = async () => {
  
    const emailLogin = $('#emailLogin').val()
    const passwordLogin = $('#passwordLogin').val()
    const payload = { emailLogin, passwordLogin }
    try {
        const { data: token } = await axios.post('/login', payload)
        alert('Usuario verificado y autenticado')
        localStorage.setItem('token', token);
        window.location.href = '/?token=' + token;
        }
    catch ({ response }) {
        const { data } = response
        const { error } = data
        alert(error)
    }
}

const nuevoPedido = async (id) => {
    alert(`Pedido creado ${tokenGguardado}`);
    const data = { id };
    try {
         await axios.get('/pedido', data)
        alert('Pedido creado')
        window.location.href = '/pedido/?token=' + tokenGguardado;
    }
    catch ({ response }) {
        const { data } = response
        const { error } = data
        alert(error)
    }
} ;


const saludar = () => {
    alert('hola');
};
