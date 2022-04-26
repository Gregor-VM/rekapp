import mongoose from 'mongoose';

if(process.env.NODE_ENV !== "test"){ // Allow not running this script in testing mode.
    mongoose.connect("mongodb://localhost/rekapp", (e) => {
        if(e) console.log(`Database error: ${e.name}, details: ${e.message}`);
        else console.log("Database connected!");
    });
}


