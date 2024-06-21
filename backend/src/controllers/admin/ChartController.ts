import { NextFunction } from "express";
import ChartService from "../../services/admin/ChartService";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";

class ChartController {

     /**
   * @api {get} /api/v1/admin/chart/sales-by-category SalesByCategory
   * @apiVersion 1.0.0
   * @apiName SalesByCategory
   * @apiGroup Chart
   * @apiSuccessExample {json} Success-Response:
    {"status":200,"statusText":"SUCCESS","message":"Sales by category fetched successfully","data":{"categories":["Electronics","Books","Clothing","Furniture","Toys"],"sales":[25000,15000,20000,10000,5000],"execTime":89}}
   **/

    async getSalesByCategory(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const { error, message, data } = await ChartService.getSalesByCategory();
            if (error) {
                return ResponseHelper.badRequest(res, message, data);
            }
            return ResponseHelper.ok(res, message, data);
        } catch (err) {
            next(err);
        }
    }

      /**
     * @api {get} /api/v1/admin/chart/monthly-revenue getMonthlyRevenue
     * @apiVersion 1.0.0
     * @apiName getMonthlyRevenue
     * @apiGroup Chart
     * @apiSuccessExample {json} Success-Response:
    {"status":200,"statusText":"SUCCESS","message":"Monthly revenue fetched successfully","data":{"months":["January","February","March","April","May","June","July","August","September","October","November","December"],"revenue":[12000,15000,18000,13000,17000,19000,22000,21000,24000,26000,23000,25000],"execTime":76}}
     **/

    async getMonthlyRevenue(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const { error, message, data } = await ChartService.getMonthlyRevenue(next);
            if (error) {
                return ResponseHelper.badRequest(res, message, data);
            }
            return ResponseHelper.ok(res, message, data);
        } catch (err) {
            next(err);
        }
    }

     /**
     * @api {get} /api/v1/admin/chart/yearly-sales getYearlySalesTrends
     * @apiVersion 1.0.0
     * @apiName getYearlySalesTrends
     * @apiGroup Chart
     * @apiSuccessExample {json} Success-Response:
    {"status":200,"statusText":"SUCCESS","message":"Yearly sales trends fetched successfully","data":{"years":["2019","2020","2021","2022","2023"],"sales":[150000,160000,170000,180000,200000],"execTime":100}}
     **/

    async getYearlySalesTrends(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const { error, message, data } = await ChartService.getYearlySalesTrends(next);
            if (error) {
                return ResponseHelper.badRequest(res, message, data);
            }
            return ResponseHelper.ok(res, message, data);
        } catch (err) {
            next(err);
        }
    }
}

export default new ChartController();