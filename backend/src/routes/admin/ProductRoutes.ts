import { Router } from "express";
import AuthenticationMiddleware from "../../middlewares/AuthenticationMiddleware";
import AuthValidator from "../../validators/admin/AuthValidator";
import ProductController from "../../controllers/admin/ProductController";

class ProductRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoutes();
        this.getRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    };

    postRoutes() {
        this.router.post(
            '/add',
            AuthenticationMiddleware.admin,
            AuthValidator.addProduct,
            ProductController.createProduct
        );
    };

    getRoutes() {
        this.router.get(
            '/categories-list',
            AuthenticationMiddleware.admin,
            ProductController.getCategorires
        );
        this.router.get(
            '/vendor-list',
            AuthenticationMiddleware.admin,
            ProductController.getVendors
        ); 
        this.router.get(
            '/list',
            AuthenticationMiddleware.admin,
            ProductController.productList
        );
    };

    patchRoutes() {
        this.router.patch(
            '/update/:id',
            AuthenticationMiddleware.admin,
            ProductController.productUpdate
        );
    };

    deleteRoutes() {
        this.router.delete(
            '/delete/:id',
            AuthenticationMiddleware.admin,
            ProductController.productDelete
        );
    }
}

export default new ProductRoutes().router;