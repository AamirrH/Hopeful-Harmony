'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function WelcomePage() {
  const [name, setName] = useState('');
  const [interests, setInterests] = useState('');
  const [dreams, setDreams] = useState('');
  const [goals, setGoals] = useState('');
  const [strengths, setStrengths] = useState('');
  const [weaknesses, setWeaknesses] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && interests.trim()) {
      localStorage.setItem('userName', name.trim());
      localStorage.setItem('userInterests', interests.trim());
      localStorage.setItem('userDreams', dreams.trim());
      localStorage.setItem('userGoals', goals.trim());
      localStorage.setItem('userStrengths', strengths.trim());
      localStorage.setItem('userWeaknesses', weaknesses.trim());
      router.push('/chat');
    }
  };

  const isFormValid = () => {
    return name.trim() && interests.trim() && dreams.trim() && goals.trim() && strengths.trim() && weaknesses.trim();
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <Card className="w-full max-w-lg bg-gradient-to-b from-white/60 to-primary/5 border border-primary/15 shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-center">Welcome!</CardTitle>
          <CardDescription className="text-center text-lg text-muted-foreground pt-1">
            Let's get to know you a little better.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">What should I call you?</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-background/80 h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests" className="text-base">What are your interests?</Label>
              <Textarea
                id="interests"
                placeholder="e.g., Anime, sci-fi movies, fantasy books..."
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                required
                className="bg-background/80 text-base"
              />
               <p className="text-sm text-muted-foreground">
                This helps me make our conversation more personal.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dreams" className="text-base">What are your dreams for the future?</Label>
              <Textarea
                id="dreams"
                placeholder="e.g., Travel the world, write a book..."
                value={dreams}
                onChange={(e) => setDreams(e.target.value)}
                required
                className="bg-background/80 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goals" className="text-base">What are some goals you're working on?</Label>
              <Textarea
                id="goals"
                placeholder="e.g., Learning a new skill, getting a promotion..."
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                required
                className="bg-background/80 text-base"
              />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="strengths" className="text-base">What are your greatest strengths?</Label>
                  <Textarea
                    id="strengths"
                    placeholder="e.g., Creative, determined, empathetic..."
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                    required
                    className="bg-background/80 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weaknesses" className="text-base">What are some weaknesses you're working on?</Label>
                  <Textarea
                    id="weaknesses"
                    placeholder="e.g., Procrastination, public speaking..."
                    value={weaknesses}
                    onChange={(e) => setWeaknesses(e.target.value)}
                    required
                    className="bg-background/80 text-base"
                  />
                </div>
              </div>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full font-semibold text-lg"
              disabled={!isFormValid()}
            >
              Start Chatting
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
