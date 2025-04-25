"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Bot, User, Loader2 } from "lucide-react"

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string; timestamp: Date }>>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response from server');
      }

      const assistantMessage = {
        role: "assistant",
        content: data.answer,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: "assistant",
        content: error instanceof Error ? error.message : "I'm sorry, I encountered an error while processing your request. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="container px-4 md:px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-900">DR Research Assistant</h1>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
            Ask questions about diabetic retinopathy, get help with research, or learn about vessel mapping.
          </p>
        </div>

        <Card className="border-blue-100">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-700" />
              Chat with DR Assistant
            </CardTitle>
            <CardDescription>
              Ask questions about diabetic retinopathy research, diagnosis, or treatment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[400px] overflow-y-auto border rounded-md p-4 bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700">DR</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "user" ? "bg-blue-700 text-white" : "bg-white border shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-200">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 mb-4 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-700">DR</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-white border shadow-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type your question here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-700 hover:bg-blue-800"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
