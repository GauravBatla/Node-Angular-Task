import CategoryModel from '../models/CategoriesModel';
import VendorModel from '../models/VendorModel';

async function seedDatabase() {
    try {
       const categoryData =  await CategoryModel.find();
       const vendorData = await VendorModel.find();
        if (!categoryData.length) {
            const categoryNames = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'];
            const categories = [];
            for (let i = 0; i < categoryNames.length; i++) {
                categories.push({
                    name: categoryNames[i],
                });
            }
            await CategoryModel.create(categories);
        };
        if (!vendorData.length ) {
            const vendorNames = ['ABC Electronics', 'XYZ Clothing Store', 'Books & More', 'Green Thumb Garden', 'Sports World'];
    
            // Generate vendors
            const vendors = [];
            for (let i = 0; i < vendorNames.length; i++) {
                vendors.push({
                    name: vendorNames[i],
                });
            }
             await VendorModel.create(vendors);
        }

        console.log('Seed data inserted successfully:');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

const seedData = seedDatabase;
export default seedData;