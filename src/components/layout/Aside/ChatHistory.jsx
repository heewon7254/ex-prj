import { useState } from "react";
import Button from "../../common/Button/Button";
import { MoreButtonIcon } from "../../../assets/components/aside/MoreButtonIcon";
import { DeleteChatIcon } from "../../../assets/components/aside/DeleteChatIcon";

const ChatHistory = () => {
  const [historyItemMenuOpen, setHistoryItemMenuOpen] = useState(false);

  return (
    <div className="history-list">
      <div className="history-title">이전 대화</div>
      <div className={`history-item ${historyItemMenuOpen ? "active" : ""}`}>
        <a href="#" className="history-item-link">
          이전 대화 기록 1 말줄임테스트말줄임테스트말줄임테스트말줄임테스트말줄임테스트말줄임테스트
        </a>
        <Button
          iconComponent={MoreButtonIcon}
          className="history-item__more-btn"
          onClick={() => setHistoryItemMenuOpen(true)}
        />
        <div
          className="history-item__menu"
          style={{ display: historyItemMenuOpen ? "block" : "none" }}
        >
          <Button
            iconComponent={DeleteChatIcon}
            className="history-item__menu-btn delete-btn"
            label="삭제"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
