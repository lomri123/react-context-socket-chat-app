import React from "react";
import AvatarEditor from "react-avatar-editor";

class ImageEdit extends React.Component {
  state = {
    zoom: 1,
    rotate: 0,
  };

  onClickSave = () => {
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas();
      const image = this.editor.getImageScaledToCanvas().toDataURL();
      canvasScaled.toBlob((myBlob) => {
        const blobImage = new File([myBlob], image.name);
        this.props.setImage(blobImage);
      });
      this.props.setIsEditing(false);
    }
  };

  onClickCancel = () => {
    this.props.setImage(null);
    this.props.setIsEditing(false);
  };

  handleZoomSlider = (event) => {
    const { value } = event.target;
    this.setState({ zoom: value });
  };

  handleRoate = (action) => {
    let tmpDegress = this.state.rotate;
    if (action === "plus") {
      tmpDegress += 90;
    } else {
      tmpDegress -= 90;
    }
    this.setState({ rotate: tmpDegress });
  };

  setEditorRef = (editor) => (this.editor = editor);

  render() {
    const { image } = this.props;
    const { zoom, rotate } = this.state;
    return (
      <div>
        <AvatarEditor
          ref={this.setEditorRef}
          image={image}
          width={250}
          height={250}
          border={50}
          scale={zoom}
          borderRadius={200}
          rotate={rotate}
        />
        <div className="row justify-content-center">
          <label
            style={{
              marginRight: 10,
            }}
          >
            Zoom
          </label>
          <input
            type="range"
            min={1}
            max={5}
            step={0.1}
            value={zoom}
            name="zoom"
            onChange={this.handleZoomSlider}
            className="custom-range"
            style={{ width: 200 }}
          />
        </div>
        <div className="row justify-content-center">
          <i
            className="fa fa-undo px-2 mx-1 btn"
            onClick={() => this.handleRoate("minus")}
          />
          <i
            className="fa fa-undo fa-flip-horizontal px-2 mx-1 btn"
            onClick={() => this.handleRoate("plus")}
          />
        </div>
        <div className="row justify-content-center">
          <button className="col-4" onClick={() => this.onClickSave()}>
            Save
          </button>
          <button className="col-4" onClick={this.onClickCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default ImageEdit;
