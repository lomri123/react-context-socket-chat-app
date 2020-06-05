import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { addRoom } from "../../services/roomApi";
import cleanText from "../../utils/badWords";
import ImageUpload from "../imageUpload/ImageUpload";
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
  const [roomName, setRoomName] = React.useState("");
  const [roomDesc, setRoomDesc] = React.useState("");
  const [error, setError] = React.useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);

  function closeModal() {
    setRoomName("");
    setRoomDesc("");
    setError("");
    setIsEditing(false);
    setImage(null);
    setIsOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const cleanRoomName = cleanText(roomName);
    const cleanRoomDesc = cleanText(roomDesc);
    if (roomName === cleanRoomName && roomDesc === cleanRoomDesc) {
      const roomData = {
        title: roomName,
        description: roomDesc,
      };
      try {
        const { data } = await addRoom(roomData, image);
        addNewRoom(data);
        closeModal();
      } catch (error) {
        console.log(error);
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
            <div className="user_card mt-4" style={{ background: "#386895" }}>
              <ImageUpload
                setIsEditing={setIsEditing}
                setImage={setImage}
                image={image}
                setError={setError}
              />
              <div className="d-flex justify-content-center mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mt-4">
                    <input
                      type="text"
                      name="roomName"
                      className="form-control input_user"
                      value={roomName}
                      placeholder="room name"
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                  </div>
                  <div className="input-group mt-3">
                    <input
                      type="text"
                      name="roomDesc"
                      className="form-control input_user"
                      value={roomDesc}
                      placeholder="description"
                      onChange={(e) => setRoomDesc(e.target.value)}
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
                      style={{ background: "#eaa22f" }}
                    >
                      Create room
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
