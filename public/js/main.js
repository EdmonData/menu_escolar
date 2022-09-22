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
        console.log(token);
        window.location.href = '/users/home/?token=' + token;
        }
    catch ({ response }) { 
        const { data } = response
        const { error } = data
        alert(error)
        window.location.href = 'users/registro';
    }
}

const nuevoPedido = async () => {
            window.location.href = '/pedido/?token=' + tokenGguardado;
}
const saludar = () => {
    alert('hola');
};
