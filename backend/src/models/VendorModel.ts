
import { AggregatePaginateModel, Schema, model } from 'mongoose';
import { vendorInterface } from '../interfaces/VendorInterface';

const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


const vendorSchema = new Schema({
    name: {
        type: String,
        default:null,
    },
    isActive: {
        type: Boolean,
        default:true,
    },
    isDeleted:{
        type: Boolean,
        default:false,
    }    
}, { timestamps: true });
vendorSchema.plugin(aggregatePaginate);
const VendorModel = model<vendorInterface,AggregatePaginateModel<vendorInterface>>('vendor', vendorSchema);
export default VendorModel;