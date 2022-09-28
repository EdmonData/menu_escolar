$('form').submit(function(e){
    e.preventDefault();
});
const tokenGguardado = localStorage.getItem('token');

const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
}

const registrar = async () => {
    const email = $('#email').val()
    const nombre = $('#nombre').val()
    const password = $('#password').val()

    const data = { nombre, email, password }

    try {
        await axios.post('/registro', data)
        alert('Usuario creado')

        window.location.href = '/'
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
        window.location.href = '/registro';
    }
}

const nuevoPedido = async () => {
    window.location.href = '/users/newPedido/?token=' + tokenGguardado;
}
 
const newOrder = async () => {
    const vegetariano = $('#vegetariano').val()
    const calorico = $('#calorico').val()
    const celiaco = $('#celiaco').val()
    const autoctono = $('#autoctono').val()
    const estandar = $('#estandar').val()
    const fecha = $('#fecha').val()
    const data = { vegetariano, calorico, celiaco, autoctono, estandar, fecha }
    try {
        await axios.post('/users/newPedido?token=' + tokenGguardado, data)
        alert('Pedido creado')
        window.location.href = '/users/home/?token=' + tokenGguardado;
    } catch ({ response }) {
        const { data } = response
        const { error } = data
        alert(error)
    }

};

const rectificar = async (id) => {
  const orderVegatariano = $("#menu1_" + id).text();
  const orderCalorico = $("#menu2_" + id).text();
  const orderCeliaco = $("#menu3_" + id).text();
  const orderAutoctono = $("#menu4_" + id).text();
  const orderEstandar = $("#menu5_" + id).text();
  
  window.location.href = "/users/rectificar?token=" + tokenGguardado+"&idorder="+id+"&orderVegatariano="+orderVegatariano+"&orderCalorico="+orderCalorico+"&orderCeliaco="+orderCeliaco+"&orderAutoctono="+orderAutoctono+"&orderEstandar="+orderEstandar;
    alert("Pedido rectificado");
};

