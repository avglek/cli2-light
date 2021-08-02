import { describeParser } from './describeParser'
import { docParser } from './docParser'
import { lookupParser } from './lookupParser'

const parsers = {
  DESCRIBE: describeParser,
  DOC: docParser,
  LOOKUP: lookupParser,

  DEFAULT: () => ({ type: '__NONE__' }),
}

export const parser = (data) => {
  const keys = Object.keys(data.json)
  const action = parsers[keys[0]] || parsers.DEFAULT
  return action(data)
}
