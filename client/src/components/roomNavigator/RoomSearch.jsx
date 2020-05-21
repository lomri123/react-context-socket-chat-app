import React, { useEffect } from "react";

function RoomSearch({ handleRoomSearch }) {
  useEffect(() => {
    console.log("RoomSearch");
  });
  return (
    <>
      <div className="headind_srch">
        <div className="recent_heading">
          <h4>Rooms</h4>
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

export default RoomSearch;
