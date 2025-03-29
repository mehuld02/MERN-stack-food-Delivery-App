const mongoose = require('mongoose');

const mongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(
            '#',
        );
        console.log('Connected to MongoDB');

        // Fetch collections
        const fetched_data = await mongoose.connection.db.collection('food_items');
        const foodCategoryCollection = await mongoose.connection.db.collection('foodCategory');

        // Fetch data
        const data = await fetched_data.find({}).toArray();
        const catData = await foodCategoryCollection.find({}, { projection: { _id: 1, CategoryName: 1 } }).toArray();

        // Check for empty data
        if (!data.length || !catData.length) {
            console.error('No data found in one or more collections.');
            return;
        }

        // Assign data to global variables
        global.food_items = data;
        global.foodCategory = catData;

        // Log fetched data for verification
        console.log('Global food items:', global.food_items);
        console.log('Global food categories:', global.foodCategory);
    } catch (err) {
        console.error('Error connecting to MongoDB or fetching data:', err.message);
        process.exit(1); // Exit process on error
    }
};

module.exports = mongoDB;
