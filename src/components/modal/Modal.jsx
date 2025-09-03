import { useEffect, useCallback } from "react";
import Button from "../common/Button/Button";
import { ModalCloseIcon } from "../../assets/components/modal/ModalCloseIcon";

const Modal = ({
  className,
  isOpen,
  title,
  children,
  onCancel,
  footerButtons = [],
}) => {
  // ESC 키 닫기
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onCancel?.();
      }
    },
    [onCancel]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // 오버레이 클릭 닫기
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onCancel?.();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "on" : ""} ${className}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onCancel}>
          <ModalCloseIcon />
        </button>

        {/* 모달 헤더 */}
        {title && (
          <div className="modal-header">
            <p className="modal-header-title">{title}</p>
          </div>
        )}

        {/* 모달 바디 */}
        <div className="modal-content">
          <div className="modal-content-inn">{children}</div>
        </div>

        {/* 모달 푸터 */}
        {footerButtons.length > 0 && (
          <div className="modal-footer">
            <div className="flex-end">
              {footerButtons.map((btn, idx) => (
                <Button
                  key={idx}
                  className={btn.className || ""}
                  onClick={btn.onClick}
                >
                  {btn.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

{
  /* <Modal
  isOpen={isOpen}
  title="글자 크기 선택"
  onCancel={() => setOpen(false)}
  footerButtons={[
    { label: "취소", onClick: () => setOpen(false), className: "secondary" },
    { label: "확인", onClick: handleConfirm, className: "primary" },
  ]}
>
  <Button defaultClass="font-size-button">가</Button>
  <Button defaultClass="font-size-button">가</Button>
  <Button defaultClass="font-size-button" className="active">
    가
  </Button>
  <Button defaultClass="font-size-button">가</Button>
  <Button defaultClass="font-size-button">가</Button>
</Modal>; */
}
