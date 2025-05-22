import { Router } from "express";

const router = Router();

router.get("/cars", (req, res) => {
  res.send("Obteniendo autos");
});
export default router;
