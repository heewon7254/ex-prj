import React, { useState, useEffect, useRef } from "react";
import Button from "./components/common/Button/Button";
// header
import ThemeIcon from "./assets/components/header/ThemeIcon";
import TextIcon from "./assets/components/header/TextIcon";
import BookIcon from "./assets/components/header/BookIcon";
import NoticeIcon from "./assets/components/header/NoticeIcon";
import StarIcon from "./assets/components/header/StarIcon";
import Logo from "./assets/components/header/Logo";

// content
// import ChatbotIcon from './assets/components/chatbot/ChatbotIcon';
// import smileIcon from './assets/icons/emoji/smileIcon@4x.png';

// aside
import userDefaultIconLight from "./assets/icons/aside/userDefaultIcon_light.svg";
import userDefaultIconDark from "./assets/icons/aside/userDefaultIcon_dark.svg";
import userDeptProfile from "./assets/icons/aside/userDeptProfile.svg";
import { ToggleCloseIcon } from "./assets/components/aside/ToggleCloseIcon";
import { ToggleOpenIcon } from "./assets/components/aside/ToggleOpenIcon";
import { PlusIcon } from "./assets/components/aside/PlusIcon";
import { NewChatGliterIcon } from "./assets/components/aside/NewChatGliterIcon";
import { DeleteChatIcon } from "./assets/components/aside/DeleteChatIcon";
import { GovInspctionIcon } from "./assets/components/aside/GovInspctionIcon";
import { ChevronRightIcon } from "./assets/components/aside/ChevronRightIcon";

// import { Header } from './components/header/Header';
// import { Aside } from './components/aside/Aside';
import { ContentLayout } from "./components/contentLayout/ContentLayout";

// modal
import { ModalCloseIcon } from "./assets/components/modal/ModalCloseIcon";

// form
import { ClipIcon } from "./assets/components/file/ClipIcon";
import { DocumentIcon } from "./assets/components/file/DocumentIcon";
import { FileDeleteIcon } from "./assets/components/file/FileDeleteIcon";

// Toast
import { ErrorToastIcon } from "./assets/components/toast/ErrorToastIcon";
import { SuccessToastIcon } from "./assets/components/toast/SuccessToastIcon";

