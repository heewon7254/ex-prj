import { useState, useEffect } from "react";

import userDeptProfile from "../../assets/icons/aside/userDeptProfile.svg";
import userDefaultIcon from "../../assets/icons/aside/userDefaultIcon.svg";
import Logo from "../../assets/components/header/Logo";
import Button from "../common/Button/Button";

import "./aside.scss";

export const Aside = () => {
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

  return (
    <aside className={`aside ${toggleAside ? "" : "folded"}`}>
      <div className="aside__inner">
        <h1 className="aside__logo-meta">
          <Button className="aside__toggle_btn" onClick={toggleAside}></Button>
          <div className="aside__logo-desc">
            <a href="#">
              <span className="aside__logo-img">
                <Logo></Logo>
              </span>
              <span className="aside__logo-version">1.4</span>
            </a>
            <span className="aside__logo-text">한국도로공사 AI</span>
          </div>
        </h1>
        {/* 프로필 이미지, 현재 버전 정보 */}
        <div className="user-info">
          <div className="user-info__profile">
            <img src={userDefaultIcon} alt="사용자 기본 프로필" />
          </div>
          <div className="user-info__meta">
            <div className="user-info__name">ex-GPT</div>
            <div className="user-info__version">한국도로공사 AI 1.4</div>
          </div>
        </div>
        {/* 새 대화, 대화 지우기, 국정감사 전용 AI */}
        <div className="aside__list">
          <a href="#" className="aside__link new-chat">
            새 대화
          </a>
          <a href="#" className="aside__link delete-chat">
            대화 지우기
          </a>
          <a href="#" className="aside__link gov-inspction">
            국정감사 전용 AI
          </a>
        </div>
        {/* 이전 대화 기록 */}
        <div className="history-list">
          <a href="#" className="history-item active">
            예전 대화 기록 1
          </a>
          <a href="#" className="history-item">
            예전 대화 기록 2
          </a>
          <a href="#" className="history-item">
            예전 대화 기록 3
          </a>
          <a href="#" className="history-item">
            예전 대화 기록 4
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
  );
};
