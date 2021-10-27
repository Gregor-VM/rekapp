import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/rekapp", () => {
    console.log("Database connected!");
});

mongoose.connection.on("error", (err) => console.error(err));

