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
    const orderCeliaco = $("#menu2_" + id).text();
    const orderEstandar = $("#menu3_" + id).text();
    const orderCalorico = $("#menu4_" + id).text();
    const orderAutoctono = $("#menu5_" + id).text();
    window.location.href = "/users/rectificar?token=" + tokenGguardado+"&idorder="+id+"&orderVegatariano="+orderVegatariano+"&orderCalorico="+orderCalorico+"&orderCeliaco="+orderCeliaco+"&orderAutoctono="+orderAutoctono+"&orderEstandar="+orderEstandar;
        alert("Pedido rectificado");
};

const rectificarOrder = async (id) => {
    const rectifVegetariano = $("#rectifVegetariano").val();
    const rectifCalorico = $("#rectifCalorico").val();
    const rectifCeliaco = $("#rectifCeliaco").val();
    const rectifAutoctono = $("#rectifAutoctono").val();
    const rectifEstandar = $("#rectifEstandar").val();
    const observaciones = $("#observaciones").val();
    const idorder = id;
    const payload = { idorder, rectifVegetariano, rectifCalorico, rectifCeliaco, rectifAutoctono, rectifEstandar, observaciones };
    try {
        await axios.put('/users/rectificar?token=' + tokenGguardado , payload)
        alert('Pedido rectificado')
        window.location.href = '/users/home/?token=' + tokenGguardado;
    }
    catch ({ response }) {
        const { data } = response
        const { error } = data
        alert(error)
    }
}

const filtrar = async () => {
    const desde = $('#desde').val()
    const hasta = $('#hasta').val()
    const idusers = $('#users').val()
    console.log(desde, hasta, idusers)
        window.location.href ='/users/home/?token=' + tokenGguardado + '&desde=' + desde + '&hasta=' + hasta + '&idusers=' + idusers
        alert('Filtrado aplicado')
};


const verDetalle = async (id) => {
    const idorder = id;
    try {
        const { data } =  await axios.get('/users/detalle?token=' + tokenGguardado + '&idorder=' + idorder)
        const pedido = data[0]
        const { date, school_id, vegetarian, caloric, celiac, ethnic, standar, observations, vegetarian_real, caloric_real, celiac_real, ethnic_real, standar_real } = pedido

        
        alert('Detalle pedido')
        window.location.href = '/users/verDetalle?token=' + tokenGguardado + '&idorder=' + idorder + '&date=' + date + '&vegetarian=' + vegetarian + '&caloric=' + caloric + '&celiac=' + celiac + '&ethnic=' + ethnic + '&standar=' + standar + '&observations=' + observations + '&vegetarian_real=' + vegetarian_real + '&caloric_real=' + caloric_real + '&celiac_real=' + celiac_real + '&ethnic_real=' + ethnic_real + '&standar_real=' + standar_real + '&idusers=' + school_id;
    }
    catch ({ response }) {
        const { data } = response
        const { error } = data
        alert(error)
    }
};

const home = (idusers) => {
    alert('Home')
    window.location.href = '/users/home/?token=' + tokenGguardado + '&idusers=' + idusers;
}