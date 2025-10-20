import React, { useState } from "react";
import Button from "../../common/Button/Button";

import { DetailArrowIcon } from "../../../assets/components/button/detailArrowIcon";

const Message = ({ type, title, icon, children, toggleable = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const SvgIcon = icon;
  const renderSvgIcon = () => {
    if (!SvgIcon) return null;

    const iconProps = {
      className: "button-icon-svg",
      iconcolor: "currentColor",
    };

    // 컴포넌트 (함수 or 클래스)
    if (typeof SvgIcon === "function") {
      return <SvgIcon {...iconProps} />;
    }

    // 리액트 엘리먼트
    if (React.isValidElement(SvgIcon)) {
      return React.cloneElement(SvgIcon, { ...iconProps, ...SvgIcon.props });
    }

    return null;
  };

  return (
    <div className={`message__content_box ${type}`}>
      {/* title 있을 때만 보이게 수정 */}
      {title && (
        <div className="message__content_header">
          <div className="message__content_header_title">
            <span className="icon">{SvgIcon && renderSvgIcon()}</span>
            <span>{title}</span>
          </div>
          {toggleable && (
            <Button
              type="button"
              label={isOpen ? "숨기기" : "상세보기"}
              className={`thinking-toggle-btn ${isOpen ? "rotate" : ""}`}
              iconComponent={<DetailArrowIcon />}
              iconPosition="right"
              onClick={() => setIsOpen(prev => !prev)}
            />
          )}
        </div>
      )}
      <div
        className={`message__content_body ${type}-content ${
          toggleable ? (isOpen ? "active" : "") : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Message;
