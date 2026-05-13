'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, CheckCircle2, Phone, Calendar, ClipboardList } from 'lucide-react';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  type?: 'text' | 'menu';
  options?: { id: string; label: string; action: string }[];
};

const MENU_OPTIONS = [
  { id: 'opt1', label: '📞 Phone Number', action: 'phone' },
  { id: 'opt2', label: '📅 Appointment Booking', action: 'appointment' },
  { id: 'opt3', label: '✍️ Sign me up', action: 'signup' },
  { id: 'opt4', label: '💬 Send a Message/Query', action: 'query' },
];

export const ChatbotFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentFlow, setCurrentFlow] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!isOpen) return;

      const target = event.target as Node;

      // Don't close if clicking the toggle button or inside the chat window
      if (buttonRef.current?.contains(target) || chatRef.current?.contains(target)) {
        return;
      }

      setIsOpen(false);
    };

    // Small delay to ensure the click that opens the chat doesn't immediately close it
    const timeoutId = setTimeout(() => {
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Initial Menu
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: 'Hi there! 👋 Welcome to FlozenAI. How can we help you today?',
        },
        {
          id: '2',
          sender: 'bot',
          text: 'Please select an option below:',
          type: 'menu',
          options: MENU_OPTIONS,
        },
      ]);
    }
  }, [messages.length]);

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'user', text }]);
  };

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'bot', text }]);
  };

  const showMainMenu = (introText: string = 'Is there anything else I can help you with?') => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + 'r1', sender: 'bot', text: introText },
        {
          id: Date.now().toString() + 'r2',
          sender: 'bot',
          text: 'Select an option:',
          type: 'menu',
          options: MENU_OPTIONS,
        },
      ]);
    }, 1000);
  };

  const submitToResend = async (data: Record<string, string>, subject: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, subject }),
      });

      if (response.ok) {
        addBotMessage('✅ Successfully submitted! Our team will contact you very soon.');
        showMainMenu();
      } else {
        addBotMessage('❌ Oops, something went wrong with the submission. Please try again later.');
        showMainMenu('Would you like to try another option?');
      }
    } catch (error) {
      addBotMessage('❌ Failed to submit due to a network error.');
      showMainMenu();
    } finally {
      setIsSubmitting(false);
      setCurrentFlow(null);
    }
  };

  const handleMenuClick = (action: string, label: string) => {
    addUserMessage(label);

    if (action === 'phone') {
      setTimeout(() => {
        addBotMessage('You can reach our direct WhatsApp line at: +92 302 7421230');
        showMainMenu();
        setCurrentFlow(null);
      }, 500);
    } else if (action === 'appointment') {
      setTimeout(() => {
        addBotMessage('Great! Let\'s book an appointment. What is your preferred Date and Time?');
        setCurrentFlow('appointment');
        setFlowStep(1);
      }, 500);
    } else if (action === 'signup') {
      setTimeout(() => {
        addBotMessage('Awesome! Let\'s get you signed up. What is your full name?');
        setCurrentFlow('signup');
        setFlowStep(1);
      }, 500);
    } else if (action === 'query') {
      setTimeout(() => {
        addBotMessage('Sure! Please type your question or message below:');
        setCurrentFlow('query');
        setFlowStep(1);
      }, 500);
    }
  };

  const handleUserInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    addUserMessage(text);
    setInputValue('');

    // Handle Active Flows
    if (currentFlow === 'signup') {
      handleSignupFlow(text);
    } else if (currentFlow === 'appointment') {
      handleAppointmentFlow(text);
    } else if (currentFlow === 'query') {
      handleQueryFlow(text);
    } else {
      // General fallback if typing randomly
      setTimeout(() => {
        addBotMessage("I'm just a simple bot guiding you through our menu. Please use the options provided earlier!");
      }, 500);
    }
  };

  const handleSignupFlow = (text: string) => {
    if (flowStep === 1) {
      setFormData({ ...formData, Name: text });
      setTimeout(() => {
        addBotMessage(`Nice to meet you, ${text}! What is your email address?`);
        setFlowStep(2);
      }, 500);
    } else if (flowStep === 2) {
      setFormData({ ...formData, Email: text });
      setTimeout(() => {
        addBotMessage('Got it! And what is your phone number?');
        setFlowStep(3);
      }, 500);
    } else if (flowStep === 3) {
      const finalData = { ...formData, Phone: text, RequestType: 'Sign Up' };
      setFormData(finalData);
      setTimeout(() => {
        addBotMessage('Thanks! Submitting your details...');
        submitToResend(finalData, 'New Sign Up from Chatbot');
      }, 500);
    }
  };

  const handleAppointmentFlow = (text: string) => {
    if (flowStep === 1) {
      setFormData({ ...formData, PreferredDateTime: text });
      setTimeout(() => {
        addBotMessage('Perfect. What is your full name?');
        setFlowStep(2);
      }, 500);
    } else if (flowStep === 2) {
      setFormData({ ...formData, Name: text });
      setTimeout(() => {
        addBotMessage('Great! What is your email address? (We will send a confirmation here)');
        setFlowStep(3);
      }, 500);
    } else if (flowStep === 3) {
      setFormData({ ...formData, Email: text });
      setTimeout(() => {
        addBotMessage('And finally, your WhatsApp/Phone number?');
        setFlowStep(4);
      }, 500);
    } else if (flowStep === 4) {
      const finalData = { ...formData, Phone: text, RequestType: 'Appointment Booking' };
      setFormData(finalData);
      setTimeout(() => {
        addBotMessage('Submitting your appointment request...');
        submitToResend(finalData, 'New Appointment Request from Chatbot');
      }, 500);
    }
  };

  const handleQueryFlow = (text: string) => {
    if (flowStep === 1) {
      setFormData({ ...formData, Message: text });
      setTimeout(() => {
        addBotMessage('Thanks! What is your name?');
        setFlowStep(2);
      }, 500);
    } else if (flowStep === 2) {
      setFormData({ ...formData, Name: text });
      setTimeout(() => {
        addBotMessage('And your email address so the admin can reply to you?');
        setFlowStep(3);
      }, 500);
    } else if (flowStep === 3) {
      const finalData = { ...formData, Email: text, RequestType: 'General Inquiry' };
      setFormData(finalData);
      setTimeout(() => {
        addBotMessage('Sending your query to our team...');
        submitToResend(finalData, 'New General Inquiry from Chatbot');
      }, 500);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-3 z-50 w-[280px] max-h-[60vh] sm:bottom-24 sm:right-6 sm:w-[350px] sm:max-h-[500px] bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[var(--color-surface-2)] border-b border-[var(--color-border)] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-live)]/10 flex items-center justify-center">
                  <Bot size={18} className="text-[var(--color-live)]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[var(--color-text-primary)]">FlozenAI Assistant</h3>
                  <p className="text-[12px] text-[var(--color-live)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-live)] animate-pulse" /> Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px] bg-[var(--color-void)] custom-scrollbar"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${msg.sender === 'user' ? 'bg-[var(--color-live)] text-[#000] rounded-2xl rounded-tr-sm px-4 py-2' : ''}`}>

                    {msg.sender === 'bot' && (
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-[var(--color-surface-2)] flex shrink-0 items-center justify-center border border-[var(--color-border)] mt-1">
                          <Bot size={12} className="text-[var(--color-text-primary)]" />
                        </div>
                        <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl rounded-tl-sm px-4 py-2 text-[14px] text-[var(--color-text-primary)]">
                          {msg.text}

                          {/* Render Menu Options if exists */}
                          {msg.type === 'menu' && msg.options && (
                            <div className="mt-3 flex flex-col gap-2">
                              {msg.options.map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => handleMenuClick(opt.action, opt.label)}
                                  disabled={currentFlow !== null}
                                  className="text-left px-3 py-2 text-[13px] rounded-lg border border-[var(--color-border-strong)] hover:border-[var(--color-live)] hover:bg-[var(--color-live)]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {msg.sender === 'user' && (
                      <p className="text-[14px] font-medium">{msg.text}</p>
                    )}

                  </div>
                </div>
              ))}
              {isSubmitting && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-surface-2)] flex shrink-0 items-center justify-center border border-[var(--color-border)] mt-1">
                      <Bot size={12} className="text-[var(--color-text-primary)]" />
                    </div>
                    <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-[var(--color-text-muted)] rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-[var(--color-text-muted)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-1.5 h-1.5 bg-[var(--color-text-muted)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[var(--color-surface-2)] border-t border-[var(--color-border)]">
              <form onSubmit={handleUserInput} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your answer..."
                  disabled={currentFlow === null || isSubmitting}
                  className="flex-1 bg-[var(--color-void)] border border-[var(--color-border-strong)] rounded-full px-4 py-2 text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-live)] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isSubmitting}
                  className="w-10 h-10 rounded-full bg-[var(--color-live)] flex items-center justify-center text-[#000] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.div
        ref={buttonRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' as const, stiffness: 200, damping: 20 }}
        className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-[var(--color-surface-3)] text-[var(--color-text-primary)]' : 'bg-[var(--color-live)] text-[#000] shadow-[0_0_20px_rgba(0,229,160,0.3)]'
            }`}
          aria-label="Toggle Chat"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}

          {/* Ping Animation Indicator when closed */}
          {!isOpen && <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-[var(--color-live)] opacity-40 -z-10" />}
        </button>
      </motion.div>
    </>
  );
};
