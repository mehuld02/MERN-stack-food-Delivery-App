const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        //console.log(global.food_items, global.foodCategory);

        // Return both food_items and foodCategory
        res.json({
            foodItems: global.food_items,
            foodCategory: global.foodCategory
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
