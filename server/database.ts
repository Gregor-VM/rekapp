import mongoose from 'mongoose';
import config from './config';

if(process.env.NODE_ENV !== "test"){ // Allow not running this script in testing mode.

    if(process.env.NODE_ENV === "production"){
        mongoose.connect(config.MONGO_URL, (e) => {
        if(e) console.log(`Database error: ${e.name}, details: ${e.message}`);
        else console.log("Database connected!");
        });
    } else {
        mongoose.connect("mongodb://localhost/rekapp", (e) => {
        if(e) console.log(`Database error: ${e.name}, details: ${e.message}`);
        else console.log("Database connected!");
        });
    }

}


