import React, { useState, forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./messages.scss";

import { useModalStore } from "../../store/modalStore";

import { GptIcon } from "../../../assets/components/messages/gptIcon";
import think from "../../../assets/icons/message/think.svg?react";
import response from "../../../assets/icons/message/response.svg?react";
import document from "../../../assets/icons/message/document.svg?react";

import ErrorButton from "./ErrorButton";
import Button from "../../common/Button/Button";
import Message from "./Message";

import { DetailArrowIcon } from "../../../assets/components/button/detailArrowIcon";

import MultiModal from "./MultiModal";

const MessageArea = forwardRef(({ message }, ref) => {
  const [openIndex, setOpenIndex] = useState(null);
  const openModal = useModalStore(state => state.openModal);

  const handleToggle = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  function splitByFilename(dataArray) {
    const orgSources = {};
    dataArray.forEach(obj => {
      const fname = obj.filename;
      if (!orgSources[fname]) {
        orgSources[fname] = [];
      }
      orgSources[obj.filename].push(obj);
    });
    return orgSources;
  }

  console.log(message);

  return (
    <div className="content__message" ref={ref}>
      {/*
                    <div className="message-title">
                        <p className="message-title-text">새로운 채팅</p>
                        <span className="message-title-date">2025년 8월 29일</span>
                    </div>
                    */}
      {message.role === "user" && (
        <div className="message message--user">
          <div className="message__content">{message.content}</div>
        </div>
      )}

      {message.role === "assistant" && (
        <div className="message message--assistant">
          <div className="message__avatar">
            <GptIcon />
          </div>
          <div className="message__content">
            <Message
              type="thinking-container"
              title={
                <>
                  <span style={{ color: "#067EE1" }}>추론 중...</span>
                  <span>추론 과정 보기</span>
                </>
              }
              icon={think}
              toggleable
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content.think}</ReactMarkdown>
            </Message>
            <Message type="response-content" title="답변" icon={response}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content.response}</ReactMarkdown>
            </Message>
            <Message type="source-documents" title="근거" icon={document}>
              <ul>
                {Object.entries(splitByFilename(message.content.sources)).map(
                  ([fileName, docList]) => {
                    const buttons = [];
                    const previews = [];

                    docList.forEach((doc, index) => {
                      if (index < 4) {
                        buttons.push(
                          <Button
                            key={`btn-${index}-${doc.document_id}`}
                            type="button"
                            className={`message__content_button source-toggle-button ${openIndex === `${index}-${doc.document_id}` ? "rotate" : ""}`}
                            onClick={() => handleToggle(`${index}-${doc.document_id}`)}
                          >
                            <span>
                              {openIndex === `${index}-${doc.document_id}` ? "숨기기" : "상세보기"}
                            </span>
                            <span className="relevance-score">
                              {" "}
                              ({(doc.relevance_score * 100).toFixed(1)}% 일치)
                            </span>
                            <DetailArrowIcon />
                          </Button>
                        );
                        previews.push(
                          <div
                            key={`preview-${index}-${doc.document_id}`}
                            className={`source-documents-preview ${openIndex === `${index}-${doc.document_id}` ? "active" : ""}`}
                          >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {doc.content_preview}
                            </ReactMarkdown>
                          </div>
                        );
                      }
                    });

                    return (
                      <li key={docList[0].download_url}>
                        <strong>{fileName}</strong>{" "}
                        <a
                          href={docList[0].download_url}
                          className="message__content_button"
                          download
                          aria-label={`${fileName} 다운로드`}
                        >
                          다운로드
                        </a>
                        <div className="source-buttons">{buttons}</div>
                        <div className="source-previews">{previews}</div>
                      </li>
                    );
                  }
                )}
              </ul>
            </Message>
            {/* <Message type="multi-modal" title="아래 이미지를 찾았습니다.">
              <MultiModal />
            </Message> */}
          </div>
          <ErrorButton onOpenErrorSubmitModal={() => openModal("errorSubmit")} />
        </div>
      )}
    </div>
  );
});

export default React.memo(MessageArea);
