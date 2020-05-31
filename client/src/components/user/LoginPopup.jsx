import React, { useState } from "react";
import Modal from "react-modal";
import { registerUser } from "../../services/userApi";
import ImagePreview from "../imageUpload/ImagePreview";
import ImageEdit from "../imageUpload/ImageEdit";
import { validateUser } from "./../../utils/validate";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  },
};

Modal.setAppElement("#root");

function LoginPopup({ userLogin }) {
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
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
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <div className="container">
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
                <ImagePreview
                  setIsEditing={setIsEditing}
                  setImage={setImage}
                  image={image}
                />
                <div className="d-flex justify-content-center mt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group ">
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-user"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="username"
                        className="form-control input_user"
                        value={username}
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength={20}
                      />
                    </div>
                    <div className="mt-0 p-0 text-center text-danger">
                      {error}&nbsp;
                    </div>
                    <div className="d-flex flex-column justify-content-center mt-2 login_container">
                      <button
                        type="submit"
                        name="button"
                        className="btn login_btn"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default LoginPopup;