function App() {
  // aside 열/닫
  const [isOpen, setIsOpen] = useState(true); // 기본은 큰 화면 열림
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 850);
  const [manualClosed, setManualClosed] = useState(false); // 큰 화면에서 닫았는지 기억

  // 버튼 토글
  const toggleAside = () => {
    if (isLargeScreen) {
      setIsOpen(!isOpen);
      setManualClosed(!isOpen === false); // 열린 상태에서 누르면 -> 닫은 걸 기록
    } else {
      setIsOpen(!isOpen);
    }
  };

  // 리사이즈 핸들러
  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth > 850;
      setIsLargeScreen(large);

      if (large) {
        // 큰 화면으로 돌아왔을 때
        setIsOpen(!manualClosed); // 닫은 적 있으면 닫힘 유지, 아니면 열림
      } else {
        // 작은 화면은 항상 닫힘 기본
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 최초 실행

    return () => window.removeEventListener("resize", handleResize);
  }, [manualClosed]);

  // 상단 헤더 버튼
  const getTitleLabel = (isLargeScreen, label) => {
    return isLargeScreen ? "" : label;
  };

  // 글자크기 버튼 폰트 사이즈 설정
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--ds-font-size-base",
      `${fontSize}px`
    );
  }, [fontSize]);

  // 테마
  const [theme, setTheme] = useState("light");

  // // theme 상태가 바뀔 때 HTML 속성 변경
  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
  }, [theme]);

  // 글자크기버튼
  // <button onClick={() => setFontSize(fontSize + 2)}>크게</button>
  // <button onClick={() => setFontSize(fontSize - 2)}>작게</button>

  return (
    <>
      {/* Header.jsx */}
      <header className="header">
        <div className="header__inner">
          {/* <Logo></Logo> */}
          <div className="header__util-menu">
            <Button
              iconComponent={<ThemeIcon />}
              className="header__util-button"
              label="테마선택"
              titleLabel={getTitleLabel(isLargeScreen, "테마선택")}
              onClick={() =>
                setTheme((prev) => (prev === "light" ? "dark" : "light"))
              }
            />
            <Button
              iconComponent={<TextIcon />}
              className="header__util-button text-size"
              label="글자크기"
              titleLabel={getTitleLabel(isLargeScreen, "글자크기")}
            />
            <Button
              iconComponent={<BookIcon />}
              className="header__util-button"
              label="사용법안내"
              titleLabel={getTitleLabel(isLargeScreen, "사용법안내")}
            />
            <Button
              iconComponent={<NoticeIcon />}
              className="header__util-button"
              label="공지사항"
              titleLabel={getTitleLabel(isLargeScreen, "공지사항")}
            />
            <Button
              iconComponent={<StarIcon />}
              className="header__util-button"
              label="만족도조사"
              titleLabel={getTitleLabel(isLargeScreen, "만족도조사")}
            />
          </div>
        </div>
      </header>
      <div className="app-container">
        {/* Aside.jsx */}
        <aside className={`aside ${isOpen ? "" : "folded"}`}>
          <div className="aside__inner">
            <h1 className="aside__logo-meta">
              <Button
                className="aside__toggle_btn"
                onClick={toggleAside}
                tabIndex={1}
              >
                {isOpen ? <ToggleCloseIcon /> : <ToggleOpenIcon />}
              </Button>
              <div className="aside__logo-desc">
                <a href="#" tabIndex={1}>
                  <Logo></Logo>
                  <span className="aside__logo-version">1.4</span>
                </a>
                <span className="aside__logo-text">한국도로공사 AI</span>
              </div>
            </h1>
            {/* 프로필 이미지, 현재 버전 정보 */}
            <div className="user-info">
              <div className="user-info__profile">
                <img
                  src={
                    theme == "light"
                      ? userDefaultIconLight
                      : userDefaultIconDark
                  }
                  alt="사용자 기본 프로필"
                />
              </div>
              <div className="user-info__meta">
                <div className="user-info__name">ex-GPT</div>
                <div className="user-info__version">한국도로공사 AI 1.4</div>
              </div>
            </div>
            {/* 새 대화, 대화 지우기, 국정감사 전용 AI */}
            <div className="aside__list">
              <a href="#" className="aside__link aside__link-new">
                <div className="aside__link__inner">
                  <div className="icon">
                    <PlusIcon />
                  </div>
                  <span className="aside__link-text">새 대화</span>
                  <NewChatGliterIcon />
                </div>
              </a>
              <a href="#" className="aside__link aside__link-delete">
                <div className="aside__link__inner">
                  <div className="icon">
                    <DeleteChatIcon />
                  </div>
                  <span className="aside__link-text">대화 지우기</span>
                  <ChevronRightIcon className="aside__link-arrow" />
                </div>
              </a>
              <a href="#" className="aside__link aside__link-gov">
                <div className="aside__link__inner">
                  <div className="icon">
                    <GovInspctionIcon />
                  </div>
                  <span className="aside__link-text">국정감사 전용 AI</span>
                  <ChevronRightIcon className="aside__link-arrow" />
                </div>
              </a>
            </div>
            {/* 이전 대화 기록 */}
            <div className="history-list">
              <div className="history-title">이전 대화</div>
              <a href="#" className="history-item active">
                이전 대화 기록 1
                말줄임테스트말줄임테스트말줄임테스트말줄임테스트말줄임테스트말줄임테스트
              </a>
              <a href="#" className="history-item">
                이전 대화 기록 2
              </a>
              <a href="#" className="history-item">
                이전 대화 기록 3
              </a>
              <a href="#" className="history-item">
                이전 대화 기록 4
              </a>
            </div>
          </div>
          {/* 부서 */}
          <div className="user__dept">
            <div className="user__dept-profile">
              <img src={userDeptProfile} alt="ex-GPT 로고" />
            </div>
            <div className="user__dept-details">
              <div className="user__dept-name">디지털계획처</div>
              <div className="user__dept-extension">(내선:800-4552)</div>
            </div>
          </div>
        </aside>
        {isOpen && <div className="overlay" onClick={toggleAside}></div>}
        <ContentLayout></ContentLayout>
      </div>
      {/* modal.jsx */}
      {/* 글자크기 선택 팝업 */}
      <div className="modal font-size-modal">
        <div className="modal-box">
          <button className="modal-close">
            <ModalCloseIcon></ModalCloseIcon>
          </button>
          <div className="modal-header">
            <p className="modal-header-title">글자 크기 선택</p>
          </div>
          <div className="modal-content">
            <div className="modal-content-inn">
              <Button defaultClass="font-size-button">가</Button>
              <Button defaultClass="font-size-button">가</Button>
              <Button defaultClass="font-size-button" className="active">
                가
              </Button>
              <Button defaultClass="font-size-button">가</Button>
              <Button defaultClass="font-size-button">가</Button>
            </div>
          </div>
          <div className="modal-footer">
            <div className="flex-end">
              <Button className="secondary" label="취소"></Button>
              <Button className="primary" label="확인"></Button>
            </div>
          </div>
        </div>
      </div>
      {/* 사용법 안내 팝업 */}
      <div className="modal guide-modal">
        <div className="modal-box">
          <button className="modal-close">
            <ModalCloseIcon></ModalCloseIcon>
          </button>
          <div className="modal-header">
            <p className="modal-header-title">사용법 안내</p>
          </div>
          <div className="modal-content">
            <div className="modal-content-inn">
              <div className="guide-modal-set">
                <div className="guide-modal-title">기본 사용법</div>
                <ul className="guide-modal-list">
                  <li>질문을 입력하고 Enter 또는 전송 버튼을 클릭하세요</li>
                  <li>AI가 실시간으로 답변을 제공합니다</li>
                  <li>추천 질문을 클릭하여 빠르게 질문할 수 있습니다</li>
                </ul>
              </div>
              <div className="guide-modal-set">
                <div className="guide-modal-title">주요 기능</div>
                <ul className="guide-modal-list">
                  <li>
                    <span className="icon-inn">
                      <TextIcon />
                    </span>
                    글자 크기 조절: 읽기 편한 크기로 조정
                  </li>
                  <li>
                    <span className="icon-inn">
                      <NoticeIcon />
                    </span>
                    공지사항: 시스템 업데이트 및 공지 확인
                  </li>
                  <li>
                    <span className="icon-inn">
                      <StarIcon />
                    </span>
                    만족도 조사: 서비스 개선을 위한 의견 제출
                  </li>
                  <li>
                    <span className="icon-inn">
                      <GovInspctionIcon />
                    </span>
                    국정감사 전용 AI: 국정감사 업무에 특화된 AI 모드 선택
                  </li>
                </ul>
              </div>
              <div className="guide-modal-set">
                <div className="guide-modal-title">단축키</div>
                <ul className="guide-modal-list">
                  <li>
                    <em>Enter:</em> 메시지 전송
                  </li>
                  <li>
                    <em>Shift + Enter:</em> 줄바꿈
                  </li>
                  {/* <li>
                    <em>Ctrl + T:</em>Think 모드 토글
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="flex-end">
              <Button className="primary" label="확인"></Button>
            </div>
          </div>
        </div>
      </div>
      {/* 오류사항신고 팝업 */}
      <div className="modal error-submit-modal">
        <div className="modal-box">
          <button className="modal-close">
            <ModalCloseIcon></ModalCloseIcon>
          </button>
          <div className="modal-header">
            <p className="modal-header-title">오류사항신고</p>
          </div>
          <div className="modal-content">
            <div className="modal-content-inn">
              <div className="error-submit-modal-title">
                <p>
                  이 답변을 오류신고 하시겠습니까?
                  <br />
                  답변내용과 해당 1개 질문이 디지털계획처로 전송됩니다.
                </p>
              </div>
              <div className="error-submit-modal-select">
                <div className="error-submit-modal-select__option">
                  더 자세히 알려주세요
                </div>
                <div className="error-submit-modal-select__option">
                  메모리를 사용해선 안 됐습니다
                </div>
                <div className="error-submit-modal-select__option">
                  성격이 별로예요
                </div>
                <div className="error-submit-modal-select__option">
                  스타일이 마음에 들지 않습니다
                </div>
                <div className="error-submit-modal-select__option">
                  올바른 사실이 아닌 말을 했습니다
                </div>
                <div className="error-submit-modal-select__option">
                  지시한 내용을 다 따르지 않았습니다
                </div>
              </div>
              <textarea
                name=""
                id=""
                rows="6"
                placeholder="추가의견"
                className="error-submit-modal-textarea"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <div className="flex-end">
              <Button className="secondary" label="취소"></Button>
              <Button className="primary" label="제출"></Button>
            </div>
          </div>
        </div>
      </div>
      {/* 파일업로드 팝업 */}
      <div className="modal file-upload-modal">
        <div className="modal-box">
          <button className="modal-close">
            <ModalCloseIcon></ModalCloseIcon>
          </button>
          <div className="modal-header">
            <p className="modal-header-title">파일업로드</p>
          </div>
          <div className="modal-content">
            <div className="modal-content-inn">
              <div className="file-upload-modal-area">
                <div className="file-upload-modal-set">
                  <div className="file-upload-modal__icon">
                    <ClipIcon />
                  </div>
                  <div className="file-upload-modal-file">
                    <div className="file-upload-modal-file__name">
                      ex-GPT_화면기능 정의서 _v.0.txt
                    </div>
                    <div className="file-upload-modal-file__size">2.83MB</div>
                  </div>
                  <Button
                    iconComponent={<FileDeleteIcon />}
                    className="file-upload-modal__delete"
                  ></Button>
                </div>
                <div className="file-upload-modal-set">
                  <div className="file-upload-modal__icon">
                    <DocumentIcon />
                  </div>
                  <div className="file-upload-modal-file">
                    <div className="file-upload-modal-file__name">
                      ex-GPT_화면기능 정의서 _v.0.ppt
                    </div>
                    <div className="file-upload-modal-file__size">2.83MB</div>
                  </div>
                  <Button
                    iconComponent={<FileDeleteIcon />}
                    className="file-upload-modal__delete"
                  ></Button>
                </div>
              </div>
              <div className="file-upload-modal-info">
                선택한 파일들을 AI가 학습하여
                <br />
                문서 내용에 대한 질문에 답변 할 수 있습니다.
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="flex-end">
              <Button className="secondary" label="취소"></Button>
              <Button className="primary" label="학습하기"></Button>
            </div>
          </div>
        </div>
      </div>
      {/* 토스트 */}
      {/* <ErrorToastIcon /> */}
      {/* <div id="toast" className="toast show success">
        <div className="toast-content">
          <div className="toast-icon">
            <SuccessToastIcon />
          </div>
          <div className="toast-message">토스트 샘플입니다.</div>
        </div>
      </div> */}
    </>
  );
}

