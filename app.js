const express = require('express'); 
const dotenv = require('dotenv'); 

const productRoutes = require('./routes/products'); // Import the module 
const requestLogger = require('./middleware/logger'); 

dotenv.config(); 

const app = express(); 
const port = process.env.PORT || 3001; 
 
app.use(express.json()); 
app.use(requestLogger); 
 
// Mount the routes 
// Any request to /api/products will be handled by productRoutes 
app.use('/api/products', productRoutes); 

// 4. Error Handling (Optional)
// Place this AFTER all routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => { 
    console.log(`${process.env.SERVICE_NAME} running on 
http://localhost:${port}`); 
}); 