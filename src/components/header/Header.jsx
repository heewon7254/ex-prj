import { useState, useEffect } from "react";
// header
import Button from "../common/Button/Button";
import ThemeIcon from "../../assets/components/header/ThemeIcon";
import TextIcon from "../../assets/components/header/TextIcon";
import BookIcon from "../../assets/components/header/BookIcon";
import NoticeIcon from "../../assets/components/header/NoticeIcon";
import StarIcon from "../../assets/components/header/StarIcon";
import "./header.scss";

export const Header = ({}) => {
  // BUTTON label 화면 너비 작을 때 숨김 및 title 추가
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 850);

  // 리사이즈 핸들러
  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth > 850;
      setIsLargeScreen(large);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 최초 실행

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTitleLabel = (isLargeScreen, label) => {
    return isLargeScreen ? "" : label;
  };

  // 글자크기버튼
  // <button onClick={() => setFontSize(fontSize + 2)}>크게</button>
  // <button onClick={() => setFontSize(fontSize - 2)}>작게</button>

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__util-menu">
          <Button
            iconComponent={<ThemeIcon />}
            defaultClass="header__util_button"
            label="테마선택"
            titleLabel={getTitleLabel(isLargeScreen, "테마선택")}
            onClick={() =>
              setTheme((prev) => (prev === "light" ? "dark" : "light"))
            }
          />
          <Button
            iconComponent={<TextIcon />}
            defaultClass="header__util_button"
            className="text-size"
            label="글자크기"
            titleLabel={getTitleLabel(isLargeScreen, "글자크기")}
          />
          <Button
            iconComponent={<BookIcon />}
            defaultClass="header__util_button"
            label="사용법안내"
            titleLabel={getTitleLabel(isLargeScreen, "사용법안내")}
          />
          <Button
            iconComponent={<NoticeIcon />}
            defaultClass="header__util_button"
            label="공지사항"
            titleLabel={getTitleLabel(isLargeScreen, "공지사항")}
          />
          <Button
            iconComponent={<StarIcon />}
            defaultClass="header__util_button"
            label="만족도조사"
            titleLabel={getTitleLabel(isLargeScreen, "만족도조사")}
          />
        </div>
      </div>
    </header>
  );
};
