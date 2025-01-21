"use client"

import { AnyPromptCore, PromptTemplate } from "@anyprompt/core"

interface PromptsPageClientProps {
  prompts: PromptTemplate[]
}

export default function PromptsPageClient(props: PromptsPageClientProps) {
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
          {props.prompts.map((prompt) => (
            <tr className="border-b border-gray-300" key={prompt.id}>
              <td className="font-mono px-4 py-2 text-left">{prompt.id}</td>
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
