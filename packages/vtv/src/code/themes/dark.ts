import {EditorView} from "@codemirror/view"
import {Extension} from "@codemirror/state"

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors

const ivory = "#abb2bf",
  darkBackground = "#21252b",
  highlightBackground = "#2c313a",
  background = "#282c34",
  selection = "#3E4451",
  cursor = "#528bff"

/// The editor theme styles for One Dark.
export const oneDarkTheme = EditorView.theme({
  $: {
    color: ivory,
    backgroundColor: background,
    "& ::selection": {backgroundColor: selection},
    caretColor: cursor
  },

  "$$focused $cursor": {borderLeftColor: cursor},
  "$$focused $selectionBackground": {backgroundColor: selection},

  $panels: {backgroundColor: darkBackground, color: ivory},
  "$panels.top": {borderBottom: "2px solid black"},
  "$panels.bottom": {borderTop: "2px solid black"},

  $searchMatch: {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff"
  },
  "$searchMatch.selected": {
    backgroundColor: "#6199ff2f"
  },

  $activeLine: {backgroundColor: highlightBackground},
  $selectionMatch: {backgroundColor: "#aafe661a"},

  "$matchingBracket, $nonmatchingBracket": {
    backgroundColor: "#bad0f847",
    outline: "1px solid #515a6b"
  },

  $gutters: {
    backgroundColor: background,
    color: "#545868",
    border: "none"
  },
  "$gutterElement.lineNumber": {color: "inherit"},

  $foldPlaceholder: {
    backgroundColor: "transparent",
    border: "none",
    color: "#ddd"
  },

  $tooltip: {
    border: "1px solid #181a1f",
    backgroundColor: darkBackground
  },
  "$tooltip.autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: highlightBackground,
      color: ivory
    }
  }
}, {dark: true})
