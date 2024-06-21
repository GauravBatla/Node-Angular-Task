import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
import AuthService from "../../services/admin/AuthService";

class AuthController {

  /**
   * @api {post} /api/v1/admin/auth/login login
   * @apiVersion 1.0.0
   * @apiName login
   * @apiGroup Auth
   * @apiParamExample {json} Request-Example:
   * {"email": "sumit@gmail.com","password": "AA100"}
   * @apiSuccessExample {json} Success-Response:
   *{"status":200,"statusText":"SUCCESS","message":"Login successfully","data":{"admin":{"_id":"66747f8009009144898d1cb4","email":"admin@admin.com","name":"Admin","otp":null,"otp_expiry":null,"createdAt":"2024-06-20T19:14:08.549Z","updatedAt":"2024-06-20T19:14:08.549Z","__v":0},"token":"eyJhbGciOiJIUzI1NiIsInR5c12CI6IkpXVCJ9.eyJpZCI6IjY2NzQ3ZjgwMDkwMDkxNDQ4OThkMWNiNCIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzE4OTE2MDQxLCJleHAiOjE3MTkwMDI0NDF9.mYEKlXtB1OluP8lTPw5hdA9ykJz9nhjHICqhKduwG98","execTime":184}}
   * @apiErrorExample {json} Error-Response Conflict
   *{"status":400,"message":"Validation failed","data":{"error":["\"email\" is required","\"password\" is required"]}}
   **/

  async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const data = await AuthService.login(email, password, res, next);

      if (data)
        return ResponseHelper.ok(res, res.__("login_successfully"), data);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
