'use client';

import { useState, useRef, useEffect, useTransition, FormEvent } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateHopecoreResponse } from '@/ai/flows/generate-hopecore-response';
import type { GenerateHopecoreResponseOutput } from '@/ai/flows/generate-hopecore-response';
import { Loader2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: number;
  sender: 'user' | 'bot';
  text: string;
};

const moodOptions = [
  { name: 'Hopeful', emoji: '🌤️', mood: 'hopeful' },
  { name: 'Peaceful', emoji: '🍃', mood: 'peaceful' },
  { name: 'Low', emoji: '🌧️', mood: 'sad' },
  { name: 'Focused', emoji: '🔥', mood: 'focused' },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: '“Every feeling you have is a signpost — pay attention, it will guide you.”',
    },
  ]);
  const [inputValue, setInputValue] =useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isAnimating, setIsAnimating] = useState(false);

  const { toast } = useToast();
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isPending]);

  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood);
    setInputValue(mood);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentInput = inputValue.trim();
    if (!currentInput || isPending) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: currentInput,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setSelectedMood(null);

    startTransition(async () => {
      try {
        const result: GenerateHopecoreResponseOutput = await generateHopecoreResponse({ mood: currentInput });
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: 'bot',
          text: result.response,
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('AI response error:', error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem getting a response. Please try again.',
        });
        setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
      }
    });
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-8 p-4 sm:p-8">
      <Card
        className={cn(
          'w-full max-w-2xl text-center bg-gradient-to-b from-white/60 to-primary/5 border border-primary/15 shadow-xl transition-transform duration-300',
          isAnimating && 'animate-flashcard-pop'
        )}
      >
        <CardHeader>
          <h1 className="font-headline text-3xl md:text-4xl text-foreground">How are you feeling right now?</h1>
          <p className="text-lg text-muted-foreground pt-1">Select a mood or type how you feel.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {moodOptions.map(({ name, emoji, mood }) => (
                <Button
                  key={mood}
                  type="button"
                  variant="outline"
                  onClick={() => handleMoodClick(name)}
                  className={cn(
                    'rounded-full border-2 transition-all duration-200 ease-in-out h-auto px-4 py-2 text-base',
                    {
                      'bg-primary/10 border-primary/20 hover:bg-primary/20': mood === 'hopeful',
                      'bg-accent/20 border-accent/30 hover:bg-accent/30': mood === 'peaceful',
                      'bg-mood-sad/20 border-mood-sad/30 hover:bg-mood-sad/30 text-blue-900 dark:text-blue-200': mood === 'sad',
                      'bg-mood-focus/20 border-mood-focus/30 hover:bg-mood-focus/30 text-orange-900 dark:text-orange-200': mood === 'focused',
                    },
                    selectedMood === name &&
                      cn('scale-105 ring-2 shadow-lg', {
                        'ring-primary border-primary': mood === 'hopeful',
                        'ring-accent border-accent': mood === 'peaceful',
                        'ring-mood-sad border-mood-sad': mood === 'sad',
                        'ring-mood-focus border-mood-focus': mood === 'focused',
                      })
                  )}
                >
                  {name} {emoji}
                </Button>
              ))}
            </div>

            <Input
              type="text"
              id="userInput"
              placeholder="Or type your feeling here..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (selectedMood) setSelectedMood(null);
              }}
              className="bg-background/80 focus:border-primary focus:shadow-lg focus:shadow-primary/20 text-center text-base h-12"
            />

            <Button
              type="submit"
              disabled={isPending || !inputValue.trim()}
              size="lg"
              className="w-full rounded-full font-semibold text-lg tracking-wide bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200 ease-in-out"
            >
              {isPending ? <Loader2 className="animate-spin" /> : <Send />}
              Send
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl bg-gradient-to-b from-white/60 to-primary/5 border border-primary/15 shadow-xl">
        <CardContent className="p-4">
          <div ref={chatBoxRef} className="flex h-64 flex-col gap-4 overflow-y-auto p-2 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'max-w-[85%] rounded-2xl p-4 text-left shadow-md animate-in fade-in-50 slide-in-from-bottom-5 duration-500',
                  msg.sender === 'user'
                    ? 'self-end rounded-br-none bg-secondary text-secondary-foreground'
                    : 'self-start rounded-bl-none bg-card'
                )}
              >
                {msg.sender === 'bot' ? (
                  <p className="font-headline text-lg italic leading-relaxed text-foreground border-l-4 border-primary pl-4 bg-gradient-to-r from-primary/10 to-transparent">
                    {msg.text}
                  </p>
                ) : (
                  <p className="text-base">{msg.text}</p>
                )}
              </div>
            ))}
            {isPending && (
              <div className="self-start flex items-center gap-2 animate-in fade-in-50">
                <div className="p-4 rounded-2xl bg-card shadow-md">
                  <Loader2 className="animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
