import { useEffect, useRef, useState } from "react";

import { MessageCircle, Minimize2, Send, X } from "lucide-react";

import { OrderChatProps } from "@/app/[locale]/(main)/dashboard/client/_modal/_type/chatbox";
import { useUser } from "@/hooks/use-user";

import {
  useOrderMessages,
  useSendOrderMessage,
} from "../_hooks/use-order-messages";

const OrderChat = ({
  orderId,
  client_order_id,
  isOpen,
  onClose,
}: OrderChatProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const { user } = useUser();
  const email = user?.email ?? null;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data: messages = [] } = useOrderMessages(
    orderId,
    isOpen && !isMinimized,
  );
  const sendMessageMutation = useSendOrderMessage(orderId, email);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen || isMinimized) return;

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    const trimmed = inputMessage.trim();
    if (!trimmed) return;

    setInputMessage("");
    sendMessageMutation.mutate(trimmed);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`w-[380px] flex flex-col rounded-xl shadow-2xl transition-all
        bg-muted
        ${isMinimized ? "h-14" : "h-[500px]"}`}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 cursor-pointer
          bg-muted  rounded-t-xl dark:bg-gray-800"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center gap-2 ">
            <MessageCircle className="h-5 w-5" />
            <div>
              <p className="text-sm font-semibold ">Order Chat</p>
              <p className="text-xs opacity-80">#{client_order_id}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
              className="p-1 hover:bg-white/20 rounded"
            >
              <Minimize2 size={16} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1 hover:bg-white/20 rounded"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4
              bg-gray-50 dark:bg-gray-900"
            >
              {messages.map((message) => {
                const isMine = message.sender_email === email;

                return (
                  <div
                    key={message.id}
                    className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm
                      ${
                        isMine
                          ? "bg-black text-white  dark:bg-gray-800 dark:text-white  rounded-br-md"
                          : "bg-white dark:bg-white text-gray-800 dark:text-dark border dark:border-gray-700 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm break-words">{message.message}</p>

                      <div
                        className={`mt-1 text-[11px] flex gap-1
                        ${
                          isMine
                            ? "justify-end text-white/70"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <span className="truncate max-w-[120px]">
                          {message.sender_email}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(message.created_at).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div
              className="px-4 py-2 text-xs border-t
              bg-gray-100 dark:bg-gray-800
              text-gray-600 dark:text-gray-300"
            >
              Chatting as <span className="font-semibold">{email}</span>
            </div>

            <div
              className="p-3 border-t
              bg-white dark:bg-gray-900 rounded-b-xl"
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 rounded-lg border
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                  border-gray-300 dark:border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-3 py-2 rounded-lg bg-gray-800 text-white
                  hover:opacity-90 disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderChat;
