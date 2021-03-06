import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import SingleMessage from "./SingleMessage";
import LoadingAnimation from "../common/LoadingAnimation";
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
    let fetchStart = itemsPerPage;
    if (!isReset) fetchStart += records;
    try {
      const result = await getMessages(activeRoom, -1 * fetchStart);
      const { data } = result;
      if (data.length > 0) {
        if (records === 0 || isReset) {
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

  const returnMessages = () => {
    return messageList.map((message) => (
      <SingleMessage
        messageFrom={message.from}
        messageText={message.text}
        messageTime={message.createdAt}
        key={message._id}
        sentInd={message.sentInd}
        currentUser={userData.username}
      />
    ));
  };

  const returnUnreadMessageCount = () => {
    return unreadMessages > 0 ? (
      <div className="unread_msg_count" onClick={scrollToBottom}>
        {unreadMessages}
      </div>
    ) : null;
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

  return (
    <>
      <div className="msg_history" onScroll={handleScroll}>
        <InfiniteScroll
          loadMore={() => loadMore(false)}
          hasMore={hasMoreItems}
          loader={<LoadingAnimation key={0} />}
          useWindow={false}
          isReverse={true}
          initialLoad={true}
        >
          {returnMessages()}
          <div ref={messagesEndRef} />
        </InfiniteScroll>
      </div>
      {returnUnreadMessageCount()}
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
