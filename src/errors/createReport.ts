import { Report } from "./Report.js"
import { type ReportEntry } from "./ReportEntry.js"

export function createReport(entry: ReportEntry): Report {
  return new Report([entry])
}
