// @flow
import React from "react"
import Lists from "@convertkit/slate-lists"
import Tooltip from "@material-ui/core/Tooltip"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered"
import ToolbarButton from "../toolbar/ToolbarButton"
import { ButtonProps, NodeProps } from "../flow/types"

/**
 * Functions to help with list blocks.
 */

const isList = editor =>
  editor.value.blocks.some(node => node.type === "list-item-child")

const toggleList = (event, editor, type) => {
  event.preventDefault()

  if (isList(editor)) {
    editor.unwrapList()
  } else {
    editor.wrapList({ type })
  }
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const ListItemNode = ({ attributes, children }: NodeProps) => (
  <li {...attributes}>{children}</li>
)
const OrderedListNode = ({ attributes, children }: NodeProps) => (
  <ol {...attributes}>{children}</ol>
)
const UnorderedListNode = ({ attributes, children }: NodeProps) => (
  <ul {...attributes}>{children}</ul>
)

/**
 * Button components that use click handlers to connect the buttons to the editor.
 */
const OrderedListButton = ({ editor }: ButtonProps) => (
  <Tooltip title="Ordered List" placement="bottom">
    <ToolbarButton onClick={event => toggleList(event, editor, "ordered-list")}>
      <FormatListNumberedIcon />
    </ToolbarButton>
  </Tooltip>
)

const UnorderedListButton = ({ editor }: ButtonProps) => (
  <Tooltip title="Unordered List" placement="bottom">
    <ToolbarButton
      onClick={event => toggleList(event, editor, "unordered-list")}>
      <FormatListBulletedIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more in the future.
 */
const ListPlugin = Lists({
  blocks: {
    ordered_list: "ordered-list",
    unordered_list: "unordered-list",
    list_item: "list-item",
  },
  classNames: {
    ordered_list: "ordered-list",
    unordered_list: "unordered-list",
    list_item: "list-item",
  },
})

/**
 * Export the necessary assets for use with the editor.
 */
export {
  ListPlugin,
  ListItemNode,
  OrderedListNode,
  UnorderedListNode,
  UnorderedListButton,
  OrderedListButton,
}
