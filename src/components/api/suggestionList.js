export const suggestionList = async () => {
  const res = await fetch("/api/suggestionList");
  if (!res.ok) throw new Error("추천질문 목록 가져오기 실패");
  return await res.json();
};
