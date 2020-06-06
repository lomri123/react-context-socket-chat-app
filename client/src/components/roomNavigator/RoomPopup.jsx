import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import { addRoom } from "../../services/roomApi";
import cleanText from "../../utils/cleanText";
import ImageUpload from "../common/ImageUpload";
import ImageEdit from "../common/ImageEdit";
import { SubmitFormButton } from "./../buttons/SubmitFormButton";
import { FormInput } from "./../inputs/FormInput";
import { ErrorDisplay } from "./../common/ErrorDisplay";
import { validateRoom } from "../../utils/validate";

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
    const roomValidate = validateRoom(roomName, roomDesc);
    if (!roomValidate.error) {
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
      setError(roomValidate.error);
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
                  <FormInput
                    name="roomName"
                    value={roomName}
                    className="mt-4"
                    placeholder="room name"
                    onInputChange={setRoomName}
                  />
                  <FormInput
                    name="roomDesc"
                    value={roomDesc}
                    className="mt-3"
                    placeholder="room description"
                    onInputChange={setRoomDesc}
                  />
                  <ErrorDisplay errorText={error} />
                  <div className="d-flex flex-column justify-content-center mt-2 login_container">
                    <SubmitFormButton
                      className="add_room_btn"
                      text="Create room"
                    />
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
