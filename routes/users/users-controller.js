const User = require("./users-model");

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw "User not found";
    }
    return user;
  } catch (error) {
    throw error;
  }
};
const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
};
//put
const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    if (!updatedUser) {
      throw Error("User Not Found");
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
const deleteUser = async (userId) => {
  try {
    const userToDelete = await User.findByIdAndDelete(userId);
    if (!userToDelete) {
      throw Error("User to delete not found!");
    }
    return userToDelete;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
