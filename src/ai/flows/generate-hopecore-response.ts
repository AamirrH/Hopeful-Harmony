'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating hopecore responses based on user mood input.
 *
 * The flow takes a mood description as input and returns an AI-generated hopecore quote or message.
 * - generateHopecoreResponse - A function that generates a hopecore response based on the user's mood.
 * - GenerateHopecoreResponseInput - The input type for the generateHopecoreResponse function.
 * - GenerateHopecoreResponseOutput - The return type for the generateHopecoreResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHopecoreResponseInputSchema = z.object({
  mood: z.string().describe("The user's current mood or feeling."),
  name: z.string().describe("The user's name."),
  interests: z.string().describe("The user's interests."),
  dreams: z.string().describe("The user's dreams."),
  goals: z.string().describe("The user's goals."),
  strengths: z.string().describe("The user's strengths."),
  weaknesses: z.string().describe("The user's weaknesses."),
});
export type GenerateHopecoreResponseInput = z.infer<typeof GenerateHopecoreResponseInputSchema>;

const GenerateHopecoreResponseOutputSchema = z.object({
  response: z.string().describe('The AI-generated hopecore quote or message.'),
});
export type GenerateHopecoreResponseOutput = z.infer<typeof GenerateHopecoreResponseOutputSchema>;

export async function generateHopecoreResponse(input: GenerateHopecoreResponseInput): Promise<GenerateHopecoreResponseOutput> {
  return generateHopecoreResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHopecoreResponsePrompt',
  input: {schema: GenerateHopecoreResponseInputSchema},
  output: {schema: GenerateHopecoreResponseOutputSchema},
  prompt: `You are a hopecore AI assistant designed to provide uplifting and supportive messages. Your goal is to respond as humanly as possible.

  Here is some information about the user:
  - Name: {{{name}}}
  - Interests: {{{interests}}}
  - Dreams: {{{dreams}}}
  - Goals: {{{goals}}}
  - Strengths: {{{strengths}}}
  - Weaknesses: {{{weaknesses}}}

  Based on the user's mood, generate a hopecore quote or message that offers encouragement and support.
  You can compare their struggles or journey with fictional characters from anime, popular TV shows, movies, or books to make the response more relatable and inspiring, especially drawing from their stated interests and goals.
  Acknowledge their strengths and weaknesses when crafting the message to make it deeply personal.

  Mood: {{{mood}}}

  Response:`,
});

const generateHopecoreResponseFlow = ai.defineFlow(
  {
    name: 'generateHopecoreResponseFlow',
    inputSchema: GenerateHopecoreResponseInputSchema,
    outputSchema: GenerateHopecoreResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
