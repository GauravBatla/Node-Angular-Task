import { NextFunction } from 'express';
import * as Joi from 'joi';
import { validate } from '../../helpers/ValidateHelper';
import { ReqInterface, ResInterface } from '../../interfaces/ReqInterface';

class AuthValidator {
    async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    };

    async addProduct(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            price: Joi.number().required(),
            discount: Joi.number().required(),
            categoryId: Joi.string().required(),
            size: Joi.number().required(),
            vendorId: Joi.string().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }
}

export default new AuthValidator();