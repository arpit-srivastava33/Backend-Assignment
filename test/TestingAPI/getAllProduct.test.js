import { expect } from 'chai';
import supertest from 'supertest';
import server from '../../index.js'
import Product from '../../models/product.js';
import Variant from '../../models/productVariant.js';

describe("Retreive all products", () => {
    beforeEach(async function () {
        this.timeout(5000)
        // Clear the database or perform any necessary setup
        await Product.deleteMany({});
        await Variant.deleteMany({});
    })
    it('should retreive all products', async function () {
        this.timeout(5000)
        const variant1 = await Variant.create({
            name: 'Color',
            sku: 'ABC123',
            additionalCost: 0,
            stockCount: 50,
        })

        const variant2 = await Variant.create({
            name: 'Size',
            sku: 'DEF456',
            additionalCost: 5,
            stockCount: 30,
        })

        const product1 = await Product.create({
            name: 'Product1',
            description: 'Description1',
            price: 19.99,
            variants: [variant1._id, variant2._id],
        })

        const product2 = await Product.create({
            name: 'Product2',
            description: 'Description2',
            price: 29.99,
            variants: [variant1._id],
        })

        const response = await supertest(server).get('/api/allProducts')
        console.log(response.body)
        expect(response.status).to.equal(200);
        expect(response.body.allProducts[0].variants.length).to.equal(product1.variants.length);
    })
})