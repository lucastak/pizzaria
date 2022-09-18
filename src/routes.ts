import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuhenticated } from "./middlewares/isAuthenticated";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";

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

export { router };
