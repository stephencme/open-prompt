# @anyprompt/core

A tiny library for configuring and rendering prompt templates.

## Features

- Configure prompt templates.
- Render prompt template versions with variables.

## Usage

### Importing the Library

```typescript
import { AnyPromptCore } from "@anyprompt/core"
```

### Example with OpenAI API

```typescript
import { AnyPromptCore } from "@anyprompt/core"
import { OpenAI } from "openai"

// Initialize AnyPromptCore
const apcore = new AnyPromptCore()
apcore.setPrompt(
  "summarizeEmail@0.1.0",
  "Summarize the following email: {{ email }}"
)

// Initialize OpenAI client
const client = new OpenAI({ apiKey: "your-openai-api-key" })

// Render a prompt template and call OpenAI API
async function summarizeEmail(email: string) {
  const prompt = apcore.renderPrompt("summarizeEmail@0.1.0", { email })

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
