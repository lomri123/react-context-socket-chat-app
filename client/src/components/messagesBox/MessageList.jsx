import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import SingleMessage from "./SingleMessage";
import LoadingAnimation from "./../LoadingAnimation";
import { getMessages } from "../../services/messageApi";
import compareTwoMessages from "./../../utils/compareTwoMessages";

let freshMount = true;

function MessageList({
  messageList,
  addNewMessages,
  activeRoom,
  userData,
  userLastMessage,
}) {
  const itemsPerPage = 20;
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [records, setRecords] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [lastMessage, setLastMessage] = useState(null);
  const [isBottom, setIsBottom] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
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
    setUnreadMessages(0);
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setIsBottom(true);
      setUnreadMessages(0);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    if (freshMount) {
      freshMount = false;
    } else {
      resetScroller();
    }
  }, [activeRoom]);

  useEffect(() => {
    const filteredMessages = messageList.filter(
      (message) => message.from !== "Admin"
    );
    const tmpLastMessage = filteredMessages.slice(-1)[0];
    setRecords(filteredMessages.length);
    if (isBottom) {
      scrollToBottom();
    } else {
      if (
        filteredMessages.length > 0 &&
        compareTwoMessages(userLastMessage, tmpLastMessage)
      ) {
        scrollToBottom();
      } else if (!compareTwoMessages(lastMessage, tmpLastMessage)) {
        setUnreadMessages((unreadMessages) => unreadMessages + 1);
      }
    }
    setLastMessage(tmpLastMessage);
  }, [messageList]);

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
      <div className="msg_history" onScroll={handleScroll}>
        <InfiniteScroll
          loadMore={loadMore}
          initialLoad={true}
          hasMore={hasMoreItems}
          loader={<LoadingAnimation key={0} />}
          useWindow={false}
          isReverse={true}
        >
          {messages}
          <div ref={messagesEndRef} />
        </InfiniteScroll>
      </div>
      {unreadMessages > 0 ? (
        <div className="unread_msg_count">{unreadMessages}</div>
      ) : null}
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
