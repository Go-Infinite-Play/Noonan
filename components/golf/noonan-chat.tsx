"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Send, MessageCircle } from "lucide-react"
import { toast } from "sonner"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface NoonanChatProps {
  className?: string
}

export function NoonanChat({ className }: NoonanChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hey there! I'm Noonan, and I actually care about your golf game! Tell me about your latest round, or just say hello!",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const messageToSend = currentMessage
    setCurrentMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat/noonan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messageToSend
        })
      })

      if (!response.ok) {
        throw new Error("Failed to get response from Noonan")
      }

      const data = await response.json()

      const noonanMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, noonanMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Couldn't reach Noonan right now. Try again!")
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Give me a moment and try again!",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className={`flex flex-col h-[600px] border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-muted/50">
        <Avatar className="h-8 w-8 bg-green-600 text-white">
          <span className="text-sm font-semibold">N</span>
        </Avatar>
        <div>
          <h3 className="font-semibold text-sm">Noonan</h3>
          <p className="text-xs text-muted-foreground">Your golf buddy who actually cares</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-start gap-2 max-w-[80%] ${message.isUser ? "flex-row-reverse" : ""}`}>
              <Avatar className={`h-6 w-6 mt-1 ${message.isUser ? "bg-blue-600" : "bg-green-600"} text-white`}>
                <span className="text-xs font-semibold">
                  {message.isUser ? "U" : "N"}
                </span>
              </Avatar>
              <div
                className={`rounded-lg px-3 py-2 text-sm ${
                  message.isUser
                    ? "bg-blue-600 text-white"
                    : "bg-muted border"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 opacity-70 ${message.isUser ? "text-blue-100" : "text-muted-foreground"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2 max-w-[80%]">
              <Avatar className="h-6 w-6 mt-1 bg-green-600 text-white">
                <span className="text-xs font-semibold">N</span>
              </Avatar>
              <div className="bg-muted border rounded-lg px-3 py-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell Noonan about your round..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={sendMessage} 
            disabled={!currentMessage.trim() || isLoading}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Share your latest round, ask for tips, or just chat about golf!
        </p>
      </div>
    </div>
  )
}