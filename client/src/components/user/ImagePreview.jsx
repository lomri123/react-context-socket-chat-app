import React from "react";
import blankProfileImg from "../../assets/user-profile.png";

function ImagePreview({ setIsEditing, setImage, image }) {
  const onFileUpload = (e) => {
    if (e?.target?.files) {
      console.log("inside onFileUpload");
      const file = e.target.files[0];
      setImage(file);
      setIsEditing(true);
    }
  };

  return (
    <div class="d-flex justify-content-center mt-4">
      <div class="brand_logo_container">
        <img
          src={image ? URL.createObjectURL(image) : blankProfileImg}
          class="brand_logo"
          alt="Logo"
        />
        <input type="file" onChange={onFileUpload} />
      </div>
    </div>
  );
}

export default ImagePreview;