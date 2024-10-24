import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleAction,
} from "@/components/ui/chat/chat-bubble";
import { FaMicrophone, FaMicrophoneSlash, FaVolumeHigh } from "react-icons/fa6";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { API_URL } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

function BotChat({ style, chatEndpoint }) {
  const [recordedBlob, setRecordedBlob] = useState(null);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const [isMicOn, setIsMicOn] = useState(false);
  const startRecording = async () => {
    setIsMicOn(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        setRecordedBlob(blob);
        setIsMicOn(false);
        chunks.current = [];
      };
      mediaRecorder.current.start();
      setIsMicOn(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
  };

  useEffect(() => {
    const stt = async () => {
      if (recordedBlob) {
        let formdata = new FormData();
        formdata.append("audio_file", recordedBlob);
        const requestOptions = {
          method: "POST",
          body: formdata,
        };
        const response = await fetch(
          `${API_URL}/v1/api/speech/stt/`,
          requestOptions
        );
        const res = await response.json();
        setInput(res["text"]);
      }
    };

    if (!isMicOn) {
      stt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMicOn]);

  const actionIcons = [{ icon: FaVolumeHigh, type: "Text To Speech" }];

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const response = await fetch(`${API_URL}${chatEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
        }),
      });
      const res = await response.json();
      setMessages([
        ...messages,
        {
          id: uuidv4(),
          message: res["message"],
          sender: "ai",
        },
      ]);
    };

    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage["sender"] == "human") {
      callApi();
    }
  }, [chatEndpoint, messages]);

  const sendMessage = async () => {
    setMessages([
      ...messages,
      {
        id: uuidv4(),
        message: input,
        sender: "human",
      },
    ]);
    setInput("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const playTts = async (text) => {
    const response = await fetch(`${API_URL}/v1/api/speech/tts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.audio = new Audio();
    window.audio.src = url;
    window.audio.play();
  };

  return (
    <div style={style} className="relative p-2 border rounded-md border-black">
      <ChatMessageList className="h-5/6 overflow-y-scroll">
        {messages.map((message) => {
          const variant = message.sender === "human" ? "sent" : "received";
          return (
            <ChatBubble key={message.id} variant={variant}>
              <ChatBubbleAvatar fallback={variant === "sent" ? "ME" : "AI"} />
              <div className="flex flex-col">
                <ChatBubbleMessage isLoading={message.isLoading}>
                  {message.message}
                </ChatBubbleMessage>
                {message.sender === "ai" && !message.isLoading && (
                  <div>
                    {actionIcons.map(({ icon: Icon, type }) => (
                      <ChatBubbleAction
                        className="size-6"
                        key={type}
                        icon={<Icon className="size-3" />}
                        onClick={() => playTts(message.message)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ChatBubble>
          );
        })}
      </ChatMessageList>
      <div className="absolute bottom-1 left-1 right-1 h-24 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
        <ChatInput
          placeholder="Type your message here..."
          value={input}
          className="min-h-12 rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div className="flex items-center pt-0">
          {isMicOn ? (
            <Button variant="ghost" size="icon" onClick={stopRecording}>
              <FaMicrophoneSlash className="size-4" />
              <span className="sr-only">Stop Recording</span>
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={startRecording}>
              <FaMicrophone className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>
          )}
          <Button size="sm" className="ml-auto gap-1.5" onClick={sendMessage}>
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}
BotChat.propTypes = {
  style: PropTypes.object,
  chatEndpoint: PropTypes.string,
};

export default BotChat;
