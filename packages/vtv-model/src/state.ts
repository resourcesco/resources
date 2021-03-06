import {
  getStateKey,
  draftValue,
  draftState,
  getState,
  getNodeState,
  getChildState,
  getNestedState,
  removeTemporaryState,
} from './util'
import {
  rename,
  edit,
  editJson,
  insert,
  deleteNode,
  deleteContents,
  showAll,
  showOnlyThis,
  setHidden,
  set,
  setView,
  setError,
  clearErrors,
  attach,
  convert,
} from './actions'

export {
  getStateKey,
  draftValue,
  draftState,
  getState,
  getNodeState,
  getChildState,
  getNestedState,
  removeTemporaryState,
}

const updateNestedState = (state, path = [], pathState, options: any = {}) => {
  if (path.length === 0) {
    const optionState: any = {}
    if (options.savePrevExpanded) {
      optionState._prevExpanded = state._expanded
    } else if (options.restoreExpanded) {
      optionState._expanded = state._prevExpanded
    }
    return { ...state, ...pathState, ...optionState }
  }
  const [key, ...remainingPath] = path
  const result = {
    ...state,
    [getStateKey(key)]: updateNestedState(
      getChildState(state, key),
      remainingPath,
      pathState,
      options
    ),
  }
  return result
}

const replaceKey = (value, key, childValue) => {
  if (Array.isArray(value)) {
    const result = value.slice()
    result[key] = childValue
    return result
  } else {
    return {
      ...value,
      [key]: childValue,
    }
  }
}

const updateNestedValue = (value, path, pathValueOrFn) => {
  if ((path || []).length === 0) {
    return typeof pathValueOrFn === 'function'
      ? pathValueOrFn(value[path[0]])
      : pathValueOrFn
  }
  if (path.length === 1) {
    return replaceKey(
      value,
      path[0],
      typeof pathValueOrFn === 'function'
        ? pathValueOrFn(value[path[0]])
        : pathValueOrFn
    )
  } else {
    const [key, ...rest] = path
    return replaceKey(
      value,
      key,
      updateNestedValue(value[key], rest, pathValueOrFn)
    )
  }
}

const actions = {
  rename,
  edit,
  editJson,
  insert,
  deleteNode,
  deleteContents,
  showAll,
  showOnlyThis,
  setHidden,
  set,
  setView,
  setError,
  clearErrors,
  attach,
  convert,
}

export const updateTree = (treeData, treeUpdate) => {
  const action = treeUpdate.action

  if (action) {
    if (action in actions) {
      const actionFn = actions[action]
      return actionFn(treeData, treeUpdate)
    }
  } else {
    return {
      ...treeData,
      value: treeUpdate.value || treeData.value,
      state: updateNestedState(
        treeData.state,
        treeUpdate.path,
        treeUpdate.state
      ),
    }
  }
}
