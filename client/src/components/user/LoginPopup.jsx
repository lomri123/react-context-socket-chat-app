import React, { useState } from "react";
import Modal from "react-modal";
import { registerUser } from "../../services/userApi";
import cleanText from "../../utils/badWords";
import ImagePreview from "./ImagePreview";
import ImageEdit from "./ImageEdit";

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
    const cleanUsername = cleanText(username);
    if (username === cleanUsername) {
      try {
        const result = await registerUser(username, image);
        const user = { ...result.data, room: "5ecee47b336c0d2adcb25a97" };
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
      setError("Your parents are mean :(");
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
        <div class="container">
          {isEditing ? (
            <ImageEdit
              setImage={setImage}
              image={image}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          ) : (
            <div class="d-flex justify-content-center mt-4">
              <div class="user_card mt-4">
                <ImagePreview
                  setIsEditing={setIsEditing}
                  setImage={setImage}
                  image={image}
                />
                <div class="d-flex justify-content-center mt-4">
                  <form onSubmit={handleSubmit}>
                    <div class="input-group ">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="fa fa-user"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="username"
                        class="form-control input_user"
                        value={username}
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mt-0 p-0 text-center text-danger">
                      {error}&nbsp;
                    </div>
                    <div class="d-flex flex-column justify-content-center mt-2 login_container">
                      <button type="submit" name="button" class="btn login_btn">
                        Login
                      </button>
                    </div>
                  </form>
                </div>

                <div class="mt-3 text-center">
                  <a>Terms of Use</a>
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
