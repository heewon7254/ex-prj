import { create } from "zustand";

export const useMessageStore = create(set => ({
  messages: [], // { role: "user" | "assistant", content: string, raw?: object }

  addUserMessage: msg =>
    set(state => ({
      messages: [...state.messages, { role: "user", content: msg }],
    })),

  addAssistantMessage: chatData =>
    set(state => ({
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content: chatData.response.data.content,
          raw: chatData, // 원본 전체 저장
        },
      ],
    })),

  clearMessages: () => set({ messages: [] }),
}));
