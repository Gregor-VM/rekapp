import mongoose from 'mongoose';

if(process.env.NODE_ENV !== "test"){
    mongoose.connect("mongodb://localhost/rekapp", () => {
        console.log("Database connected!");
    });
}


