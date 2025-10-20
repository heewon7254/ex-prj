const FormTextarea = ({ textareaRef, handleInput, textareaValue, handleSubmit }) => {
  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 줄바꿈 방지
      handleSubmit(); // 제출 함수 실행
    }
  };

  return (
    <>
      <label htmlFor="message" className="sr-only">
        메시지 입력
      </label>
      <textarea
        id="message"
        className="content__form-textarea"
        name="message"
        ref={textareaRef}
        onInput={handleInput}
        value={textareaValue}
        onKeyDown={handleKeyDown}
        placeholder="공사 업무에 대해 궁금한 점을 질문해 주세요"
        aria-label="채팅 메시지 입력창"
      />
    </>
  );
};

export default FormTextarea;
