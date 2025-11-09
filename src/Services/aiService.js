// src/Services/aiService.js

import { reviews } from '../data/reviews';

// ✅ API key loaded from environment variable
const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

// Helper function to get reviews for mentioned models
const getRelevantReviews = (messages) => {
  const recentMessages = messages.slice(-5).map(m => m.content?.toLowerCase() || '');
  const conversationText = recentMessages.join(' ');
  
  const relevantReviews = reviews.filter(review => 
    conversationText.includes(review.model.toLowerCase())
  );
  
  if (relevantReviews.length === 0) return '';
  
  const reviewsSummary = relevantReviews.map(r => 
    `${r.model} (${r.year}): ${r.rating}/5 stars. ${r.summary} Pros: ${r.pros.join(', ')}. Cons: ${r.cons.join(', ')}.`
  ).join('\n');
  
  return `\n\nCURRENT REVIEWS:\n${reviewsSummary}`;
};

export const generateResponse = async (messages) => {
  try {
    // Add relevant reviews to the context
    const reviewContext = getRelevantReviews(messages);
    const enhancedMessages = [...messages];
    
    // If reviews are relevant, add them to the last user message context
    if (reviewContext && enhancedMessages.length > 0) {
      const lastMessage = enhancedMessages[enhancedMessages.length - 1];
      if (lastMessage.role === 'user') {
        enhancedMessages[enhancedMessages.length - 1] = {
          ...lastMessage,
          content: lastMessage.content + reviewContext
        };
      }
    }
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,  // ✅ required by OpenRouter
        "X-Title": "Toyota Advisor"              // ✅ identifies your app
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: enhancedMessages,
        temperature: 0.65,
        top_p: 0.9,
        frequency_penalty: 0.2,
        presence_penalty: 0.2,
        max_tokens: 400
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    // Remove special tokens, HTML tags, and markdown formatting
    const cleanedReply = reply
      ?.replace(/<[｜|]\s*begin[▁_]\s*of[▁_]\s*sentence\s*[｜|]>/gi, '')
      ?.replace(/<[^>]*>/g, '') // Remove HTML tags
      ?.replace(/\*\*/g, '') // Remove ** markdown bold
      ?.replace(/\*/g, '') // Remove * markdown
      ?.trim();
    return cleanedReply ?? "Can you rephrase that?";
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    return "I'm having trouble connecting to the Toyota advisor. Try again in a moment.";
  }
};

// ✅ Strong advisor behavior with review integration
export const createSystemPrompt = () => ({
  role: "system",
  content: `
You are ToyotaBot, a professional Toyota dealership advisor with access to current reviews.

STYLE
- Clear, short answers (2–4 sentences).
- No emojis, no hype.
- Use plain text only, no markdown or HTML formatting.

BEHAVIOR
- Understand typos and infer intent.
- Always ask ONE follow-up at a time.
- Gather: purpose → budget → seats → fuel → body style → driving mix.
- Recommend max 1–3 Toyota models.
- When reviews are available, incorporate insights about reliability, performance, pros/cons naturally.
- Mention ratings when relevant to help customers make informed decisions.
- IMPORTANT: Mention once early in the conversation (after first or second exchange) that you have access to expert reviews and ratings. Don't repeat this in every message.

EXAMPLE
User: "commtue"
Bot: "Understood — daily commuting. What's your budget range?"

User: "$25,000"
Bot: "Perfect. I have access to expert reviews and ratings to help you decide. How many seats do you need?"

User: "Tell me about the Camry"
Bot: "The 2024 Camry is rated 4.7/5 stars. It's spacious, reliable, and offers both powerful V6 and efficient hybrid options. Great for families. What's your budget?"
`
});
