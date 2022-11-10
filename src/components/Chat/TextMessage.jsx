import {
  BsArrow90DegRight,
  BsEmojiSmile,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { VscCommentDiscussion } from "react-icons/vsc";
import { MdClose, MdModeEditOutline } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_messages } from "../../api/message";
import { addBulkMessage } from "../../store/slice/message";
import { populateUsers, sliceText } from "../../util/helpers";
import images from "../../assets";
import { add_reaction, delete_message } from "../../api/message";

import moment from "moment";
import AudioInput from "./Audio/Render";

const Message = ({ space, msg, scrollToBottom, setMessageToRespond }) => {
  const [showReactEmojis, setShowReactEmojis] = useState(false);

  const userId = JSON.parse(localStorage.getItem("userId"));

  const handleReact = async (emoji) => {
    try {
      setShowReactEmojis(false);
      await add_reaction(space, msg._id, emoji);
    } catch (error) {
      console.log(error);
    }
  };

  const reaction = msg.reactions.find(
    (r) => r?.reactor?._id === userId
  )?.reaction;

  const handleDelete = async () => {
    try {
      await delete_message(space, msg._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex pb-5 hover:bg-slate-50 relative user-box">
      <div className="w-10 h-10 border-teal-400	border-4 rounded-full bg-slate-700 relative	">
        {msg.sender.avatar ? (
          <img src={msg?.sender?.avatar} alt="" className="rounded-full" />
        ) : (
          <h6 className="text-xs absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white">
            {msg?.sender?.fullName.slice(0, 1)}
          </h6>
        )}
      </div>
      <div className="bg-slate-100 p-3 rounded-lg ml-3 shadow-md max-w-[900px]">
        <div className="flex justify-between text-xs text-sky-900	pb-2">
          <h6 className="font-bold">{msg?.sender?.fullName}</h6>
          <small className="text-neutral-600 ml-5">
            {moment(msg.createdAt).fromNow()}
          </small>
        </div>

        {msg.replayOf && (
          <div className="mb-2 border-l-4 border-themeColor bg-slate-200 text-neutral-500 p-3 rounded-md mentioned-message-wrapper">
            <RenderAttachment
              message={msg.replayOf}
              scrollToBottom={scrollToBottom}
            />

            <RenderVoice
              message={msg.replayOf}
              scrollToBottom={scrollToBottom}
            />
            <p
              className="text-sm text-gray-900"
              dangerouslySetInnerHTML={{
                __html: populateUsers(msg.replayOf.content),
              }}
            ></p>
          </div>
        )}
        <RenderAttachment message={msg} scrollToBottom={scrollToBottom} />
        <RenderVoice message={msg} scrollToBottom={scrollToBottom} />
        <p
          className="text-sm text-gray-900"
          dangerouslySetInnerHTML={{
            __html: populateUsers(msg?.content),
          }}
        ></p>
      </div>

      {Boolean(msg?.reactions.length) && (
        <div className="absolute right-0 -top-3 flex bg-white border border-gray-500 text-gray-500 rounded-3xl py-1.5 px-2 reaction-wrapper">
          {msg?.reactions?.map((data, idx) => (
            <p
              key={idx}
              className="px-1 text-xs hover:text-teal-400 tooltip-box select-none"
            >
              {data?.reaction}

              <p className="tooltip-text select-none">
                {data.reactor.fullName}
              </p>
            </p>
          ))}
        </div>
      )}

      <div className="absolute right-0 -top-3 flex bg-white border border-gray-500 text-gray-500 rounded-3xl py-1.5 px-2 msg-icons">
        <div className="px-1 hover:text-teal-400 tooltip-box">
          <BsArrow90DegRight />
          <p className="tooltip-text">Convert the task</p>
        </div>
        <div className="px-1.5 hover:text-teal-400 tooltip-box">
          <BsEmojiSmile onClick={() => setShowReactEmojis(!showReactEmojis)} />
          <p className="tooltip-text select-none">Add a reaction</p>

          {showReactEmojis && (
            <div className="z-20 absolute top-9 right-[-4px] flex gap-2 items-center p-1 bg-gray-300 rounded-md after:content-[''] after:absolute after:top-[-5px] after:right-2 after:w-5 after:h-5 after:bg-gray-300 after:rotate-45 after:-z-10 ">
              <p
                className={`p-1 bg-gray-100 rounded-md cursor-pointer duration-200 hover:bg-gray-400 ${
                  reaction === "👍" ? "bg-gray-400" : ""
                }`}
                onClick={() => handleReact("👍")}
              >
                👍
              </p>
              <p
                className={`p-1 bg-gray-100 rounded-md cursor-pointer duration-200 hover:bg-gray-400 ${
                  reaction === "😊" ? "bg-gray-400" : ""
                }`}
                onClick={() => handleReact("😊")}
              >
                😊
              </p>
              <p
                className={`p-1 bg-gray-100 rounded-md cursor-pointer duration-200 hover:bg-gray-400 ${
                  reaction === "👎" ? "bg-gray-400" : ""
                }`}
                onClick={() => handleReact("👎")}
              >
                👎
              </p>
              <p
                className={`p-1 bg-gray-100 rounded-md cursor-pointer duration-200 hover:bg-gray-400 ${
                  reaction === "😎" ? "bg-gray-400" : ""
                }`}
                onClick={() => handleReact("😎")}
              >
                😎
              </p>
            </div>
          )}
        </div>
        <div
          onClick={() => setMessageToRespond(msg)}
          className="px-1.5 hover:text-teal-400 tooltip-box"
        >
          <VscCommentDiscussion />
          <p className="tooltip-text">Respond to this message</p>
        </div>
        {/* <div className="px-1.5 hover:text-teal-400 tooltip-box">
          <MdModeEditOutline />
          <p className="tooltip-text">Edit message</p>
        </div> */}

        {msg.sender._id === userId && (
          <div className="px-1.5 hover:text-teal-400 tooltip-box">
            <MdClose onClick={handleDelete} />
            <p className="tooltip-text">Delete</p>
          </div>
        )}

        <div className="px-1 hover:text-teal-400 tooltip-box">
          <BsThreeDotsVertical />
          <p className="tooltip-text">Add as a quote</p>
        </div>
      </div>
    </div>
  );
};

const RenderAttachment = ({ message, scrollToBottom }) =>
  message?.content?.attachments?.map((src, idx) => {
    const extension = src.match(/\.([^\./\?]+)($|\?)/)[1];

    if (
      ["png", "jpeg", "jpg", "ttif", "gif", "webp", "svg"].includes(extension)
    ) {
      return (
        <img
          onLoad={scrollToBottom}
          key={idx}
          src={src}
          alt=""
          className="max-w-[500px] mb-2"
        />
      );
    } else {
      return (
        <div className="mb-2">
          <a
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            target="_blank"
            rel="noreferrer"
            href={src}
          >
            {src}
          </a>
        </div>
      );
    }
  });

const RenderVoice = ({ message, scrollToBottom }) => {
  useEffect(() => {
    scrollToBottom();
  }, []);

  if (message?.content?.voice) {
    return (
      <div>
        <AudioInput url={message?.content?.voice} />
      </div>
    );
  } else {
    return null;
  }
};

const TextMessage = ({ messageToRespond, setMessageToRespond }) => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef();

  const messages = useSelector((state) => state.message.messages);
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

  // console.log(messages)

  useEffect(() => {
    if (Boolean(selectedSpaceId)) {
      const loadMessages = async () => {
        try {
          const { data } = await get_messages(selectedSpaceId);
          dispatch(addBulkMessage(data.messages.reverse()));

          // console.log(data.messages);

          scrollToBottom();
        } catch (error) {
          alert(error.message);
        }
      };

      loadMessages();
    }
  }, [selectedSpaceId, dispatch]);

  useEffect(() => {
    scrollToBottom();
    // console.log(messageToRespond);
  }, [messages, messageToRespond]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {messages.length ? (
        messages.map((msg, idx) => (
          <Message
            space={selectedSpaceId}
            msg={msg}
            scrollToBottom={scrollToBottom}
            key={idx}
            setMessageToRespond={setMessageToRespond}
          />
        ))
      ) : (
        <div className="grid place-items-center h-[70vh] text-gray-700">
          <div className="text-center space-y-3">
            <img src={images.chattingStart} alt="" className="w-36 mx-auto" />
            <h2 className="text-2xl font-bold">What a quiet team!</h2>
            <p>
              Don’t be shy, send a message to your team and <br /> fill this
              empty space.
            </p>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />

      {/* 🔘🔘🔘🔘🔘🔘🔘🔘🔘 Seen SMS 🔘🔘🔘🔘🔘🔘🔘🔘🔘 */}
      <div className="text-gray-400 text-xs flex justify-between">
        <div>
          {messages?.length &&
            messages[messages?.length - 1]?.seen?.length + " seen"}
        </div>

        <div className="flex gap-1">
          {messages[messages?.length - 1]?.seen.map((data) =>
            data?.avatar ? (
              <img
                src={data?.avatar}
                alt=""
                className="w-4 h-4 rounded-full mb-2 tooltip-box"
              />
            ) : (
              <p className="w-5 h-5 rounded-full mb-2 tooltip-box bg-gray-300 text-black font-bold grid place-items-center">
                {data?.fullName.charAt(0)}
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default TextMessage;
