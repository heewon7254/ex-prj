import React from "react";
import './linkButton.scss';

/**
 * LinkButton
 * a 태그 기반 버튼 컴포넌트
 * 기존 Button.jsx 구조 대부분 재사용
 * 변경/추가 props:
 *  - href: 이동할 URL (필수는 아니지만 a 태그용)
 *  - target: 새 탭 열기 등
 *  - onClick: 추가 클릭 이벤트 가능 (JS 이동 포함)
 *  - titleLabel: title 속성
 */
const LinkButton = (props) => {
  let {
    href = "#",           // a 태그 기본 href
    target,               // 새 탭 등 열기
    children,
    className,
    style,
    label,
    defaultClass = "",
    iconPosition = "left",
    iconColor,
    iconComponent,
    titleLabel,
    onClick,              // 클릭 시 추가 기능
  } = props;

  className = className || defaultClass;

  const SvgIcon = iconComponent;

  const renderSvgIcon = () => {
    if (!SvgIcon) return null;

    const iconProps = {
      className: "button-icon-svg",
      iconColor: iconColor || "currentColor",
    };

    // case 1: 함수 컴포넌트
    if (typeof SvgIcon === "function") {
      return <SvgIcon {...iconProps} />;
    }

    // case 2: 이미 React Element로 전달된 경우
    if (React.isValidElement(SvgIcon)) {
      return React.cloneElement(SvgIcon, { ...iconProps, ...SvgIcon.props });
    }

    return null;
  };

  // 클릭 시 JS로 이동 가능 (target 없으면 기본 a 동작 막고 window.location.href 사용)
  const handleClick = (e) => {
    if (onClick) onClick(e); // 추가 클릭 이벤트
    if (!target) e.preventDefault(); // target 없으면 기본 링크 막음
    if (href && !target) window.location.href = href; // JS 이동
  };

  return (
    <a
      href={href}                          // a 태그 필수 속성
      target={target}                      // 새 탭 등
      title={titleLabel}                   // 툴팁용 title
      className={`ds-button ${className ? " " + className : ""}`}
      style={style}
      onClick={handleClick}                // JS 이동/추가 클릭 기능
    >
      <p className="button-inner">
        {SvgIcon && iconPosition === "left" && renderSvgIcon()}
        {children ? children : label && <span className="button-label">{label}</span>}
        {SvgIcon && iconPosition === "right" && renderSvgIcon()}
      </p>
    </a>
  );
};

export default LinkButton;
