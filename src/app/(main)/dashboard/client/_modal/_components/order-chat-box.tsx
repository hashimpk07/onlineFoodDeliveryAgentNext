"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSendMessage } from "../_hooks/use-send-message";

type Message = {
  id: number;
  type: "CLIENT_EMPLOYEE" | "support";
  message: string;
  email: string;
  date: string;
};

export default function OrderChatBox({
  orderId,
  email,
}: {
  orderId: string;
  email: string;
}) {
  const [message, setMessage] = useState("");
  const { sendMessage, loading } = useSendMessage(orderId);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "support",
      email: "sayed@4ulogistic.com",
      message: "Hello, how can I help you?",
      date: "10:30 AM",
    },
    {
      id: 2,
      type: "CLIENT_EMPLOYEE",
      email: "bonifacio@mcdonalds.com.sa",
      message: "I want to return this order.",
      date: "10:32 AM",
    },
  ]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const success = await sendMessage(message);

    if (!success) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "CLIENT_EMPLOYEE",
        message,
        email,
        date: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-xl bg-background">
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.type === "CLIENT_EMPLOYEE" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-3 py-2 text-sm border ${
                msg.type === "CLIENT_EMPLOYEE"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white text-foreground border-border shadow-sm dark:bg-muted dark:text-foreground dark:border-border"
              }`}
            >
              <p>{msg.message}</p>
              <div className="flex items-center justify-between gap-2 text-xs opacity-70">
                <span className="truncate max-w-[75%]">{msg.email}</span>
                <span className="whitespace-nowrap">{msg.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="border-t p-3 flex gap-2">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
