// src/actions/userActions.js

import initiateDB from "../db/initDB";

const { addUser: addDBUser, getUsers: fetchDBUsers, editUser: modifyDBUser, deleteUser: removeDBUser } = initiateDB();

export const getUsers = () => async (dispatch) => {
  try {
    const users = await fetchDBUsers();
    dispatch({
      type: "LIST_USERS",
      payload: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const addUser = (payload) => async (dispatch) => {
  try {
    const response = await addDBUser(payload);
    if (response.success) {
      dispatch(getUsers()); // Update user list after successful addition
    } else {
      console.error("Error adding user:", response.message);
    }
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const editedUser = (id, payload) => async (dispatch) => {
  
  try {
    
    const response = await modifyDBUser(id, payload);
    

    if (response.success) {
     
      dispatch(getUsers()); 
    } else {
      console.error("Error editing user:", response.message);
    }
  } catch (error) {
    console.error("Error editing user:", error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const response = await removeDBUser(id);
    if (response.success) {
      dispatch(getUsers()); 
    } else {
      console.error("Error deleting user:", response.message);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};