# Hopeful Harmony

Hopeful Harmony is a personalized "hopecore" AI companion designed to provide uplifting, human-like responses based on your current mood and personal background.

## 🌟 Features

- **Personalized Onboarding**: Tell the AI about your name, interests, dreams, goals, strengths, and weaknesses to shape every conversation.
- **AI Hopecore Responses**: Powered by Google Gemini via Genkit, providing empathetic support and drawing parallels between your life and fictional characters from your favorite media.
- **Mood-Based Music**: Automatic background music selection that matches your mood (Hopeful, Peaceful, Low, Focused) with smooth fade-in/fade-out transitions.
- **Modern UI**: A warm, aesthetically pleasing design built with Shadcn UI and Tailwind CSS, featuring "Playfair Display" for headlines and "PT Sans" for body text.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Engine**: [Genkit](https://firebase.google.com/docs/genkit) with Google AI (Gemini 2.5 Flash)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Google Fonts (Playfair Display, PT Sans)

## 🚀 Getting Started

1.  **Onboarding**: Start on the home page and fill out your personality profile. This information is used to give the AI context about who you are.
2.  **Mood Selection**: Choose how you're feeling on the chat page. This triggers a specific musical atmosphere.
3.  **Chat**: Share your thoughts. The AI will respond with encouragement tailored to your goals and interests.

## 📁 Key Files

- `src/app/page.tsx`: The welcome page and personality assessment.
- `src/app/chat/page.tsx`: The core chat experience and audio player.
- `src/ai/flows/generate-hopecore-response.ts`: The Genkit logic for generating personalized AI messages.
- `src/lib/music.ts`: Definition of music tracks and their corresponding moods.

