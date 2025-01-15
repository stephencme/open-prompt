// AnyPromptCore.ts

/**
 * Represents a prompt template used in the AnyPrompt system.
 */
export interface AnyPrompt {
  name: string
  version: string
  template: string
}

/**
 * The AnyPromptCore class manages prompt templates and provides functionality
 * to render templates with injected variables.
 */
export class AnyPromptCore {
  readonly prompts: Map<string, AnyPrompt>

  /**
   * Constructs an instance of AnyPromptCore.
   * @param prompts - An array of prompt templates to initialize with.
   */
  constructor(prompts: AnyPrompt[]) {
    this.prompts = new Map()
    this.setPrompts(prompts)
  }

  /**
   * Sets the prompt templates.
   * @param templates - An array of prompt templates to set.
   * @throws Will throw an error if a duplicate prompt template ID exists.
   */
  setPrompts(prompts: AnyPrompt[]): void {
    this.prompts.clear()
    prompts.forEach((prompt) => {
      const id = generateId(prompt.name, prompt.version)
      if (this.prompts.has(id)) {
        throw new Error(`Duplicate prompt template "${id}" exists.`)
      }
      this.prompts.set(id, prompt)
    })
  }

  /**
   * Renders a prompt template by name and version.
   * @param name - The name of the prompt template.
   * @param version - The version of the prompt template.
   * @param variables - The variables to inject.
   * @returns The rendered prompt with injected variables.
   * @throws Will throw an error if the prompt template is not found.
   */
  prompt(
    name: string,
    version: string,
    variables: { [key: string]: any }
  ): string {
    const id = generateId(name, version)
    if (!this.prompts.has(id)) {
      throw new Error(`Prompt template "${id}" not found.`)
    }
    const prompt = this.prompts.get(id)!
    return renderTemplate(prompt.template, variables)
  }
}

/**
 * Renders the template string by replacing placeholders with actual values.
 * @param template - The template string.
 * @param variables - The variables to inject.
 * @returns The rendered string.
 * @throws Will throw an error if a variable is missing from the provided
 * variables.
 */
function renderTemplate(
  template: string,
  variables: { [key: string]: any }
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (key in variables) {
      return String(variables[key])
    }
    throw new Error(`Missing variable "${key}" for template.`)
  })
}

/**
 * Generate a unique ID for a prompt template based on its name and version.
 * @param name - The name of the template.
 * @param version - The version of the template.
 * @returns The unique ID.
 */
export function generateId(name: string, version: string): string {
  return `${name}@${version}`
}

/**
 * Splits an ID into its name and version parts.
 * @param id - The ID to split.
 * @returns An object containing the name and version.
 */

export function splitId(id: string): { name: string; version: string } {
  const [name, version] = id.split("@")
  return { name, version }
}
