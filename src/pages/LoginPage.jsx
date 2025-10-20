import { useState } from "react";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  function getInputVal(type) {
    return function (e) {
      const value = e.target.value;
      if (type === "userId") {
        setUserId(value);
      } else if (type === "password") {
        setPassword(value);
      }
    };
  }

  function login() {
    fetch("login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
        } else {
          alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
        }
      })
      .catch(err => {
        console.error("로그인 오류:", err);
      });
  }
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={e => {
          login();
        }}
      >
        <input value={userId} onChange={getInputVal("userId")} />
        <input type="password" value={password} onChange={getInputVal("password")} />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};
export default LoginPage;
