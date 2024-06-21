import { NextFunction } from "express";
import { productInterface } from "../../interfaces/ProductInterface";
import ProductModel from "../../models/ProductModel";
import CategoryModel from "../../models/CategoriesModel";
import VendorModel from "../../models/VendorModel";

class ProductService {

    /**
     * Add Product
     * @param data :any
     * @param next 
     * @returns 
     */

    public async addProducts(data: any, next: NextFunction) {
        try {
            // Check if the product name already exists
            const existingProduct = await ProductModel.find({ name: data.name });

            if (existingProduct.length > 0) {
                return { error: true, message: 'Product name already exists', data: {} };
            }

            // Create new product
            const newProduct = new ProductModel(data);
            await newProduct.save();

            // Populate vendor and category details
            const populatedProduct = await ProductModel.findById(newProduct._id)
                .populate('vendorId', 'name')
                .populate('categoryId', 'name');

            return { error: false, message: 'Product created successfully', data: populatedProduct };
        } catch (err) {
            next(err);
        }
    }



    /**
     * List Product
     * @param next 
     * @returns 
     */

    public async productList(options:any,next: NextFunction) {
        try {
            const myAggregate =  ProductModel.aggregate([
                { $match: { isDeleted: false } },
                {
                    $lookup: {
                        from: 'vendors',
                        localField: 'vendorId',
                        foreignField: '_id',
                        as: 'vendor'
                    }
                },
                {
                    $unwind: {
                        path: '$vendor'
                    }
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'categoryId',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                {
                    $unwind: {
                        path: '$category'
                    }
                },
                {
                    $project: {
                        name: 1,
                        price: 1,
                        discount: 1,
                        size: 1,
                        venderName: '$vendor.name',
                        categoryName: '$category.name',
                        vendorId: '$vendor._id',
                        categoryId: '$category._id',
                    }
                }
            ]);
            const products = await ProductModel.aggregatePaginate(myAggregate,options);
            /******************List Product*************/
            return { error: false, message: 'Product List', data: products }

        } catch (err) {
            next(err);
        }
    }


    public async updateProduct(id: string, data: any, next: NextFunction) {
        try {
            // Check if the product exists
            const existingProduct = await ProductModel.findById(id);
            if (!existingProduct) {
                return { error: true, message: 'Product not found', data: {} };
            }
            // Check if the updated product name already exists
            const duplicateProduct = await ProductModel.findOne({ name: data.name, _id: { $ne: id } });
            if (duplicateProduct) {
                return { error: true, message: 'Product name already exists', data: {} };
            }
            // Perform the update
            const updatedProduct = await ProductModel.findByIdAndUpdate(
                id,
                data,
                { new: true }
            ).populate('vendorId', 'name')
                .populate('categoryId', 'name');

            return { error: false, message: 'Product updated successfully', data: updatedProduct };
        } catch (err) {
            next(err);
        }
    }

    /**
        *  Product Detail
        * @param productId:ObjectId
        * @param next 
        * @returns 
        */

    public async productDetail(productId: any, next: NextFunction) {
        try {

            let product: productInterface[] = await ProductModel.find({ _id: productId });
            if (!product) {
                return { error: true, message: 'Product did not exist', data: {} }
            }

            /******************Detail Product*************/

            return { error: false, message: 'Product Detail', data: product }

        } catch (err) {
            next(err);
        }
    }

    /**
        *  Product Delete
        * @param productId:ObjectId
        * @param next 
        * @returns 
        */

    public async productDelete(productId: any, next: NextFunction) {
        try {

            let product = await ProductModel.findOne({ _id: productId });
            if (!product) {
                return { error: true, message: 'Product did not exist', data: {} }
            }

            product.deleteOne();

            /******************Delete Product*************/

            return { error: false, message: 'Product Delete', data: product }

        } catch (err) {
            next(err);
        }
    }

    public async findCategory(next: NextFunction) {
        try {
            let categories = await CategoryModel.find();
            return { error: false, message: 'categories find', data: categories }
        } catch (err) {
            next(err);
        }
    }

    public async findVendor(next: NextFunction) {
        try {
            let categories = await VendorModel.find();
            return { error: false, message: 'categories find', data: categories }
        } catch (err) {
            next(err);
        }
    }
}

export default new ProductService;