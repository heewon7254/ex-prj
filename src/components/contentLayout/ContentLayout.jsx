import { useState, useRef } from "react";

// form
import Button from "../common/Button/Button";
import fileHighLightIcon from "../../assets/icons/form/fileHighLightIcon.svg";
import SubmitIcon from "../../assets/icons/form/submitIcon.svg?react";

// message
import { GptIcon } from "../../assets/components/messages/gptIcon";

// 첨부파일 리스트
import { ClipIcon } from "../../assets/components/file/ClipIcon";
import { DocumentIcon } from "../../assets/components/file/DocumentIcon";
import { FileDeleteIcon } from "../../assets/components/file/FileDeleteIcon";

import "./contentLayout.scss";

export const ContentLayout = ({ children }) => {
  // 입력창 높이, 텍스트 여부
  const textareaRef = useRef(null);
  const [hasText, setHasText] = useState(false);

  const handleInput = (e) => {
    const value = e.target.value.trim();
    const textarea = textareaRef.current;

    // 자동 높이 조절
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    // 텍스트 여부 상태 업데이트
    setHasText(value.length > 0);

    // 패딩 조절
    if (textarea) {
      textarea.style.paddingLeft = value ? "0.4em" : "1.65em";
    }
  };

  return (
    <div className="content content--layout">
      <div className="top--scrollable">
        <div className="content__intro">
          <div className="content__inner">
            <h2 className="content__intro-title">
              <span>ex-GPT</span>
            </h2>
          </div>
        </div>
        <div className="content__suggests_wrapper">
          <div className="content__inner">
            <div className="content__suggests">
              <div className="content__suggests__list">
                <div className="content__suggests__item" tabIndex={0}>
                  <div className="content__suggests__text">
                    통행료는 어떤 방식으로 산정되나요?
                  </div>
                </div>
                <div className="content__suggests__item" tabIndex={0}>
                  <div className="content__suggests__text">
                    법인카드 사용 제한 업종
                  </div>
                </div>
                <div className="content__suggests__item" tabIndex={0}>
                  <div className="content__suggests__text">
                    둘째 아이 출산시 출산 지원비는 얼마인가요?
                  </div>
                </div>
                <div className="content__suggests__item" tabIndex={0}>
                  <div className="content__suggests__text">
                    병가 관련 규정 알려줘
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content__messages_wrapper">
          <div className="content__inner">
            <div className="message-title">
              <p className="message-title-text">새로운 채팅</p>
              <span className="message-title-date">2025년 8월 29일</span>
            </div>
            <div className="message message--assistant">
              <div className="message__avatar">
                <GptIcon />
              </div>
              <div className="message__content">메시지메시지메시지메시지</div>
              <div className="message__error_button">오류신고</div>
            </div>
            <div className="message message--user">
              {/* <div className="message__avatar"></div> */}
              <div className="message__content">메시지메시지메시지메시지</div>
            </div>
          </div>
        </div>
      </div>
      <div className="content__form_wrapper">
        <div className="content__inner">
          <div className={`content__form_list ${hasText ? "active" : ""}`}>
            {/* 첨부파일 목록 */}
            <div className="attached-files">
              <div className="attached-file-header">
                <span className="attached-file-header-title">첨부파일</span>
                <Button className="attached-file-header-remove-all">
                  모두 삭제
                </Button>
              </div>
              <div className="attached-file-list">
                <div className="attached-file-item">
                  <div className="attached-file-info">
                    <span className="attached-file-icon">
                      <ClipIcon />
                    </span>
                    <span className="attached-file-name">
                      의사결정지원시스템_오픈API(6종)_안내페이지(안).hwp
                    </span>
                    <span className="attached-file-size">15.5 KB</span>
                  </div>
                  <Button
                    className="attached-file-remove"
                    iconComponent={<FileDeleteIcon />}
                  ></Button>
                </div>
              </div>
            </div>
            <form className="content__form">
              <label htmlFor="message" className="sr-only">
                메시지 입력
              </label>
              {!hasText && (
                <img
                  src={fileHighLightIcon}
                  alt="강조 아이콘"
                  className="content__form-gliter-icon"
                />
              )}
              <textarea
                id="message"
                className="content__form-textarea"
                name="message"
                ref={textareaRef}
                onInput={handleInput}
                placeholder="의원 질의 내용을 입력하시면 답변서 작성을 도와드립니다"
              ></textarea>
              {/* 버튼들 */}
              <div className="content__form_btn">
                {/* 파일첨부 */}
                <label
                  htmlFor="file-upload"
                  className="content__form-file-label"
                >
                  <input type="file" id="file-upload" className="sr-only" />
                  {/* div로도 테스트 */}
                  <span className="tooltip">
                    파일첨부 (최대 5개, 각 파일 100MB 까지)
                  </span>
                </label>
                {/* 전송 */}
                <Button
                  type="submit"
                  label="전송"
                  className={`content__form-submit ${hasText ? "active" : ""}`}
                  iconComponent={SubmitIcon}
                ></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
