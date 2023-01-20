import React from "react";
import { getCurrentUser } from "./user";
import { Auth } from "aws-amplify";

export async function submitEditNameModal(props) {
  const user = await getCurrentUser();
  const {
    inputValues,
    setInputValues,
    modalInputFields,
    isModalVisible,
    setIsModalVisible,
    setModalErrorMessage,
  } = props;

  // Currently the edit name fields are pre populated with the user's current first and last name
  // The problem is that when pressing submit without editing these fields it will pass empty strings as first and last name
  // This is the temporary solution
  if (inputValues[0] === "") {
    inputValues[0] = user.attributes.given_name;
  }
  if (inputValues[1] === "") {
    inputValues[1] = user.attributes.family_name;
  }

  // Error handling to make sure the users first and last name is at least 2 characters and it is not the same name as their current
  if (
    inputValues[0].length <= 1 ||
    inputValues[1].length <= 1 ||
    (inputValues[0] === user.attributes.given_name &&
      inputValues[1] === user.attributes.family_name)
  ) {
    setModalErrorMessage("ERROR: Invalid name");
    console.log("Invalid name");
  } else {
    try {
      await Auth.updateUserAttributes(user, {
        given_name: inputValues[0],
        family_name: inputValues[1],
      });
      console.log("New name saved successfully: ", inputValues);
      setIsModalVisible(!isModalVisible);
    } catch (error) {
      console.log("Error updating name: ", error);
    }
  }
  setInputValues(Array(modalInputFields?.length).fill(""));
}
