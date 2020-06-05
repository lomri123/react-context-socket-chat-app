import React from "react";
import PropTypes from "prop-types";
import blankProfileImg from "../../assets/user-avatar.png";
import blankRoomImg from "../../assets/room.png";
import { validateImage } from "../../utils/validate";

function ImageUpload({ setIsEditing, setImage, setError, image, type }) {
  const onFileUpload = (e) => {
    if (e?.target?.files) {
      const file = e.target.files[0];
      const imageValidation = validateImage(file);
      if (imageValidation === "") {
        setImage(file);
        setIsEditing(true);
      }
      setError(imageValidation);
    }
  };

  const onFileReset = () => {
    setImage(null);
  };

  const returnImgSrc = () => {
    if (image) {
      return URL.createObjectURL(image);
    }
    if (type === "login") {
      return blankProfileImg;
    }
    return blankRoomImg;
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="brand_logo_container">
        <img src={returnImgSrc()} className="brand_logo mb-0" alt="Logo" />
        {image ? (
          <label className="mx-2 image_upload_btn" onClick={onFileReset}>
            <i className="fa fa-times fa-2x"></i>
          </label>
        ) : (
          <label className="mx-2 image_upload_btn ">
            <i className="fa fa-upload fa-2x mt-0">
              <input
                type="file"
                accept="image/*"
                className="inputfile"
                onChange={onFileUpload}
              />
            </i>
          </label>
        )}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  setIsEditing: PropTypes.func,
  setImage: PropTypes.func,
  setError: PropTypes.func,
  image: PropTypes.object,
};

export default ImageUpload;
