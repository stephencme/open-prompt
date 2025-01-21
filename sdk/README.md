# @anyprompt/sdk

An SDK on top of AnyPromptCore for fetching and rendering prompt templates configured via an external API.

## Features

- Fetch prompt template versions from a specified API.
- Render prompt templates with injected variables.
- Easy integration with popular AI clients like OpenAI and Anthropic.

## Usage

### Importing the Library

```typescript
import { AnyPromptSDK } from "@anyprompt/sdk"
```

### Example with OpenAI API

```typescript
import { AnyPromptSDK } from "@anyprompt/sdk"
import { OpenAI } from "openai"

// Initialize AnyPromptSDK
const apsdk = new AnyPromptSDK("your-api-url", "your-api-anon-key")

// Initialize OpenAI client
const client = new OpenAI({ apiKey: "your-openai-api-key" })

// Render a prompt template and call OpenAI API
async function summarizeEmail(email: string) {
  const prompt = await apsdk.renderPrompt("summarizeEmail@0.1.0", { email })

  const response = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o",
  })

  return response.choices[0].message.content
}

// Example usage
const email =
  "Let's find a time to catch up soon! I'm typically busy Monday through Thursday but free most any other day next week."
const summary = await summarizeEmail(email)
console.log("Summary:", summary) // "Summary: The sender suggests catching up next week on Friday, Saturday, or Sunday."
```
