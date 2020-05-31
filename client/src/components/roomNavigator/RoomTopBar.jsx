import React from "react";

function RoomTopBar({ handleRoomSearch, setIsOpen }) {
  return (
    <>
      <div className="headind_srch">
        <div className="recent_heading">
          <h4>
            Rooms
            <i
              className="fa fa-plus-circle ml-2 add-room-button"
              onClick={() => setIsOpen(true)}
            ></i>
          </h4>
        </div>
        <div className="srch_bar">
          <div className="stylish-input-group">
            <input
              type="text"
              className="search-bar"
              placeholder="Search"
              onChange={handleRoomSearch}
            />
            <span className="input-group-addon">
              <button type="button">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomTopBar;
