// AnyPromptCore.ts

export type PromptTemplate = {
  id: string
  name: string
  version: string
  template: string
}

export type Prompts = Record<string, PromptTemplate>

export class AnyPromptCore {
  private prompts: Prompts

  constructor() {
    this.prompts = {}
  }

  /**
   * Add a new prompt template to the library.
   * @param key The key in the format "name@version".
   * @param template The template string.
   */
  setPrompt(key: string, template: string): void {
    if (this.prompts[key]) {
      console.warn(`Prompt with key "${key}" exists and will be overwritten.`)
    }
    const [name, version] = promptNameAndVersion(key)
    this.prompts[key] = { id: key, name, version, template }
  }

  /**
   * Add multiple prompt templates to the library.
   * @param prompts A map of prompts in the format "name@version" to their
   * respective templates.
   */
  setPrompts(prompts: Prompts): void {
    Object.entries(prompts).forEach(([key, { template }]) => {
      this.setPrompt(key, template)
    })
  }

  /**
   * Get the appropriate prompt template for the given name and version.
   * @param key The key in the format "name@version".
   * @returns The matched prompt template.
   */
  getPrompt(key: string): PromptTemplate {
    const [name, version] = promptNameAndVersion(key)

    // Filter prompts by name
    const matchingNames = Object.values(this.prompts).filter(
      ({ name: promptName }) => promptName === name
    )
    if (matchingNames.length < 1) {
      throw new Error(`No prompts found matching name "${name}".`)
    }

    // Get prompt for version
    const prompt = this.prompts[`${name}@${version}`]
    if (!prompt) {
      throw new Error(`No prompts found matching key "${key}".`)
    }

    return prompt
  }

  /**
   * Render a prompt template with the given variables.
   * @param key The key in the format "name@version".
   * @param variables The variables to interpolate into the template.
   * @returns The rendered string.
   */
  renderPrompt(key: string, variables: Record<string, string>): string {
    const prompt = this.getPrompt(key)
    if (!prompt) {
      throw new Error(`No prompt found for key "${key}".`)
    }

    return prompt.template.replace(/{{\s*([\w.]+)\s*}}/g, (_, variable) => {
      if (!(variable in variables)) {
        throw new Error(`Missing variable "${variable}" for prompt "${key}".`)
      }
      return variables[variable]
    })
  }
}

export function promptNameAndVersion(
  key: string
): [name: string, version: string] {
  const [name, version, ...extraElements] = key.split("@")
  if (!name || !version || extraElements.length > 0) {
    throw new Error(
      `Invalid key format: "${key}". Expected format "name@version".`
    )
  }
  return [name, version]
}
