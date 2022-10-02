const router = require("express").Router();

const {
  getAllUsers,
  getAllOlderes,
  getOrdersByUser,
  newOrder,
  updateOrder,
  getOrdersByUserAndDate,
} = require("../consultas");

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
    console.log("entro aca 3");
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

module.exports = router;
