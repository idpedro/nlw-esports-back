import { Router } from "express";

const mainRouter = Router();

mainRouter.get("/", (_, response) => {
  response.json([
    {
      id: 1,
      name: "Anúncio 1",
    },
    {
      id: 2,
      name: "Anúncio 2",
    },
    {
      id: 3,
      name: "Anúncio 3",
    },
  ]);
});

export { mainRouter };
