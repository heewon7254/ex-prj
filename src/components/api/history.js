export const getHistoryList = async (user_id = "test_user") => {
  const res = await fetch("ui.datastreams.co.kr:20443/v1/history", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user_id,
    }),
  });

  if (!res.ok) throw new Error("Failed to fetch settings");
  return await res.json();
};

export const getDetailHistory = async (user_id = "test_user", room_id = "1") => {
  const res = await fetch("ui.datastreams.co.kr:20443/v1/detailHistory", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user_id,
      room_id: room_id,
    }),
  });

  if (!res.ok) throw new Error("Failed to fetch settings");
  return await res.json();
};
