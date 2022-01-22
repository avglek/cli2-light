import { TREE_ERROR, TREE_POST, TREE_SUCCESS } from './actionsType';
import { requestTree } from '../../common/template';

export const postTree = (user) => ({
  type: TREE_POST,
  payload: requestTree(user),
});

export const succesTree = (response) => ({
  type: TREE_SUCCESS,
  payload: response,
});

export const errorTree = (error) => ({
  type: TREE_ERROR,
  payload: error,
});
