export function randomHexString(size: number): string {
  const array = new Uint8Array(size)
  crypto.getRandomValues(array)
  let hexString = ""
  for (const n of array) {
    const s = n.toString(16)
    if (s.length === 1) {
      hexString += "0" + s
    } else {
      hexString += s
    }
  }

  return hexString
}
