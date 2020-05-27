import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { SingleMessage } from "./SingleMessage";
import LoadingAnimation from "./../LoadingAnimation";
import { getMessages } from "../../services/chatApi";

function MessageList({
  messageListProps,
  addNewMessages,
  activeRoom,
  messagesEndRef,
}) {
  const itemsPerPage = 20;
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [records, setRecords] = useState(itemsPerPage);

  const loadMore = async () => {
    try {
      const result = await getMessages(activeRoom, records + itemsPerPage);
      const { data } = result;
      if (data.length > 0) {
        addNewMessages(data);
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
