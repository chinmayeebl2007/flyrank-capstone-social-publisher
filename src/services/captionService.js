const ai = require("../config/gemini");

class CaptionService {

    cleanResponse(text) {

        let cleaned = text.trim();

        cleaned = cleaned.replace(/```json/g, "");
        cleaned = cleaned.replace(/```/g, "");

        return cleaned.trim();

    }

    async generate(data) {

        const { title, body } = data;

        const prompt = `
Generate captions for the following blog.

Title:
${title}

Body:
${body}

Return ONLY valid JSON.

{
  "instagram":"",
  "x":"",
  "linkedin":""
}

Rules

Instagram
- Friendly
- Emojis
- 5 hashtags

X
- Under 280 characters

LinkedIn
- Professional
- No hashtags
`;

        const response =
            await ai.models.generateContent({

                model: "gemini-2.5-flash",

                contents: prompt

            });

        const cleaned =
            this.cleanResponse(response.text);

        return JSON.parse(cleaned);

    }

}

module.exports = new CaptionService();