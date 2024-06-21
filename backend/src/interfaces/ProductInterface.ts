import { Document, ObjectId } from 'mongoose';

/**
 * Interface that represent User
 * @interface
 */
export interface productInterface extends Document {
    name: string;
    price:number;
    isDeleted:boolean;
    discount:number;
    categoryId:ObjectId;
    size:number;
    vendorId:ObjectId;


}