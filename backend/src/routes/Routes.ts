import { Router } from "express";
import AuthRoutes from "./admin/AuthRoutes";
import ChartRoutes from "./admin/ChartRoutes";
import ProductRoutes from "./admin/ProductRoutes";
class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.app();
    this.admin();
  }

  app() {
  }

  admin() {
    this.router.use('/admin/auth', AuthRoutes);
    this.router.use('/admin/chart', ChartRoutes);
    this.router.use('/admin/product', ProductRoutes);
  }

}
export default new Routes().router;