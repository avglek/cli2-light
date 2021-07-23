import { TAB_ADD, TAB_CHANGE, TAB_REMOVE, TAB_UPDATE } from './actionsType'

export function addTab(payload) {
  return {
    type: TAB_ADD,
    payload,
  }
}

export function updateTab(payload) {
  return {
    type: TAB_UPDATE,
    payload,
  }
}

export function removeTab(index) {
  return {
    type: TAB_REMOVE,
    payload: index,
  }
}

export function changeTab(value) {
  return {
    type: TAB_CHANGE,
    payload: value,
  }
}
