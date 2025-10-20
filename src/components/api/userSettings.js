export const getUserInfo = async ({usrId}) => {
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

export const saveUserFontSize = async ({usrId, fntSizeCd}) => {
  await fetch("/api/user/setUserInfo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usrId: usrId,
      fntSizeCd: fntSizeCd 
    }),
  });
  if (!res.ok) throw new Error("Failed to save font settings");
  return await res.json();
};

export const saveUserTheme = async ({usrId, uiThmCd}) => {
  await fetch("/api/user/setUserInfo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usrId: usrId,
      uiThmCd: uiThmCd
    }),
  });
  if (!res.ok) throw new Error("Failed to save theme settings");
  return await res.json();
};
