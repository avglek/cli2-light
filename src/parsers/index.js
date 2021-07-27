import { describeParser } from './describeParser'
import { docParser } from './docParser'

const parsers = {
  DESCRIBE: describeParser,
  DOC: docParser,
  DEFAULT: () => ({ type: '__NONE__' }),
}

export const parser = (data) => {
  const keys = Object.keys(data.json)
  const action = parsers[keys[0]] || parsers.DEFAULT
  return action(data)
}
