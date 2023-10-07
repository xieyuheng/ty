import { Report } from "./Report"

export function isReport(error: any): error is Report {
  return error["instanceofReport"] === true
}
