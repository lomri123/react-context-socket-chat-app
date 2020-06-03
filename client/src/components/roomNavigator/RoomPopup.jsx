import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { addRoom } from "../../services/roomApi";
import cleanText from "../../utils/badWords";
import ImagePreview from "../imageUpload/ImagePreview";
import ImageEdit from "../imageUpload/ImageEdit";

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

function RoomPopup({ modalIsOpen, setIsOpen, addNewRoom }) {
  const [roomName, setRoomname] = React.useState("");
  const [error, setError] = React.useState("");
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
    const cleanRoomName = cleanText(roomName);
    if (roomName === cleanRoomName) {
      const roomData = {
        title: roomName,
        description: "description",
      };
      try {
        const { data } = await addRoom(roomData, image);
        addNewRoom(data);
        closeModal();
      } catch (error) {
        let errorMessage = "something went wrong";
        if (error?.response?.status === 409) {
          errorMessage = "room name already taken";
        }
        setError(errorMessage);
      }
    } else {
      setError("only clean names please");
    }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Room Modal"
    >
      <div className="container-fluid room_start">
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
                      name="roomName"
                      className="form-control input_user"
                      value={roomName}
                      placeholder="room name"
                      onChange={(e) => setRoomname(e.target.value)}
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
  );
}

RoomPopup.propTypes = {
  modalIsOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  addNewRoom: PropTypes.func,
};

export default RoomPopup;
