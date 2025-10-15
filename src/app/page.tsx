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
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && interests.trim()) {
      localStorage.setItem('userName', name.trim());
      localStorage.setItem('userInterests', interests.trim());
      router.push('/chat');
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <Card className="w-full max-w-md bg-gradient-to-b from-white/60 to-primary/5 border border-primary/15 shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-center">Welcome!</CardTitle>
          <CardDescription className="text-center text-lg text-muted-foreground pt-1">
            Let's get to know you a little better.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full font-semibold text-lg"
              disabled={!name.trim() || !interests.trim()}
            >
              Start Chatting
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
