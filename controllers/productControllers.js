import Product from '../models/product.js'
import Variant from '../models/productVariant.js'

const getAllProductController = async (req, res) => {
    // Retrieving all documents 
    const allProducts = await Product.find({});

    // if Products is empty
    if (!allProducts) {
        return res.status(401).json({ sucess: false, message: "Products have not been created yet!" })
    }

    return res.status(200).json({
        success: true,
        message: "All products have been fetched!",
        allProducts
    })
}


// Creating Product Controller....
const createProductController = async (req, res) => {

    try {
        // destructing req.body object  assumimh variants array is given along with product data
        const { name, description, price, variants } = req.body;

        // Validate that variants array is present
        if (!variants || !Array.isArray(variants) || variants.length === 0) {
            return res.status(400).json(
                {
                    success: false,
                    error: 'Variants array is required and should not be empty'
                }
            );
        }

        // Create or update variants
        const updatedVariants = await Promise.all(
            variants.map(async (variant) => {
                if (variant._id) {
                    // If variant has _id, update existing variant
                    return await Variant.findByIdAndUpdate(variant._id, variant, { new: true });
                } else {
                    // If variant doesn't have _id, create a new variant
                    const newVariant = new Variant(variant);
                    return await newVariant.save();
                }
            })
        )

        // Create or update the product with the updated variants
        const existingProduct = await Product.findOne({ name });

        if (existingProduct) {
            // If product exists, update it with the new variants
            existingProduct.variants = updatedVariants.map(variant => variant._id);
            const updatedProduct = await existingProduct.save();
            res.status(200).json({
                success: true,
                message: "Product's variant updated and saved successfully",
                updatedProduct
            });
        } else {
            // If product doesn't exist, create a new product with the new variants
            const newProduct = new Product({ name, description, price, variants: updatedVariants.map(variant => variant._id) });
            const savedProduct = await newProduct.save();
            res.status(200).json({
                success: true,
                message: "New Product get saved successfully!!",
                savedProduct
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });
    }
}


// Delete by ProductId controller.....
const deleteProductByIdController = async (req, res) => {
    try {
        // getting id from req.body
        const pId = req.params.productId
        // find and remove the product having id same as pId
        const deletedProduct = await Product.findByIdAndDelete(pId);

        // return response back to clientside
        res.status(200).json({
            success: true,
            message: `Product with id ${pId} get deleted`,
            deletedProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!!"
        })
    }
}

// Update Product By id controller......
const updateProductById = async (req, res) => {
    try {
        const pId = req.params.productId
        const changes = { price: 120000 }
        const beforeUpdateProduct = await Product.findByIdAndUpdate(pId, changes)
        res.status(200).json({
            success: true,
            message: "Product get updated and below is it's older form",
            beforeUpdateProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!!"
        })
    }
}

//Search Functionality....
const searchItems = async (req, res) => {
    try {
        const searchItem = req.query.q
        var regex = new RegExp(searchItem, 'i')
        const findItems = await Product.find({
            $or: [
                { name: regex },
                { description: regex },
                { 'variants.name': regex }
            ]
        }).populate('variants')
        res.status(200).json({
            success: true,
            message: 'Item(s) found!',
            noOfItem: findItems.length,
            findItems
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!',
            error: error.message
        })
    }
}

export {
    getAllProductController,
    createProductController,
    updateProductById,
    deleteProductByIdController,
    searchItems
}
