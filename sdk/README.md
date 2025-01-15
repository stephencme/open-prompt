# anyprompt-sdk

A lightweight SDK for interacting with AnyPromptCore, enabling the fetching and usage of prompt templates from an external API.

## Features

- Fetch prompt templates from a specified API.
- Render prompt templates with injected variables.
- Easy integration with popular AI clients like OpenAI and Anthropic.

## Usage

### Importing the Library

```typescript
import { AnyPromptSDK } from "anyprompt-sdk"
```

### Example with OpenAI API

```typescript
import { AnyPromptSDK } from "anyprompt-sdk"
import { OpenAI } from "openai"

// Initialize AnyPromptSDK
const opsdk = new AnyPromptSDK("your-api-url", "your-api-anon-key")

// Initialize OpenAI client
const client = new OpenAI({ apiKey: "your-openai-api-key" })

// Render a prompt template and call OpenAI API
async function summarizeEmail(email: string) {
  const prompt = opsdk.prompt("summarizeEmail", "0.1.0", { email })

  const response = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o",
  })

  return response.choices[0].message.content
}

// Example usage
const email = "Hello, I hope this email finds you well. Let’s catch up soon!"
const summary = await summarizeEmail(email)
console.log("Summary:", summary)
```

## API Reference

### `AnyPromptSDK`

#### Constructor

```typescript
new AnyPromptSDK(apiUrl: string, apiAnonKey: string);
```

- **`apiUrl`**: The base URL of the API to fetch prompt templates from.
- **`apiAnonKey`**: The API key for authorization.

#### Methods

##### prompt(name: string, version: string, variables: { [key: string]: any }): string

Renders a prompt template by name and version after fetching all prompt templates from the API.

- **`name`**: The name of the prompt template.
- **`version`**: The version of the prompt template.
- **`options`**: The variables to inject.

Returns a `string` containing the rendered prompt with injected variables.

**Throws**: Will throw an error if the prompt template is not found.
