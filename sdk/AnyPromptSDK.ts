// AnyPromptSDK.ts

import { AnyPromptCore } from "anyprompt-core"

/**
 * The AnyPromptSDK class provides an interface to interact with the
 * AnyPromptCore, allowing for the fetching and usage of prompt templates from
 * an external API.
 */
export class AnyPromptSDK {
  private core: AnyPromptCore
  private apiUrl: string
  private apiAnonKey: string

  private get promptsUrl(): string {
    return `${this.apiUrl}/prompts`
  }

  /**
   * Constructs an instance of AnyPromptSDK.
   * @param apiUrl - The base URL of the API to fetch prompt templates from.
   * @param apiAnonKey - The API key for authorization.
   */
  constructor(apiUrl: string, apiAnonKey: string) {
    this.apiUrl = apiUrl
    this.apiAnonKey = apiAnonKey
    this.core = new AnyPromptCore([])
  }

  /**
   * Renders a prompt template by name and version after fetching all prompt
   * templates from the API.
   * @param name - The name of the prompt template.
   * @param version - The version of the prompt template.
   * @param variables - The variables to inject.
   * @returns The rendered prompt with injected variables.
   * @throws Will throw an error if the prompt template is not found.
   */
  async prompt(
    name: string,
    version: string,
    variables: { [key: string]: any }
  ): Promise<string> {
    await this.fetchPrompts()
    return this.core.prompt(name, version, variables)
  }

  /**
   * Fetches all prompt templates from the API.
   * @throws Will throw an error if the fetch operation fails.
   */
  private async fetchPrompts(): Promise<void> {
    const response = await fetch(this.promptsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiAnonKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch prompt templates from ${this.promptsUrl}, received status code: ${response.status}`
      )
    }

    const prompts = await response.json()
    this.core.setPrompts(prompts)
  }
}
