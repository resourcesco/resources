import produce, { original } from 'immer'
import { getDraftUpdate, draftState, stateKey } from '../util'

export default function del(treeData, treeUpdate) {
  return produce(treeData, draft => {
    const parentState = draftState(
      draft,
      treeUpdate.path.slice(0, treeUpdate.path.length - 1)
    )
    delete parentState[treeUpdate.path[treeUpdate.path - 1]]
    const [parent, key] = getDraftUpdate(draft, treeUpdate.path)
    console.log({ path: treeUpdate.path, parent: original(parent), key })
    if (Array.isArray(parent)) {
      console.log('splicing')
      parent.splice(Number(key), 1)
    } else {
      delete parent[key]
    }
  })
}