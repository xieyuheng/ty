import { indent } from "../utils/indent.js"
import { type ReportEntry } from "./ReportEntry.js"

export class Report extends Error {
  private instanceofReport = true

  constructor(public entries: Array<ReportEntry> = []) {
    super()
  }

  get message(): string {
    return this.entries
      .map(formatReportEntry)
      .map((s) => s.trim())
      .join("\n\n")
  }
}

function formatReportEntry(entry: ReportEntry): string {
  if (!entry.hasOwnProperty("data")) {
    return entry.message
  } else if (entry.data === undefined) {
    return [entry.message, "", `  data: undefined`].join("\n")
  } else {
    const text = JSON.stringify(entry.data, null, 2)
    const lines = text.split("\n")
    if (lines.length > 1) {
      return [entry.message, "", `  data:`, indent(text, "    ")].join("\n")
    } else {
      return [entry.message, "", `  data: ${text}`].join("\n")
    }
  }
}
