import { ValidationReport } from "./ValidationReport"

export function isValidationReport(error: any): error is ValidationReport {
  return error["instanceofValidationReport"] === true
}
