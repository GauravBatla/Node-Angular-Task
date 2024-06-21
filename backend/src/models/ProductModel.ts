import mongoose, { Schema, model,AggregatePaginateModel } from 'mongoose';
import { productInterface } from '../interfaces/ProductInterface';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const productSchema = new Schema({
    name: {
        type: String,
        default:null,
    },
    price: {
        type: Number,
        default:0,
    },
    isDeleted:{
        type: Boolean,
        default:false,
    },
    discount:{
        type:Number,
        default:0
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    size:{
        type:Number,
        default:0
    },
    vendorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor'
    }

}, { timestamps: true });
productSchema.plugin(aggregatePaginate);
const ProductModel = model<productInterface,AggregatePaginateModel<productInterface>>('Product', productSchema);
export default ProductModel;