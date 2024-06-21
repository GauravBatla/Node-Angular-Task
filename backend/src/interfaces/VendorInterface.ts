import { Document } from 'mongoose';

/**
 * Interface that represent User
 * @interface
 */
export interface vendorInterface extends Document {
    name: string;
    isActive:Boolean;
    isDeleted:Boolean;
}