const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/orderData', async (req, res) => {
    try {
        console.log("Incoming Request Body:", req.body);

        if (!req.body.order_data || !Array.isArray(req.body.order_data)) {
            console.log("Invalid order_data format received!");
            return res.status(400).json({ error: "Invalid order data format" });
        }

        let data = req.body.order_data;
        data.splice(0, 0, { order_data: req.body.order_date });

        let eId = await Order.findOne({ email: req.body.email });

        if (!eId) {
            console.log("Creating new order for:", req.body.email);
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            console.log("Updating existing order for:", req.body.email);
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Server Error:", error); 
        res.status(500).json({ error: "Server Error", message: error.message });
    }
});



router.post('/myOrderData', async (req, res) => {  
    try {
        console.log("Fetching Orders for:", req.body.email);
        let eId = await Order.findOne({ email: req.body.email });
        if (!eId) {
            return res.status(404).json({ error: "No orders found" });
        }
        res.json({ orderData: eId.order_data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
