const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const port = 3000;
const rootDir = __dirname;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(rootDir));

app.post("/api/analyze", async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Missing OPENAI_API_KEY. Add it to your local .env file before testing."
      });
    }

    const {
      company,
      geography = "",
      industry = "",
      businessUnit = "",
      horizon = "",
      question = "",
      mode = "board",
      depth = "heavy"
    } = req.body || {};

    if (!company || !String(company).trim()) {
      return res.status(400).json({ error: "Company name is required." });
    }

    const client = new OpenAI({ apiKey });

    const prompt = [
      `Company: ${company}`,
      `Geography: ${geography || "Not provided"}`,
      `Industry: ${industry || "Not provided"}`,
      `Business unit: ${businessUnit || "Not provided"}`,
      `Strategic horizon: ${horizon || "Not provided"}`,
      `Decision lens: ${mode}`,
      `Analysis depth: ${depth}`,
      `Strategic question: ${question || "Provide a general strategic assessment."}`
    ].join("\n");

    const response = await client.responses.create({
      model: "gpt-5",
      store: false,
      input: [
        {
          role: "developer",
          content: [
            {
              type: "input_text",
              text:
                "You are an elite strategy consultant. Return valid JSON only. " +
                'Use exactly these keys: summary, keyIssues, hypotheses, recommendedNextSteps, risksConsiderations. ' +
                "summary must be a short paragraph string. The other keys must be arrays of 3 to 5 concise strings. " +
                "Be specific, commercially sharp, and consulting-style."
            }
          ]
        },
        {
          role: "user",
          content: [{ type: "input_text", text: prompt }]
        }
      ]
    });

    const text = response.output_text || "";
    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch (error) {
      return res.status(502).json({
        error:
          "The AI returned a response, but it was not valid JSON. Please try again."
      });
    }

    return res.json({ analysis });
  } catch (error) {
    const message =
      error && error.message
        ? error.message
        : "Something went wrong while generating the analysis.";
    return res.status(500).json({ error: message });
  }
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Clariy Insights AI is running at http://localhost:${port}`);
});
