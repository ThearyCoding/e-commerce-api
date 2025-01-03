const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { user, items } = req.body;
    if (!user || !items || !items.product || !items.quantity) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const newCart = new Cart(req.body);

    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: "Error creating cart", error });
  }
});

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error });
    }
});
router.get('/', async (req, res) => {
    const carts = await Cart.find();

    res.status(200).json(carts);
})

router.put('/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        const { items } = req.body;

        // Ensure items are provided
        if (!items) {
            return res.status(400).json({ message: 'Items are required to update the cart.' });
        }

        // Update the cart and return the new document
        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { 
                items, 
                updatedAt: Date.now() // Update the `updatedAt` field
            },
            { new: true } // Return the updated cart document
        );

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
});


router.delete('/:cartId', async (req,res) =>{
    try {
        const { cartId } = req.params;

        const deletedCart = await Cart.findByIdAndDelete(cartId);

        if (!deletedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart', error });
    }
});

module.exports = router;


// Create a Cart
// http://localhost:3000/api/cart
// {
//     "user": "userId",
//     "items": {
//         "product": "productId",
//         "quantity": 2
//     }
// }
// Get a Cart by User ID
// http://localhost:3000/api/cart/:userId
// Delete a Cart by cartId
// http://localhost:3000/api/cart/:cartId

// Update a Cart by cartId 
// http://localhost:3000/api/cart/:cartId
// {
//     "items": {
//         "product": "6769564ff8638cb8deedd549",
//         "quantity": 5
//     }
// }
