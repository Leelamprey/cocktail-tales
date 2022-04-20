const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();

const JWT_SECRET = "secret";

function generatejwt(userId) {
  return jwt.sign({ userId: userId }, JWT_SECRET);
}

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ err: "invalid username or password" });
  }
  const user = await prisma.user.create({ data: { email, password } });
  return res.status(201).json({ user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ err: "invalid username or password" });
  }
  const user = await prisma.user.findFirst({ where: { email, password } });
  if (user) {
    const token = generatejwt(user.id);
    return res.status(200).json({ token });
  }
  return res.status(400).json({ err: "invalid credentials" });
});

router.get("/all", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  const { userId } = jwt.decode(token);

  const all = await prisma.favouriteCocktail.findMany({
    where: {
      userId: userId,
    },
  });

  return res.status(200).json(all);
});

router.post("/favourites", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  const { userId } = jwt.decode(token);
  const reqBody = req.body;
  const cocktailId = parseInt(reqBody.cocktailId);
  if (!cocktailId) {
    return res.status(400).json({ err: "Missing cocktail id ..." });
  }

  const isFavourited = await prisma.favouriteCocktail.findFirst({
    where: {
      cocktailId: cocktailId,
      userId: userId,
    },
  });

  if (isFavourited) {
    await prisma.favouriteCocktail.delete({
      where: {
        id: isFavourited.id,
      },
    });
    return res.status(200).json({});
  }

  const favouriteCocktail = await prisma.favouriteCocktail.create({
    data: {
      userId: userId,
      cocktailId: cocktailId,
    },
  });

  return res.status(201).json(favouriteCocktail);
});

router.get("/cocktailId/:id", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  const { userId } = jwt.decode(token);
  const cocktailId = parseInt(req.params.id);

  const isExists = await prisma.favouriteCocktail.findFirst({
    where: {
      userId: userId,
      cocktailId: cocktailId,
    },
  });
  return res
    .status(200)
    .json({ isFavourited: isExists !== null ? true : false });

  // here we just returned instead of using res.json()!!
  // if (isExists) {
  //   return { isFavourited: true };
  // }
  // return { isFavourited: false };
});

module.exports = router;
