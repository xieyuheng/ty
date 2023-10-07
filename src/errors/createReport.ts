import { Report } from "./Report"
import { ReportEntry } from "./ReportEntry"

export function createReport(entry: ReportEntry): Report {
  return new Report([entry])
}
