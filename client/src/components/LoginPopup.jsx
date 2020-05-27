import React, { useState } from "react";
import Modal from "react-modal";
import { newUser } from "./../services/userApi";

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
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await newUser(username);
      const user = { ...result.data, room: "5ecbd52181d79f398c36f23f" };
      userLogin(user, true);
      closeModal();
    } catch (error) {
      let errorMessage = "something went wrong";
      if (error?.response?.status === 409) {
        errorMessage = "username already taken";
      }
      setError(errorMessage);
    }
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="container">
          <div class="d-flex justify-content-center mt-4">
            <div class="user_card mt-4">
              <div class="d-flex justify-content-center mt-4">
                <div class="brand_logo_container">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    class="brand_logo"
                    alt="Logo"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-center mt-4">
                <form onSubmit={handleSubmit}>
                  <div class="input-group">
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
                  <div class="d-flex justify-content-center mt-3 login_container">
                    <button type="submit" name="button" class="btn login_btn">
                      Login
                    </button>
                  </div>
                </form>
              </div>

              <div class="mt-3 text-center">
                <i>Terms of Use</i>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LoginPopup;
