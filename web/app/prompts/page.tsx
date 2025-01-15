import { createClient } from "@supabase/supabase-js"
import { AnyPrompt, splitId } from "anyprompt-core"

import { Database } from "@/database.types"
import PromptsPageClient from "./page.client"

const supabase = createClient<Database>(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_ANON_KEY ?? ""
)

async function selectPrompts() {
  return supabase.from("prompts").select("*")
}

export default async function PromptsPage() {
  const { data } = await selectPrompts()
  const prompts: AnyPrompt[] =
    data?.map((prompt) => {
      const { name, version } = splitId(prompt.id)
      return {
        id: prompt.id,
        name,
        version,
        template: prompt.template,
      }
    }) ?? []

  return <PromptsPageClient prompts={prompts} />
}
