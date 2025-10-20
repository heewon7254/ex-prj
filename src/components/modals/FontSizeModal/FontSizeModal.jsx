import { useState, useEffect } from "react";
import { useUserSettingsStore } from "../../store/userSettingsStore";

import Modal from "../../common/Modal/Modal";
import Button from "../../common/Button/Button";

import "./fontSizeModal.scss";

const FontSizeModal = ({ onCancel, onConfirm }) => {
  const updateFontSize = useUserSettingsStore(state => state.updateFontSize);
  const [selectedSize, setSelectedSize] = useState(2); // 기본값 2

  useEffect(() => {
    // localStorage에서 저장된 값 가져오기
    const stored = localStorage.getItem("exGpt-font-size");
    const num = Number(stored);

    // 숫자가 0~4 범위면 그대로, 아니면 기본값 2
    const initialIndex = !isNaN(num) && num >= 0 && num <= 4 ? num : 2;
    setSelectedSize(initialIndex);
  }, []);

  const handleConfirm = async () => {
    await updateFontSize(selectedSize); // 값 적용
    onConfirm?.(); // 확인 콜백
    onCancel?.(); // 모달 닫기
  };

  const sizes = ["가", "가", "가", "가", "가"];

  return (
    <Modal
      className="font-size-modal"
      title="글자 크기 선택"
      onCancel={onCancel}
      footerButtons={[
        { className: "secondary", label: "취소", onClick: onCancel },
        { className: "primary", label: "확인", onClick: handleConfirm },
      ]}
    >
      {sizes.map((label, idx) => (
        <Button
          key={idx}
          defaultClass="font-size-button"
          className={selectedSize === idx ? "active" : ""}
          onClick={() => setSelectedSize(idx)}
        >
          {label}
        </Button>
      ))}
    </Modal>
  );
};

export default FontSizeModal;
