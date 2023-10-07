import { indent } from "../utils/indent"
import { ReportEntry } from "./ReportEntry"

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
  if (entry.data === undefined) {
    return entry.message
  } else {
    return [
      entry.message,
      "",
      `  data: ${indent(JSON.stringify(entry.data, null, 2))}`,
    ].join("\n")
  }
}
