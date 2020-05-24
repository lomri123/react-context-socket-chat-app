import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { SingleMessage } from "./SingleMessage";
import LoadingAnimation from "./../LoadingAnimation";
import { getMessages } from "../../services/chatApi";

function MessageList({ messageListProps, addNewMessages, activeRoom }) {
  const itemsPerPage = 20;
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [records, setrecords] = useState(itemsPerPage);

  useEffect(() => {
    console.log("MessageList", messageListProps);
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const loadMore = async () => {
    console.log("inside loadMore");
    if (records === messageListProps.length) {
      console.log("records === messageListProps.length");
      sethasMoreItems(false);
    } else {
      console.log("records != messageListProps.length");
      try {
        const result = await getMessages(
          activeRoom,
          -1 * (records + itemsPerPage)
        );
        addNewMessages(result.data);
        setrecords(records + itemsPerPage);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const messageList = messageListProps.map((message) => (
    <SingleMessage
      messageFrom={message.from}
      messageText={message.text}
      messageTime={message.createdAt}
      key={message._id}
      sentInd={message.sentInd}
    />
  ));
  return (
    <>
      <div className="msg_history">
        <InfiniteScroll
          loadMore={loadMore}
          hasMore={hasMoreItems}
          loader={<LoadingAnimation />}
          useWindow={false}
          isReverse={true}
        >
          {messageList}
        </InfiniteScroll>
        <div ref={messagesEndRef} />
      </div>
    </>
  );
}

export default MessageList;