export default App;

// 구조
{
  /* <Header></Header>
<div className="app-container">
  <Aside></Aside>
  <ContentLayout></ContentLayout>
</div> */
}

// 구조 변경 시 scss 에 적은 이미지 파일 경로 변경 필요

// // 마크다운 변환 라이브러리 예: marked.js 사용
// const input = document.getElementById('markdown-input');
// const preview = document.getElementById('markdown-preview');
// const downloadBtn = document.getElementById('download-btn');

// // 입력값이 바뀔 때마다 미리보기 업데이트
// input.addEventListener('input', () => {
//   preview.innerHTML = marked(input.value);
// });

// // 다운로드 기능
// downloadBtn.addEventListener('click', () => {
//   const blob = new Blob([input.value], { type: 'text/markdown' });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'content.md';
//   a.click();
//   URL.revokeObjectURL(url);
// });

{
  /* <div
  class="attached-files"
  id="attachedFiles"
  style="display: block; width: 100%; justify-content: center;"
>
  <div class="attached-files-header">
    <span>첨부 파일</span>
    <button onclick="removeAllFiles()">모두 삭제</button>
  </div>
  <div class="attached-files-list" id="attachedFilesList">
    <div class="attached-file-item">
      <div class="attached-file-info">
        <span class="attached-file-icon">📎</span>
        <span class="attached-file-name">
          의사결정지원시스템_오픈API(6종)_안내페이지(안).hwp
        </span>
        <span class="attached-file-size">15.5 KB</span>
      </div>
      <button class="attached-file-remove" onclick="removeSingleFile(0)">
        ✕
      </button>
    </div>
  </div>
</div>; */
}
