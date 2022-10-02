const router = require("express").Router();
const jwt = require("jsonwebtoken");

const {
  getUser,
  newUser,
} = require("../consultas");

router.get("/", (_req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { emailLogin, passwordLogin } = req.body;
  const user = await getUser(emailLogin, passwordLogin);
  if (user) {
    const data = { id: user.id, email: user.email, nombre: user.name };
    const token = jwt.sign({ data }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.send(token);
  } else {
    res.status(401).send({
      error: "Usuario no encontrado !!!",
      code: 401,
    });
  }
});

router.get("/registro", (req, res) => {
  res.render("Registro");
});

router.post("/registro", async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const usuario = await newUser(nombre, email, password);
    res.status(201).send(usuario);
  } catch (e) {
    res.status(500).send({
      error: `Algo salio mal ${e}`,
      code: 500,
    });
  }
});

router.get("/detalle", (req, res) => {
  res.render("DetallePedido");
});

module.exports = router;
