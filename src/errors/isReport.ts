import { Report } from "./Report.js"

export function isReport(error: any): error is Report {
  return error["instanceofReport"] === true
}
