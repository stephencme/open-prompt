# open-prompt-core

A lightweight library for configuring and rendering prompt templates.

## Features

- Configure and render prompt templates.
- Supports versioning for templates.
- Easy integration with popular AI clients like OpenAI and Anthropic.

## Usage

### Importing the Library

```typescript
import { OpenPromptCore } from "open-prompt-core"
```

## API Reference

### `OpenPromptCore`

#### Constructor

```typescript
new OpenPromptCore(prompts: OpenPrompt[]);
```

- **`prompts`**: An array of prompt templates to initialize with.

#### Methods

##### prompt(name: string, version: string, variables: { [key: string]: any }): string

Renders a prompt template by name and version.

- **`name`**: The name of the prompt template.
- **`version`**: The version of the prompt template.
- **`options`**: The variables to inject.

Returns a `string` containing the rendered prompt with injected variables.

**Throws**: Will throw an error if the prompt template is not found.

## Example Templates

### Summarize Email

```json
{
  "name": "summarizeEmail",
  "version": "latest",
  "template": "Summarize the following email:\n\n{{email}}"
}
```

### Generate Greeting

```json
{
  "name": "generateGreeting",
  "version": "1.0",
  "template": "Generate a greeting for {{name}} in a {{tone}} tone."
}
```
