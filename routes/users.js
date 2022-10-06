const router = require("express").Router();

const {
  getAllUsers,
  getAllOlderes,
  getOrdersByUser,
  newOrder,
  updateOrder,
  getOrdersByUserAndDate,
  getOrdersById,
} = require("../consultas");

const { schemaNewOrder, rectifyOrder, filtro } = require("../validaciones");

router.get("/home", async (req, res) => {
  const { data } = req.user;
  const { idusers, desde, hasta } = req.query;
  const orders = {};
  if (data.id === 1) {
    if (idusers !== undefined) {
      orders.orders = await getOrdersByUserAndDate(idusers, desde, hasta);
    } else {
      orders.orders = await getAllOlderes();
    }
    const users = await getAllUsers(data.id);
    res.render("Admin", { data: data, orders: orders.orders, users: users });
  } else {
    const orders = await getOrdersByUser(data.id);
    res.render("Home", { data: data, orders: orders });
  }
});

router.get("/newPedido", (req, res) => {
  const { data } = req.user;
  res.render("Pedido", { data: data });
});

router.post("/newPedido", async (req, res) => {
  const { data } = req.user;
  const { error } = schemaNewOrder.validate(req.body);
  if (error) {
   return  res.status(400).json({ error: error.details[0].message });
  }
  const { vegetariano, calorico, celiaco, autoctono, estandar, fecha } =
    req.body;
  const id = data.id;
  try {
    const pedido = await newOrder(
      id,
      vegetariano,
      calorico,
      celiaco,
      autoctono,
      estandar,
      fecha
    );
    res.status(201).send(pedido);
  } catch (e) {
    res.status(500).send({
      error: `Algo salio mal ${e}`,
      code: 500,
    });
  }
});

router.get("/rectificar", (req, res) => {
  const { data } = req.user;
  const {
    idorder,
    orderVegatariano,
    orderCalorico,
    orderCeliaco,
    orderAutoctono,
    orderEstandar,
  } = req.query;
  const allMenus = {
    idorder,
    orderVegatariano,
    orderCalorico,
    orderCeliaco,
    orderAutoctono,
    orderEstandar,
  };
  res.render("RectPedido", { data: data, allMenus: allMenus });
});

router.put("/rectificar", async (req, res) => {
  const payload = req.body;
  const { error } = rectifyOrder.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const pedido = await updateOrder(payload);
    res.status(201).send(pedido);
  } catch (e) {
    res.status(500).send({
      error: `Algo salio mal ${e}`,
      code: 500,
    });
  }
});

router.get("/detalle", async (req, res) => {
  const { idorder } = req.query;
  try{
    const order = await getOrdersById(idorder);
    res.send(order);
  }
  catch(e){
    res.status(500).send({
      error: `Algo salio mal ${e}`,
      code: 500,
    });
  }
});

router.get("/verDetalle", (req, res) => {
  const { data } = req.user;
  const { date, idorder, vegetarian, caloric, celiac, ethnic, standar, observations, vegetarian_real, caloric_real, celiac_real, ethnic_real, standar_real, idusers } = req.query;
  const totalOrder = parseInt(vegetarian) + parseInt(caloric) + parseInt(celiac) + parseInt(ethnic) + parseInt(standar);
  const totalOrderReal = parseInt(vegetarian_real) + parseInt(caloric_real) + parseInt(celiac_real) + parseInt(ethnic_real) + parseInt(standar_real);
  const loss = totalOrder - totalOrderReal;
  const order = {date, idorder, vegetarian, caloric, celiac, ethnic, standar, observations, vegetarian_real, caloric_real, celiac_real, ethnic_real, standar_real, idusers , loss};
  res.render("DetallePedido", { data: data, order: order });
}); 

router.post("/filtrar", async(req, res) => {
  const { idusers, desde, hasta } = req.body;
  const { error } = filtro.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }else{
    res.send({idusers, desde, hasta});
  }
});


module.exports = router;

