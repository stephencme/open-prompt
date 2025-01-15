"use client"

import { OpenPrompt, OpenPromptCore } from "open-prompt-core"

interface PromptsPageClientProps {
  prompts: OpenPrompt[]
}

export default function PromptsPageClient(props: PromptsPageClientProps) {
  const opc = new OpenPromptCore(props.prompts)

  return (
    <div className="bg-gray-50 p-8">
      <table className="bg-white table-auto w-full">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Version</th>
            <th className="px-4 py-2 text-left">Template</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(opc.prompts).map(([id, prompt]) => (
            <tr className="border-b border-gray-300" key={id}>
              <td className="font-mono px-4 py-2 text-left">{id}</td>
              <td className="font-mono px-4 py-2 text-left">{prompt.name}</td>
              <td className="font-mono px-4 py-2 text-left">
                {prompt.version}
              </td>
              <td className="px-4 py-2 text-left">{prompt.template}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
