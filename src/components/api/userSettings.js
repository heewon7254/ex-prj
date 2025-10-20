export const getUserInfo = async ({ usrId }) => {
  const res = await fetch("/api/user/getUserInfo", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usrId: usrId,
    }),
  });
  if (!res.ok) throw new Error("Failed to fetch settings");
  return await res.json();
};

export const saveUserFontSize = async index => {
  try {
    const response = await fetch("/api/saveFontSize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fontSize: index }),
    });

    // 응답 json 확인
    const data = await response.json();
    console.log("저장 성공:", data);
  } catch (error) {
    console.error("저장 실패:", error);
  }
};

export const saveUserTheme = async ({ usrId, uiThmCd }) => {
  await fetch("/api/user/setUserInfo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usrId: usrId,
      uiThmCd: uiThmCd,
    }),
  });
  if (!res.ok) throw new Error("Failed to save theme settings");
  return await res.json();
};
