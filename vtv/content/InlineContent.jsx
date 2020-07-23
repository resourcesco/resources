import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { getState } from '../../vtv-model/state'
import InlineValue from './InlineValue'
import Link from './Link'
import CollectionSummary from './CollectionSummary'
import AttachmentView from './AttachmentView'
import { isUrl } from '../../vtv-model/analyze'

function InlineContent({
  name,
  value,
  state,
  path,
  autoEdit = true,
  context: { onMessage, rules },
  context,
}) {
  const {
    _editingName: editingName,
    _editing: editing,
    _attachments: attachments,
    _error: error,
  } = getState(state)

  const matchingRules = useMemo(() => rules && rules.match(path))

  let valueContent

  if (attachments) {
    valueContent = (
      <AttachmentView path={path} attachments={attachments} context={context} />
    )
  } else if (editing) {
    valueContent = (
      <InlineValue
        name={name}
        value={value}
        state={state}
        path={path}
        editing={editing}
        editingName={editingName}
        error={error}
        autoEdit={autoEdit}
        context={context}
      />
    )
  } else {
    if (typeof value === 'string' && isUrl(value)) {
      const handleEdit = () => {
        onMessage({
          path,
          action: 'edit',
          editing: true,
        })
      }
      valueContent = <Link url={value} onEdit={handleEdit} context={context} />
    } else if (typeof value === 'object' && value !== null) {
      valueContent = (
        <CollectionSummary
          type={Array.isArray(value) ? 'array' : 'object'}
          length={Object.keys(value).length}
          context={context}
        />
      )
    } else {
      valueContent = (
        <InlineValue
          name={name}
          value={value}
          state={state}
          path={path}
          editing={editing}
          editingName={editingName}
          error={error}
          autoEdit={autoEdit}
          context={context}
        />
      )
    }
  }
  return (
    <>
      {matchingRules && '✅'}
      {valueContent}
    </>
  )
}

InlineContent.propTypes = {
  path: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default InlineContent
