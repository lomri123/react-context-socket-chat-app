import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import SingleMessage from "./SingleMessage";
import LoadingAnimation from "./../LoadingAnimation";
import { getMessages } from "../../services/messageApi";

let freshMount = true;

function MessageList({ messageList, addNewMessages, activeRoom, userData }) {
  const itemsPerPage = 20;
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [records, setRecords] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = (behavior) => {
    messagesEndRef.current.scrollIntoView();
  };

  const loadMore = async (isReset) => {
    try {
      const result = await getMessages(
        activeRoom,
        -1 * (records + itemsPerPage)
      );
      const { data } = result;
      if (data.length > 0) {
        if (records === 0) {
          addNewMessages(data, true);
          scrollToBottom();
        } else {
          addNewMessages(data);
        }
        setRecords(records + data.length);
      } else {
        if (isReset === true) {
          addNewMessages(data, true);
          scrollToBottom();
        }
      }
      if (data.length < itemsPerPage) {
        setHasMoreItems(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetScroller = () => {
    setRecords(0);
    setHasMoreItems(true);
    loadMore(true);
  };

  useEffect(() => {
    if (freshMount) {
      freshMount = false;
    } else {
      resetScroller();
    }
  }, [activeRoom]);

  const messages = messageList.map((message) => (
    <SingleMessage
      messageFrom={message.from}
      messageText={message.text}
      messageTime={message.createdAt}
      key={message._id}
      sentInd={message.sentInd}
      currentUser={userData.username}
    />
  ));

  return (
    <>
      <div className="msg_history">
        <InfiniteScroll
          loadMore={loadMore}
          initialLoad={true}
          hasMore={hasMoreItems}
          loader={<LoadingAnimation />}
          useWindow={false}
          isReverse={true}
        >
          {messages}
          <div ref={messagesEndRef} />
        </InfiniteScroll>
      </div>
    </>
  );
}

MessageList.propTypes = {
  setIsEditing: PropTypes.func,
  messageList: PropTypes.array,
  activeRoom: PropTypes.string,
  userData: PropTypes.object,
};

export default MessageList;
