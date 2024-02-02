import { expect } from 'chai';
import supertest from 'supertest';
import server from '../../index.js'
import Product from '../../models/product.js';
import Variant from '../../models/productVariant.js';

// Function to clear the database
async function clearDatabase() {
    try {
        await Product.deleteMany({});
        await Variant.deleteMany({});
    } catch (error) {
        throw new Error(`Failed to clear the database: ${error.message}`);
    }
}

// Test for Product Api
describe('Create Product API', () => {
    beforeEach(async function () {
        this.timeout(5000)
        console.log('Before Each - Start');
        await clearDatabase();
        console.log('Before Each - Database Cleared');
    })

    it('should create a new product with variants', async () => {
        const newProduct = {
            name: 'Test Product',
            description: 'This is a test product',
            price: 9.99,
            variants: [
                { name: 'Color', sku: 'ABC123', additionalCost: 0, stockCount: 50 },
                { name: 'Size', sku: 'DEF456', additionalCost: 5, stockCount: 30 },
            ],
        };
        const response = await supertest(server).post('/api/createProduct').send(newProduct);
        console.log(response.body)
        expect(response.status).to.equal(200);
        expect(response.body.savedProduct.name).to.equal(newProduct.name);
        expect(response.body.savedProduct.description).to.equal(newProduct.description);
        expect(response.body.savedProduct.price).to.equal(newProduct.price);
        expect(response.body.savedProduct.variants.length).to.equal(2);
    })
})