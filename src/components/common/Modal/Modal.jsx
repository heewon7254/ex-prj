import { useEffect, useCallback, useRef, useState } from "react";
import Button from "../Button/Button";
import { ModalCloseIcon } from "../../../assets/components/modal/ModalCloseIcon";
import { useModalStore } from "../../store/modalStore";

import "./modal.scss";

const Modal = ({ className, title, children, onCancel, footerButtons = [] }) => {
  const modalRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState(null); // null이면 중앙 정렬
  const [modalIndex, setModalIndex] = useState(0);
  const { getOpenModalCount, getNextZIndex } = useModalStore.getState();
  const [zIndex, setZIndex] = useState(1000);

  // 초기 위치 및 z-index 설정
  useEffect(() => {
    const index = getOpenModalCount() - 1;
    setModalIndex(index);

    const nextZ = getNextZIndex();
    setZIndex(nextZ); // z-index 상태 추가

    if (index === 0) {
      setModalPosition(null);
    } else {
      const offsetX = 50 * index;
      const offsetY = 20 * index;
      const baseX = window.innerWidth / 2 - 295;
      const baseY = window.innerHeight / 2 - 200;
      setModalPosition({ x: baseX + offsetX, y: baseY + offsetY });
    }
  }, []);

  // ESC 키 닫기
  const handleKeyDown = useCallback(
    e => {
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

  // overlay 배경 클릭 닫기
  const handleOverlayClick = e => {
    if (e.target.classList.contains("modal")) {
      //onCancel?.(); // 드래그 있는 경우는 보통 꺼두심
    }
  };

  // 드래그 시작
  const handleMouseDown = e => {
    if (e.target.closest(".modal-header")) {
      setIsDragging(true);
      const rect = modalRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // 드래그 중
  const handleMouseMove = e => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setModalPosition({ x: newX, y: newY });
    }
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  // 포커스 트랩
  // 여러 개 모달 띄울 수 있고, 젤 위에 모달 닫힌 뒤, 다음 모달로 포커스 이동
  // 이전 포커스 기억해서, 모달 닫히고 나면 이전 포커스로 이동 구현
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ];
    const focusableEls = modal.querySelectorAll(focusableSelectors.join(","));
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    // 모달 열리면 첫 요소로 포커스 이동
    firstEl?.focus();

    const trapFocus = e => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    modal.addEventListener("keydown", trapFocus);
    return () => modal.removeEventListener("keydown", trapFocus);
  }, []);

  return (
    <div className={`modal ${className}`} onMouseDown={handleOverlayClick}>
      <div
        role="dialog"
        className="modal-box"
        aria-modal="true"
        ref={modalRef}
        onMouseDown={handleMouseDown}
        style={{
          position: "fixed",
          left: modalPosition ? modalPosition.x : "50%",
          top: modalPosition ? modalPosition.y : "50%",
          transform: modalPosition ? "none" : "translate(-50%, -50%)",
          zIndex: zIndex,
        }}
      >
        <button className="modal-close" onClick={onCancel} tabIndex={0} aria-label="모달창 닫기">
          <ModalCloseIcon />
        </button>

        {title && (
          <div className="modal-header">
            <p className="modal-header-title" id="modal-title">
              {title}
            </p>
          </div>
        )}

        <div className="modal-content">
          <div className="modal-content-inn">{children}</div>
        </div>

        {footerButtons.length > 0 && (
          <div className="modal-footer">
            <div className="flex-end">
              {footerButtons.map((btn, idx) => (
                <Button
                  key={idx}
                  className={btn.className || ""}
                  onClick={btn.onClick}
                  label={btn.label}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
