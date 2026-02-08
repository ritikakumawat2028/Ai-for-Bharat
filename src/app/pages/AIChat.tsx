import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { Header } from '@/app/components/Header';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Send, Mic, Bot, User, Loader2 } from 'lucide-react';
import { getAIResponse } from '@/app/utils/aiResponses';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function AIChat() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getAIResponse('hello', language),
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputMessage, language),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleVoiceInput = () => {
    // Mock voice input - in production, integrate with Web Speech API
    setIsListening(true);
    toast.info('Voice input feature - Coming soon! Use text for now.');
    
    setTimeout(() => {
      setIsListening(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="border-2 shadow-xl h-[calc(100vh-180px)] flex flex-col">
          <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-green-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{t('aiAssistant')}</CardTitle>
                <p className="text-sm text-gray-600">Always here to help you</p>
              </div>
            </div>
          </CardHeader>

          {/* Messages Container */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'ai'
                      ? 'bg-gradient-to-br from-orange-500 to-green-600'
                      : 'bg-gray-200'
                  }`}
                >
                  {message.sender === 'ai' ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.sender === 'ai'
                      ? 'bg-white border-2 border-gray-200'
                      : 'bg-gradient-to-r from-orange-500 to-green-600 text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === 'ai' ? 'text-gray-500' : 'text-white/80'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-orange-500 to-green-600">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                    <span className="text-gray-600">{t('loading')}</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="border-t p-4 bg-white">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleVoiceInput}
                disabled={isListening}
                className={isListening ? 'bg-red-100 border-red-300' : ''}
              >
                <Mic className={`w-5 h-5 ${isListening ? 'text-red-600 animate-pulse' : ''}`} />
              </Button>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('askQuestion')}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI responses are simulated. For production, integrate Gemini API or OpenAI API.
            </p>
          </div>
        </Card>

        {/* Quick Suggestions */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {[
            { text: 'Help with studies', query: 'I need help with my studies' },
            { text: 'Government schemes', query: 'Tell me about government schemes' },
            { text: 'Career guidance', query: 'I need career guidance' },
          ].map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInputMessage(suggestion.query)}
              className="text-sm"
            >
              {suggestion.text}
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
}
