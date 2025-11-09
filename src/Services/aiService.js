// src/Services/aiService.js

// ✅ PASTE YOUR OPENROUTER KEY HERE (not the DeepSeek key)
const OPENROUTER_API_KEY = "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";

export const generateResponse = async (messages) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,  // ✅ required by OpenRouter
        "X-Title": "Toyota Advisor"              // ✅ identifies your app
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages,
        temperature: 0.65,
        top_p: 0.9,
        frequency_penalty: 0.2,
        presence_penalty: 0.2,
        max_tokens: 400
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    return reply ?? "Can you rephrase that?";
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    return "I'm having trouble connecting to the Toyota advisor. Try again in a moment.";
  }
};

// ✅ Strong advisor behavior stays the same
export const createSystemPrompt = () => ({
  role: "system",
  content: `
You are ToyotaBot, a professional Toyota dealership advisor.

STYLE
- Clear, short answers (2–4 sentences).
- No emojis, no hype.
- Use <b>bold</b> for model names.

BEHAVIOR
- Understand typos and infer intent.
- Always ask ONE follow-up at a time.
- Gather: purpose → budget → seats → fuel → body style → driving mix.
- Recommend max 1–3 Toyota models.

EXAMPLE
User: "commtue"
Bot: "Understood — daily commuting. What's your budget range?"
`
});
