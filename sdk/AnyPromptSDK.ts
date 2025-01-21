// AnyPromptSDK.ts

import { AnyPromptCore } from "@anyprompt/core"

type RemotePromptTemplate = {
  id: string
  template: string
  created_at: string
}

type RemotePrompts = Record<string, RemotePromptTemplate>

export class AnyPromptSDK {
  private apiUrl: string
  private apiKey: string
  private core: AnyPromptCore

  /**
   * Constructs an instance of AnyPromptSDK.
   * @param apiUrl The base URL of the API to fetch prompt templates from.
   * @param apiKey The API key for authorization.
   */
  constructor(apiUrl: string, apiAnonKey: string) {
    this.apiUrl = apiUrl
    this.apiKey = apiAnonKey
    this.core = new AnyPromptCore()
  }

  /**
   * Fetches all prompt templates from the API.
   */
  private async fetchPrompts(): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch prompt templates from ${this.apiUrl}, received status code: ${response.status}`
      )
    }

    // TODO: Validate response JSON
    const prompts: RemotePrompts = await response.json()
    Object.entries(prompts).forEach(([key, { id, template, created_at }]) => {
      if (key !== id || !template || !created_at) {
        throw new Error(`Invalid prompt template received from ${this.apiUrl}`)
      }
      this.core.setPrompt(key, template)
    })
  }

  /**
   * Render a prompt template with the given variables after fetching all prompt
   * templates from the API.
   * @param key The key in the format "name@version".
   * @param variables The variables to interpolate into the template.
   * @returns The rendered string.
   */
  async renderPrompt(
    key: string,
    variables: Record<string, string>
  ): Promise<string> {
    await this.fetchPrompts()
    return this.core.renderPrompt(key, variables)
  }
}
