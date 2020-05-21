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
  let subtitle;
  const [nickname, setNickname] = React.useState("");
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
      const result = await newUser(nickname);
      const user = { ...result.data, room: "5ec3224716239d08946e5696" };
      userLogin(user, true);
      closeModal();
    } catch (error) {
      let errorMessage = "something went wrong";
      if (error?.response?.status === 409) {
        errorMessage = "nickname already taken";
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
        <div class="container h-100">
          <div class="d-flex justify-content-center h-100">
            <div class="user_card">
              <div class="d-flex justify-content-center">
                <div class="brand_logo_container">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    class="brand_logo"
                    alt="Logo"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-center form_container">
                <form onSubmit={handleSubmit}>
                  <div class="input-group mb-3">
                    <div class="input-group-append">
                      <span class="input-group-text">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="nickname"
                      class="form-control input_user"
                      value={nickname}
                      placeholder="username"
                      onChange={(e) => setNickname(e.target.value)}
                    />
                  </div>
                  <div class="d-flex justify-content-center mt-3 login_container">
                    <button type="submit" name="button" class="btn login_btn">
                      Login
                    </button>
                  </div>
                </form>
              </div>

              <div class="mt-4 text-center">
                <a href="#">Terms of Use</a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LoginPopup;
