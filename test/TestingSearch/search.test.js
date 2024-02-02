import { expect } from 'chai';
import 'dotenv/config'
import mongoose from 'mongoose';
import Product from '../../models/product.js'
import Variant from '../../models/productVariant.js';

describe('Search Functionality', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGO_URI)
    });

    beforeEach(async () => {
        await Product.deleteMany({});
        await Variant.deleteMany({});
    });

    it('should search products by name', async () => {
        const variantData = {
            name: 'Color',
            sku: 'ABC123',
            additionalCost: 0,
            stockCount: 50,
        };

        const productData = {
            name: 'Test Product',
            description: 'This is a test product',
            price: 19.99,
        };

        await Product.create(productData);

        const searchTerm = 'Test';

        const searchResults = await Product.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
            ],
        });

        expect(searchResults).to.have.lengthOf.at.least(1);
        expect(searchResults[0].name).to.include(searchTerm);
    });

    it('should search products by variant name', async () => {
        const variantData = {
            name: 'Color',
            sku: 'ABC123',
            additionalCost: 0,
            stockCount: 50,
        };

        const savedVariant = await Variant.create(variantData);
        console.log(savedVariant._id);
        const productData = {
            name: 'Test Product',
            description: 'This is a test product',
            price: 19.99,
            variants: [savedVariant._id],
        };

        const p = await Product.create(productData);
        //  console.log(p);
        const searchTerm = 'Color';

        const searchResults = await Product.find({
            'variants.name': { $regex: searchTerm, $options: 'i' },
        }).populate('variants')

        console.log(searchResults);
        // expect(searchResults).to.have.lengthOf.at.least(1);
        //expect(searchResults[0].variants[0].name).to.include(searchTerm);
    });

    // Add more tests for searching by description, multiple search terms, etc.
});
