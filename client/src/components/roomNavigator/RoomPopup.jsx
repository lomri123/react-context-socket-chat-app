import React, { useState } from "react";
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
  },
};

Modal.setAppElement("#root");

function RoomPopup({ modalIsOpen, setIsOpen }) {
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
        const result = await addRoom(roomData, image);
        // roomLogin(roomName, true);
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
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Room Modal"
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
              <div className="room_card mt-4">
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
                          <i className="fa fa-room"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="roomName"
                        className="form-control input_room"
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
    </div>
  );
}

export default RoomPopup;
