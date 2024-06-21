import { Router } from "express";
import AuthenticationMiddleware from "../../middlewares/AuthenticationMiddleware";
import ChartController from "../../controllers/admin/ChartController";


class ChartRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
    };
  
    getRoutes() {
        this.router.get(
            '/monthly-revenue',
            AuthenticationMiddleware.admin,
            ChartController.getMonthlyRevenue
        );
        this.router.get(
            '/sales-by-category',
            AuthenticationMiddleware.admin,
            ChartController.getSalesByCategory
        );
        this.router.get(
            '/yearly-sales',
            AuthenticationMiddleware.admin,
            ChartController.getYearlySalesTrends
        );
    };
}

export default new ChartRoutes().router;