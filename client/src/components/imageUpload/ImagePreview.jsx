import React from "react";
import PropTypes from "prop-types";
import blankProfileImg from "../../assets/user-avatar.png";

function ImagePreview({ setIsEditing, setImage, image }) {
  const onFileUpload = (e) => {
    if (e?.target?.files) {
      const file = e.target.files[0];
      setImage(file);
      setIsEditing(true);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="brand_logo_container">
        <img
          src={image ? URL.createObjectURL(image) : blankProfileImg}
          className="brand_logo"
          alt="Logo"
        />
        <label>
          <i className="fa fa-upload">
            <input type="file" className="inputfile" onChange={onFileUpload} />
          </i>
        </label>
      </div>
    </div>
  );
}

ImagePreview.propTypes = {
  setIsEditing: PropTypes.func,
  setImage: PropTypes.func,
  image: PropTypes.object,
};

export default ImagePreview;
