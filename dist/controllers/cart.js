import { Cart } from "../models/Cart.js";

// add to cart
export const addToCart = async (req, res) => {
  try {
    const {
      productId,
      title,
      price,
      qty
    } = req.body;
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is required",
        success: false
      });
    }
    if (!productId || !title || !price || !qty) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false
      });
    }
    const userId = req.user;
    let cart = await Cart.findOne({
      userId
    });
    if (!cart) {
      cart = new Cart({
        userId,
        items: []
      });
    }
    const itemIndex = cart.items.findIndex(item => item.productId == productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price += price * qty;
    } else {
      cart.items.push({
        productId,
        title,
        price,
        qty
      });
    }
    await cart.save();
    if (cart.items.length > 0) {
      return res.status(201).json({
        message: "Item added successfully.",
        success: true,
        data: cart
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      success: false,
      error: error.message
    });
  }
};

// get cart
export const userCart = async (req, res) => {
  try {
    const userId = req.user;
    let cart = await Cart.findOne({
      userId
    });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false
      });
    }
    if (cart) {
      return res.status(200).json({
        message: "Cart retrieved successfully",
        success: true,
        data: cart
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};

// remove product from cart
export const removeProductFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user;
    let cart = await Cart.findOne({
      userId
    });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false
      });
    }
    const checkProductIdExists = cart.items.some(item => item.productId.toString() === productId);
    if (!checkProductIdExists) {
      return res.status(404).json({
        message: "Product does not exists in user cart",
        success: false
      });
    }
    if (cart) {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      const deletedCart = await cart.save();
      res.status(200).json({
        message: "Product has been removed from cart",
        success: true,
        data: deletedCart
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};

// clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user;
    let cart = await Cart.findOne({
      userId
    });
    if (!cart) {
      cart = new Cart({
        items: []
      });
    } else {
      cart.items = [];
    }
    await cart.save();
    return res.status(200).json({
      message: "User Cart cleared successfully.",
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};

// decrease quantity from cart
export const decreaseProductQty = async (req, res) => {
  try {
    const {
      productId,
      qty
    } = req.body;
    const userId = req.user;
    let cart = await Cart.findOne({
      userId
    });
    if (!cart) {
      cart = new Cart({
        userId,
        items: []
      });
    }
    if (!req.body) {
      return res.status(404).json({
        message: "Request body is required.",
        success: false
      });
    }
    if (!productId || !qty) {
      return res.status(400).json({
        message: "Please fill all the fields.",
        success: false
      });
    }
    const itemIndex = cart.items.findIndex(item => item.productId == productId);
    if (itemIndex > -1) {
      const item = cart.items[itemIndex];
      if (item.qty > qty) {
        const pricePerUnit = item.price / item.qty;
        item.qty -= qty;
        item.price -= pricePerUnit * qty;
      } else {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.status(400).json({
        message: "Invalid product id",
        success: false
      });
    }
    await cart.save();
    return res.status(200).json({
      message: "Item qty decreased",
      success: true,
      data: cart
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};