//게시판 제목 목록
/*
PST_ID pstId
PST_SEQ pstSeq
BRD_ID brdId
BRD_NM brdNm
TITLE_NM titleNm
REG_YMD regYmd
*/
export const getNoticeList = async () => {
  const res = await fetch("/getNoticeBoardList", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to fetch Notice List");
  return await res.json();
};

//게시판 상세 내용
/*
BRD_ID brdId
PST_ID pstId
TITLE_NM titleNm
PST_CONT pstCont
REG_YMD regYmd
*/
export const getNoticeDetail = async (brdId, pstId) => {
  const res = await fetch("/getNoticeBoardList", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      brdId: brdId,
      pstId: pstId,
    }),
  });

  if (!res.ok) throw new Error("Failed to fetch Notice Detail");
  return await res.json();
};

//노출 공지사항
/*
PST_SEQ pstSeq
PST_ID pstId
BRD_ID brdId
BRD_NM brdNm
TITLE_NM titleNm
PST_CONT pstCont
REG_YMD regYmd
*/
export const getExposeNotice = async () => {
  const res = await fetch("/getExposeNotice", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) throw new Error("expose notice fetch failed");
  return await res.json();
};
