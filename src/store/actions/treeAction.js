import { TREE_ERROR, TREE_POST, TREE_SUCCESS } from './actionsType'
import { requestTree } from '../../services/cliService/template'

export const postTree = () => ({
  type: TREE_POST,
  payload: requestTree,
})

export const succesTree = (response) => ({
  type: TREE_SUCCESS,
  payload: response,
})

export const errorTree = (error) => ({
  type: TREE_ERROR,
  payload: error,
})
