import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// header
import { Header } from "./components/layout/Header/Header";

// aside
import { Aside } from "./components/layout/Aside/Aside";

// content
import ToastContainer from "./components/common/Toast/ToastContainer";
import ModalManager from "./components/modals/ModalManager";
import ChatPage from "./pages/ChatPage/ChatPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
//store
import { useUserSettingsStore } from "./components/store/userSettingsStore";

function App() {
  const initSettings = useUserSettingsStore(state => state.initSettings);

  useEffect(() => {
    initSettings();
  }, []);

  // 페이지 렌더링 공통 구조
  const renderPage = mode => (
    <>
      <Header mode={mode} />
      <div className="app-container">
        <Aside mode={mode} />
        <ChatPage mode={mode} />
      </div>
      <ToastContainer />
      <ModalManager />
    </>
  );

  return (
    <>
      <Routes>
        <Route path="*" element={renderPage("default")} />
        <Route path="/govAi" element={renderPage("gov")} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
