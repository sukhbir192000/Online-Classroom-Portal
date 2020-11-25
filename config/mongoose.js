const mongoose = require('mongoose');
mongoose.connect(process.env.PORT || 'mongodb+srv://test:misp123@cluster0.06l3e.mongodb.net/online_classroom_portal?retryWrites=true&w=majority', { useNewUrlParser: true })
        
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
db.once('open', function(){
    console.log('Connected to Database');
});
module.exports = db;