"use client";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ChatResponse {
  content: string;
  received: boolean;
}
export default function Chat() {
  const [data, setData] = React.useState<ChatResponse[] | null>(null);
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const user = JSON.parse(localStorage.getItem("user") || '{name: "User"}');
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [data]);

  const fetchData = async ({ text }: { text: string }) => {
    if (!text.trim() || loading) return;

    setLoading(true);
    const newMessage: ChatResponse = { content: text, received: false };
    setData((prev) => [...(prev || []), newMessage]);
    setText("");
    const token = localStorage.getItem("sessionToken");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ content: text }),
      });
      const result = await res.json();
      setData((prev) => [...(prev || []), result]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData({ text });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };
  const suggestions = [
    "Байгууллагын үнэт зүйл",
    "Дотоод журам",
    "Цалингийн задаргаа",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setText(suggestion);
    fetchData({ text: suggestion });
  };
  return (
    <div
      className={`flex flex-col gap-10 h-[calc(100vh-8rem)] no-scollbar ${
        data?.length ?? " h-[calc(100vh-8rem)] justify-center"
      } px-32`}
    >
      {/* Messages Container */}
      {data?.length ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {(data || []).map((message, index) => (
            <div
              key={index}
              className={`flex ${
                !message.received ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 flex gap-2 items-start ${
                  message.received &&
                  "bg-[#FFFFFF1A]  shadow-sm gap-2  flex-row-reverse"
                }`}
              >
                <div
                  className={`flex flex-col gap-1  ${
                    !message.received && "items-end"
                  }`}
                >
                  <div>
                    {!message.received ? (
                      <span className="font-bold text-xl">{user?.name}</span>
                    ) : (
                      <span className="bg-gradient-to-r text-xl from-[#83BCE0] to-[#CB98E5] text-transparent bg-clip-text font-bold">
                        HR
                      </span>
                    )}
                  </div>
                  {message.received ? (
                    <div
                      className="text-zinc-300"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  ) : (
                    <div className="text-zinc-300">{message.content}</div>
                  )}
                </div>
                <Image
                  src="/login/blob.png"
                  alt="Chat message"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className=" text-gray-800 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="text-center">
          <div className="text-6xl text-white font-bold">
            Таны хувийн туслах{" "}
            <span className="bg-gradient-to-r from-[#83BCE0] to-[#CB98E5] text-transparent bg-clip-text font-bold">
              HR
            </span>
          </div>
        </div>
      )}

      {/* Input Form */}
      <div>
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center mb-6"
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              autoResizeTextarea();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Танд ямар тусламж хэрэгтэй вэ?"
            className="w-full p-4 pr-24 rounded-xl border text-white border-zinc-500 bg-[#1B202F] focus:outline-none focus:border-blue-500 resize-none max-h-80 min-h-28"
            rows={4}
          />
          <button
            type="submit"
            disabled={!text.trim() || loading}
            className={`absolute right-2 bottom-2 px-2 py-2 rounded-lg transition-colors
              ${
                !text.trim() || loading
                  ? "bg-[#ffffff6a] text-gray-400"
                  : "bg-[#FFFFFF1A] text-white hover:bg-blue-600"
              }`}
          >
            <ArrowUp color="white" />
          </button>
        </form>
        <div
          className={`flex flex-wrap gap-3 justify-center ${
            data?.length && "hidden"
          }`}
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 text-sm font-medium"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
