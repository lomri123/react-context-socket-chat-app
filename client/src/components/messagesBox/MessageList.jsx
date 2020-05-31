import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import SingleMessage from "./SingleMessage";
import LoadingAnimation from "./../LoadingAnimation";
import { getMessages } from "../../services/messageApi";

function MessageList({
  messageListProps,
  addNewMessages,
  activeRoom,
  userData,
}) {
  const itemsPerPage = 20;
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [records, setRecords] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = (behavior) => {
    messagesEndRef.current.scrollIntoView();
  };

  const loadMore = async () => {
    try {
      const result = await getMessages(
        activeRoom,
        -1 * (records + itemsPerPage)
      );
      const { data } = result;
      if (data.length > 0) {
        if (records === 0) {
          addNewMessages(data, true);
        } else {
          addNewMessages(data);
        }
        scrollToBottom();
        setRecords(records + data.length);
      }
      if (data.length < itemsPerPage) {
        setHasMoreItems(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const messageList = messageListProps.map((message) => (
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
          {messageList}
          <div ref={messagesEndRef} />
        </InfiniteScroll>
      </div>
    </>
  );
}

export default MessageList;
