import { Router } from "express";
import AuthController from "../../controllers/admin/AuthController";
import AuthValidator from "../../validators/admin/AuthValidator";


class AuthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoutes();
    };

    postRoutes() {
        this.router.post(
            '/login',
            AuthValidator.login,
            AuthController.login
        );
    };
}

    export default new AuthRoutes().router;