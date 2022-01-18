// Handles string and JSON responses, returns parsed JSON if possible, or orignal string if not.
// Object is returned with value containing parsed or original value, along with boolean flog signifying if it was valid JSON.
export const safeJSONParse = (string: string): { value: any, isValidJSON: boolean } => {
  let parsedJSON: any
  try {
    parsedJSON = JSON.parse(string)
    return { value: parsedJSON, isValidJSON: true }
  }
  catch(e) {
    return { value: string, isValidJSON: false }
  }
}
