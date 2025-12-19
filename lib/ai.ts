import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
  throw new Error("GOOGLE_AI_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Allow overriding the model via env, default to a widely-supported text model
const DEFAULT_MODEL = process.env.GOOGLE_AI_MODEL || "models/text-bison-001";

/* ---------------- SUMMARY ---------------- */
export async function generateSummary(text: string): Promise<string> {
  try {
    console.debug(`Using model ${DEFAULT_MODEL} for generateSummary`);
    const model = genAI.getGenerativeModel({
      model: DEFAULT_MODEL,
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Please provide a concise summary of the following text (2–3 sentences):\n\n${text}`,
            },
          ],
        },
      ],
    });

    return result.response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    if ((error as any)?.status) {
      console.error("status:", (error as any).status, (error as any).statusText, (error as any).errorDetails);
    }
    if ((error as any)?.status === 404) {
      throw new Error(`Failed to generate summary: model "${DEFAULT_MODEL}" not found or unsupported. Set GOOGLE_AI_MODEL to a supported model.`);
    }
    throw new Error("Failed to generate summary");
  }
}

/* ---------------- IMPROVE TEXT ---------------- */
export async function improveText(text: string): Promise<string> {
  try {
    console.debug(`Using model ${DEFAULT_MODEL} for improveText`);
    const model = genAI.getGenerativeModel({
      model: DEFAULT_MODEL,
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Improve the following text by fixing grammar, enhancing clarity, and making it more professional. Return only the improved text:\n\n${text}`,
            },
          ],
        },
      ],
    });

    return result.response.text();
  } catch (error) {
    console.error("Error improving text:", error);
    if ((error as any)?.status) {
      console.error("status:", (error as any).status, (error as any).statusText, (error as any).errorDetails);
    }
    if ((error as any)?.status === 404) {
      throw new Error(`Failed to improve text: model "${DEFAULT_MODEL}" not found or unsupported. Set GOOGLE_AI_MODEL to a supported model.`);
    }
    throw new Error("Failed to improve text");
  }
}

/* ---------------- GENERATE TAGS ---------------- */
export async function generateTags(text: string): Promise<string[]> {
  try {
    console.debug(`Using model ${DEFAULT_MODEL} for generateTags`);
    const model = genAI.getGenerativeModel({
      model: DEFAULT_MODEL,
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate 3–5 relevant tags for the following text. Return only a comma-separated list:\n\n${text}`,
            },
          ],
        },
      ],
    });

    const tagsText = result.response.text();

    return tagsText
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean)
      .slice(0, 5);
  } catch (error) {
    console.error("Error generating tags:", error);
    if ((error as any)?.status) {
      console.error("status:", (error as any).status, (error as any).statusText, (error as any).errorDetails);
    }
    if ((error as any)?.status === 404) {
      throw new Error(`Failed to generate tags: model "${DEFAULT_MODEL}" not found or unsupported. Set GOOGLE_AI_MODEL to a supported model.`);
    }
    throw new Error("Failed to generate tags");
  }
}
