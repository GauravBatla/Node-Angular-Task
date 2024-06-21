import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
import ProductServices from "../../services/admin/ProductServices";
import ResponseHelper from "../../helpers/ResponseHelper";

class ProductController {

    /**
  * @api {post} /api/v1/admin/product/add Add Product
  * @apiVersion 1.0.0
  * @apiName Add Product
  * @apiGroup Product
  * @apiParamExample {json} Request-Example:
  * {
   "name":"Fridge",
   "price":123,
   "discount":10,
   "categoryId":"667497a22591b2c7719d2a36",
   "size":120,
   "vendorId":"667497a32591b2c7719d2a40"
   }
  * @apiSuccessExample {json} Success-Response:
   {"status":200,"statusText":"SUCCESS","message":"Product created successfully","data":{"_id":"667497cd2591b2c7719d2a53","name":"Fridge","price":123,"isDeleted":false,"discount":10,"categoryId":{"_id":"667497a22591b2c7719d2a36","name":"Electronics"},"size":120,"vendorId":{"_id":"667497a32591b2c7719d2a40","name":"ABC Electronics"},"createdAt":"2024-06-20T20:57:49.480Z","updatedAt":"2024-06-20T20:57:49.480Z","__v":0}}
  * @apiErrorExample {json} Error-Response Conflict
   {"status":400,"message":"Validation failed","data":{"error":["\"name\" is required","\"price\" is required","\"discount\" is required","\"categoryId\" is required","\"size\" is required","\"vendorId\" is required"]}}
  **/


    async createProduct(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const reqData = req.body;
            const { error, message, data } = await ProductServices.addProducts(reqData, next);
            if (error) {
                return ResponseHelper.badRequest(res, message, data);
            }

            return ResponseHelper.ok(res, message, data);
        } catch (err) {
            next(err);
        }
    };

    /**
   * @api {get} /api/v1/admin/product/list List Product
   * @apiVersion 1.0.0
   * @apiName List Product
   * @apiGroup Product
   * @apiSuccessExample {json} Success-Response:
    *{"status":200,"statusText":"SUCCESS","message":"Product List","data":[{"_id":"667497cd2591b2c7719d2a53","name":"Fridge","price":123,"discount":10,"size":120,"venderName":"XYZ Clothing Store","categoryName":"Electronics"}]}
   **/

    async productList(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try { 
            const options = {
                page: req.query?.page||1,
                limit: req.query?.limit||10,
                createdAt:-1
            }
            const { error, message, data } = await ProductServices.productList(options,next);
            if (error) {
                return ResponseHelper.badRequest(res, message, data);
            }

            return ResponseHelper.ok(res, message, data);
        } catch (err) {
            next(err);
        }
    }   
     /**
  * @api {patch} /api/v1/admin/product/update/id Upadte Product
  * @apiVersion 1.0.0
  * @apiName Upadte Product
  * @apiGroup Product
  * @apiParamExample {json} Request-Example:
  * {
   "name":"Fridge",
   "price":123,
   "discount":10,
   "categoryId":"667497a22591b2c7719d2a36",
   "size":120,
   "vendorId":"667497a32591b2c7719d2a40"
   }
  * @apiSuccessExample {json} Success-Response:
   {"status":200,"statusText":"SUCCESS","message":"Product updated successfully","data":{"_id":"667497cd2591b2c7719d2a53","name":"Fridge","price":123,"isDeleted":false,"discount":10,"categoryId":{"_id":"667497a22591b2c7719d2a36","name":"Electronics"},"size":120,"vendorId":{"_id":"667497a32591b2c7719d2a40","name":"ABC Electronics"},"createdAt":"2024-06-20T20:57:49.480Z","updatedAt":"2024-06-20T20:57:49.480Z","__v":0}}
  **/

    async productUpdate(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const productId = req.params.id;
            const productData = req.body;
            const { error, message, data } = await ProductServices.updateProduct(productId, productData, next);
            if (error) {
                return ResponseHelper.badRequest(res, message, data);
            };
            return ResponseHelper.ok(res, message, data);
        } catch (err) {
            next(err);
        }
    }

     /**
  * @api {delete} /api/v1/admin/product/delete/id Delete Product
  * @apiVersion 1.0.0
  * @apiName Delete Product
  * @apiGroup Product
 
  * @apiSuccessExample {json} Success-Response:
   {"status":200,"statusText":"SUCCESS","message":"Product delete","data":{}}
  **/

    async productDelete(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const productId = req.params.id
            const { error, message, data } = await ProductServices.productDelete(productId, next);
            if (error) {
                return ResponseHelper.badRequest(res, message, data);
            }
            return ResponseHelper.ok(res, message, data);
        } catch (err) {
            next(err);
        }
    }

    async getCategorires(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const { error, message, data } = await ProductServices.findCategory(next);
            if (error) {
                return ResponseHelper.badRequest(res, message, data);
            }
            return ResponseHelper.ok(res, message, data);
        } catch (err) {
            next(err);
        }
    };

    async getVendors(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const { error, message, data } = await ProductServices.findVendor(next);
            if (error) {
                return ResponseHelper.badRequest(res, message, data);
            }
            return ResponseHelper.ok(res, message, data);
        } catch (err) {
            next(err);
        }
    }
}

export default new ProductController();
