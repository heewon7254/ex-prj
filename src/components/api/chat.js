export const sendChat = async (
  files,
  message,
  history,
  room_id = "1",
  user_id = "test_user",
  session_id = "user_1755047917647_1758266384487"
) => {
  try {
    const res = await fetch("https://ui.datastreams.co.kr:20443/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-Key": "z3JE1M8huXmNux6y",
      },
      body: JSON.stringify({
        file_ids: files,
        message,
        history,
        room_id,
        user_id,
        session_id,
      }),
    });

    return res.json();
  } catch (err) {
    console.log(err);
    // 테스트용 데이터 주는 응답부
    return {
      data: {
        content: {
          response: {
            data: {
              content: {
                think:
                  "\nOkay, I need to answer the user's question about the restricted industries for corporate card usage based on the provided documents. Let me start by reviewing the relevant sources.\n\nFirst, Source 1, the 회계관리예규, has Article 58 which lists several restricted industries. These include entertainment, hygiene, leisure, gambling, and other specific sectors. It also mentions that the CEO can add more restrictions if needed.",
                response:
                  "\n\n법인카드 사용이 제한되는 업종 및 관련 규정은 다음과 같습니다:\n\n### 1. **제한 업종 범위**  \n#### 회계관리예규 제58조에 따르면, 법인카드는 **클린카드 기능**이 적용된 카드여야 하며, 다음 업종은 사용이 제한됩니다:",
                metadata: {
                  response_time_ms: 28651,
                  model_version: "0.5.6",
                  search_time_ms: 2214,
                  tokens_used: 1564,
                  confidence_score: 0.0,
                },
                sources: [
                  {
                    filename: "건설유지보수작업용 카드 발급 및 심사",
                    document_type: null,
                    page: null,
                    section: "### 2.2. 발급 및 관리기준",
                    content_preview: "### 2.2. 발급 및 관리기준",
                    relevance_score: 0.0504150390625,
                    document_id: "786c1e59-f50a-490b-b894-5e94936b2b2c",
                    download_url: "/v1/file/public/208c609f11feb52b/download",
                    last_updated: null,
                    classification: null,
                    department: null,
                    approval_status: null,
                  },
                ],
                suggested_questions: [],
                success: true,
                error: null,
                session_id: "50C6B97797E5119AD8768BDE50504DA4",
              },
              type: "final",
            },
          },
          sources: [],
          metadata: {
            response_time_ms: 0,
            model_version: "fallback",
            tokens_used: 0,
            confidence_score: 0.0,
          },
        },
      },
    };
  }
};
