import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { registerUser } from "../../services/userApi";
import ImageUpload from "../common/ImageUpload";
import ImageEdit from "../common/ImageEdit";
import { validateUser } from "./../../utils/validate";
import { ErrorDisplay } from "./../common/ErrorDisplay";
import { SubmitFormButton } from "./../buttons/SubmitFormButton";
import { FormInput } from "./../inputs/FormInput";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    minWidth: "500px",
  },
};

Modal.setAppElement("#root");

function LoginPopup({ userLogin }) {
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);

  function closeModal() {
    setUsername("");
    setError("");
    setIsEditing(false);
    setImage(null);
    setIsOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const userValidate = validateUser(username);
    if (!userValidate.error) {
      try {
        const result = await registerUser(username, image);
        const user = { ...result.data, room: "5ed30a088b7dc2416c932c3b" };
        userLogin(user, true);
        closeModal();
      } catch (error) {
        let errorMessage = "something went wrong";
        if (error?.response?.status === 409) {
          errorMessage = "username already taken";
        }
        setError(errorMessage);
      }
    } else {
      setError(userValidate.error);
    }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      style={customStyles}
      contentLabel="Login Modal"
    >
      <div className="container-fluid">
        {isEditing ? (
          <ImageEdit
            setImage={setImage}
            image={image}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        ) : (
          <div className="d-flex justify-content-center mt-4">
            <div className="user_card mt-4">
              <ImageUpload
                setIsEditing={setIsEditing}
                setImage={setImage}
                image={image}
                setError={setError}
                type="login"
              />
              <div className="d-flex justify-content-center mt-4">
                <form onSubmit={handleSubmit}>
                  <FormInput
                    name="username"
                    value={username}
                    placeholder="username"
                    onInputChange={setUsername}
                    iconName="user"
                  />
                  <ErrorDisplay errorText={error} />
                  <div className="d-flex flex-column justify-content-center mt-2 login_container">
                    <SubmitFormButton className="login_btn" text="Login" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

LoginPopup.propTypes = {
  userLogin: PropTypes.func,
};

export default LoginPopup;
