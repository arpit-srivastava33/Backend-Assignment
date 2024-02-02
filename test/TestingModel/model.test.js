import { expect } from 'chai';
import 'dotenv/config'
import mongoose from 'mongoose';
import Product from '../../models/product.js'
import Variant from '../../models/productVariant.js';


describe('Product Model', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGO_URI)
    });

    beforeEach(async () => {
        await Product.deleteMany({});
        await Variant.deleteMany({});
    });

    it('should save a product with variants', async () => {
        // Create a variant
        const variantData = {
            name: 'Color',
            sku: 'ABC123',
            additionalCost: 0,
            stockCount: 50,
        };

        const variant = await Variant.create(variantData);

        // Create a product with the variant reference
        const productData = {
            name: 'Test Product',
            description: 'This is a test product',
            price: 19.99,
            variants: [variant._id],
        };

        const product = await Product.create(productData);
        //  console.log(product);

        // Retrieve the saved product with populated variants
        const savedProduct = await Product.findOne({ name: 'Test Product' }).populate('variants');
        //  console.log(savedProduct);

        expect(savedProduct).to.exist;
        expect(savedProduct.name).to.equal(productData.name);
        expect(savedProduct.description).to.equal(productData.description);
        expect(savedProduct.price).to.equal(productData.price);
        expect(savedProduct.variants[0].name).to.equal(variantData.name);
    });

    // We can add more test cases as we want....
});
