import restaurantModel from "../models/restaurantModel.js";

export const createRestaurant = async ({ name, location }) => {
  const response = await restaurantModel.create({ name, location });
  return response;
};
export const findNearest = async (location) => {
  const response = await restaurantModel.findOne({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: location },
        $maxDistance: 1000,
      },
    },
  });
  return response;
};
