import { Router } from "express";
import multer from "multer";

import { isAuhenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// rotas de usuario
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuhenticated, new DetailUserController().handle);

//rotas de categoria
router.post("/category", isAuhenticated, new CreateCategoryController().handle);
router.get("/category", isAuhenticated, new ListCategoryController().handle);

//product
router.post(
  "/product",
  isAuhenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  "/category/product",
  isAuhenticated,
  new ListByCategoryController().handle
);

//order
router.post("/order", isAuhenticated, new CreateOrderController().handle);
router.delete("/order", isAuhenticated, new RemoveOrderController().handle);

router.post("/order/add", isAuhenticated, new AddItemController().handle);
router.delete(
  "/order/remove",
  isAuhenticated,
  new RemoveItemController().handle
);

router.put("/order/send", isAuhenticated, new SendOrderController().handle);
router.get("/orders", isAuhenticated, new ListOrdersController().handle);
router.get("/order/detail", isAuhenticated, new DetailOrderController().handle);
router.put("/order/finish", isAuhenticated, new FinishOrderController().handle);

export { router };
