import { useState, useEffect, useRef } from "react";
import Button from "../../components/common/Button/Button";
import { DetailArrowIcon } from "../../assets/components/button/detailArrowIcon";
import { useMessageStore } from "../../components/store/messageStore";
import { useToastStore } from "../../components/store/toastStore";
import { sendChat } from "../../components/api/chat";

// 기존 Content에서 사용하던 컴포넌트
import Intro from "../../components/content/Intro/Intro";
import Suggests from "../../components/content/Suggests/Suggests";
import MessageArea from "../../components/content/Messages/MessageArea";
import Form from "../../components/content/Form/Form";

import "./chatPage.scss";

const ChatPage = ({ mode }) => {
  const textareaRef = useRef(null);
  const [hasText, setHasText] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [isLongMessage, setIsLongMessage] = useState(false);

  // mode 에 따라 document.title 변경
  useEffect(() => {
    if (mode === "default") document.title = "한국도로공사 GPT";
    else document.title = "ex-GPT(국정감사 전용 AI)";
  }, [mode]);

  const addUserMessage = useMessageStore(state => state.addUserMessage);
  const addAssistantMessage = useMessageStore(state => state.addAssistantMessage);
  const messages = useMessageStore(state => state.messages);
  const lastMessageRef = useRef(null);

  const addToast = useToastStore(state => state.addToast);

  const handleInput = e => {
    const value = e.target.value.trim();
    const textarea = textareaRef.current;
    setTextareaValue(value); // 추가

    // 자동 높이 조절
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    // 텍스트 여부 상태 업데이트
    setHasText(value.length > 0);

    // 패딩 조절
    if (textarea) {
      // 높이가 70px 이상으로 커진 적이 있다면, 글을 다 지울 때까진 유지
      if (textarea.scrollHeight > 70 && !isLongMessage) {
        setIsLongMessage(true);
      } else if (value.trim().length === 0) {
        // 텍스트를 전부 지우면 다시 false
        setIsLongMessage(false);
      }
    }
  };

  const handleSuggestClick = text => {
    setTextareaValue(text.trim());
    setHasText(text.trim().length > 0);

    // textarea 높이 및 패딩 조절
    if (textareaRef.current) {
      textareaRef.current.value = text.trim();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      // 높이가 70px 이상으로 커진 적이 있다면, 글을 다 지울 때까진 유지
      if (textareaRef.current.scrollHeight > 70 && !isLongMessage) {
        setIsLongMessage(true);
      } else if (text.trim().length === 0) {
        // 텍스트를 전부 지우면 다시 false
        setIsLongMessage(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!textareaValue.trim()) return;

    const userText = textareaValue.trim();

    if (userText.length > 2000) {
      addToast({ message: "메시지는 최대 2000자까지 입력할 수 있습니다.", type: "fail" });
      return;
    }
    if (userText.length < 2) {
      addToast({ message: "메시지는 최소 2자 이상 입력해야 합니다.", type: "fail" });
      return;
    }

    addUserMessage(userText);
    setTextareaValue("");
    setHasText(false);

    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
      // 높이가 70px 이상으로 커진 적이 있다면, 글을 다 지울 때까진 유지
      if (textareaRef.current.scrollHeight > 70 && !isLongMessage) {
        setIsLongMessage(true);
      } else if (userText.trim().length === 0) {
        // 텍스트를 전부 지우면 다시 false
        setIsLongMessage(false);
      }
    }

    let response;
    try {
      response = await sendChat([], userText, []);
    } catch (err) {
      console.error("채팅 응답 실패:", err);
      response = err?.data?.content ? err : null;
    }

    if (response?.data?.content) {
      addAssistantMessage(response.data.content);
    }

    // 스크롤 이동
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  };

  return (
    <div className="content content--layout">
      <div className="top--scrollable">
        <Intro />
        <Suggests onSuggestClick={handleSuggestClick} />
        <div className="content__messages_wrapper">
          <div className="content__inner">
            {messages.map((msg, idx) => (
              <MessageArea
                key={idx}
                message={msg}
                ref={idx === messages.length - 1 ? lastMessageRef : null}
              />
            ))}
          </div>
          {/* {messages.length !== 0 && (
            <Button className="scroll-to-bottom" iconComponent={<DetailArrowIcon />}></Button>
          )} */}
        </div>
      </div>
      <Form
        hasText={hasText}
        textareaRef={textareaRef}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        textareaValue={textareaValue}
        isLongMessage={isLongMessage}
      />
    </div>
  );
};

export default ChatPage;
