import { describeParser } from './describeParser'
import { docParser } from './docParser'

const parsers = {
  DESCRIBE: describeParser,
  DOC: docParser,
  DEFAULT: () => ({ type: '__NONE__' }),
}

export const parser = (data) => {
  console.log(data)
  const keys = Object.keys(data.json)
  console.log(keys)
  const action = parsers[keys[0]] || parsers.DEFAULT
  console.log(action)
  return action(data)
}
