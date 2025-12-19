const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) throw new Error("GOOGLE_AI_API_KEY missing");

const MODEL = "gemini-2.5-flash"; // ⬅️ NO "models/" here

async function callGemini(prompt: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("🔥 GEMINI ERROR STATUS:", res.status);
    console.error("🔥 GEMINI ERROR BODY:", text);
    throw new Error("Gemini request failed");
  }

  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

/* ---------------- SUMMARY ---------------- */
export async function generateSummary(text: string): Promise<string> {
  return callGemini(
    `Summarize the following text in 2–3 sentences:\n\n${text}`
  );
}

/* ---------------- IMPROVE TEXT ---------------- */
export async function improveText(text: string): Promise<string> {
  return callGemini(
    `Improve the following text by fixing grammar and clarity.
Return ONLY the improved text:\n\n${text}`
  );
}

/* ---------------- GENERATE TAGS ---------------- */
export async function generateTags(text: string): Promise<string[]> {
  const result = await callGemini(
    `Generate 3–5 relevant tags.
Return ONLY comma-separated tags.\n\n${text}`
  );

  return result
    .split(",")
    .map(t => t.trim())
    .filter(Boolean)
    .slice(0, 5);
}
