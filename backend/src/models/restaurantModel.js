import mongoose, { Schema } from "mongoose";

const restaurantSchema = new Schema({
  name: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
});

const restaurantModel = new mongoose.model("Restaurant", restaurantSchema);

restaurantModel.collection.createIndex({ location: "2dsphere" });

export default restaurantModel;
