import mongoose from 'mongoose';
import config from './config';

if(process.env.NODE_ENV !== "test"){ // Allow not running this script in testing mode.

    if(process.env.NODE_ENV === "production"){
        console.log("Running production enviroment");
        console.log(config.MONGO_URL);
        mongoose.connect(config.MONGO_URL, (e) => {
        if(e) console.log(`Database error: ${e.name}, details: ${e.message}`);
        else console.log("Database connected!");
        });
    } else {
        console.log("Running in dev enviroment");

        mongoose.connect("mongodb://localhost/rekapp", (e) => {
        if(e) console.log(`Database error: ${e.name}, details: ${e.message}`);
        else console.log("Database connected!");
        });
    }

}


