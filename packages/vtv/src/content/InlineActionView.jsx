import ActionButton from '../generic/ActionButton'

function InlineActionView({ actions, onMessage, theme }) {
  return (
    <div className="actions-content">
      {actions.map(({ name, title, primary }) => (
        <ActionButton
          key={name}
          primary={primary}
          onClick={() => onMessage({ action: 'runAction', actionName: name })}
          theme={theme}
        >
          {title}
        </ActionButton>
      ))}
      <style jsx>{`
        .actions-content {
          margin-left: 10px;
        }
        .actions-content :global(button) {
          margin-right: 5px;
        }

        .actions-content :global(button):last-child {
          margin-right: 0px;
        }
      `}</style>
    </div>
  )
}

export default InlineActionView
