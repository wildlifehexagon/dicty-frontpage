// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Editor, getEventTransfer } from "slate-react"
import { Value, type Change } from "slate"
import { Flex, Box } from "rebass"
import styled from "styled-components"
import NewsToolbar from "components/editor/NewsToolbar"
import onPasteHtml from "components/editor/helpers/onPasteHtml"
import onPasteText from "components/editor/helpers/onPasteText"
import onKeyDown from "components/editor/helpers/onKeyDown"
import renderMark from "components/editor/renderer/renderMark"
import renderNode from "components/editor/renderer/renderNode"
import plugins from "components/editor/plugins/plugins"
import schema from "components/editor/schema/schema"
import { AuthenticatedUser } from "utils/apiClasses"
import { addNewsItem, cancelEditing } from "actions/news"
import {
  CancelButton,
  SaveButton,
  NewsEditorBox,
} from "styles/EditablePageStyles"
import { frontpagenews } from "constants/resources"
import editorPlaceholder from "data/editorPlaceholder.json"

// set up custom styling for text editor
const StyledEditor = styled(Editor)`
  padding: 5px;
  a {
    text-decoration: none;
  }
`

type Props = {
  /** Action that allows user to add a news item to the server */
  addNewsItem: Function,
  /** Dispatch that cancels editing and pushes them back to root directory */
  cancelEditing: Function,
  /** Class that represents the current logged in user */
  loggedInUser: Object,
}

type State = {
  /** This is the initial value of the editable page content. */
  value: Object,
  /** Determines whether the editor is read only or not */
  readOnly: boolean,
}

/**
 * This is the Slate editor for adding a news item.
 */

const wrapLink = (change, href) => {
  change.wrapInline({
    type: "link",
    data: { href },
  })

  change.collapseToEnd()
}

const unwrapLink = change => {
  change.unwrapInline("link")
}

class AddNewsForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      // Initial value of editor
      value: Value.fromJSON(editorPlaceholder),
      readOnly: false,
    }
  }

  hasLinks = () => {
    const { value } = this.state
    return value.inlines.some(inline => inline.type === "link")
  }

  onChange = ({ value }: Object) => {
    this.setState({ value }) // on change, update state with new editor value
  }

  onCancel = () => {
    this.setState({
      value: this.state.value,
      readOnly: true,
    })
    this.props.cancelEditing()
  }

  // on save, save the value to the content API server
  onSave = () => {
    const { value } = this.state
    const { addNewsItem, loggedInUser } = this.props

    const content = JSON.stringify(value.toJSON())
    // get today's current date for use as news item name
    const date = new Date().toISOString().split("T")[0]

    const body = {
      data: {
        type: "contents",
        attributes: {
          name: date,
          created_by: loggedInUser.json.data.id,
          content: content,
          namespace: frontpagenews,
        },
      },
    }
    addNewsItem(body)

    this.setState(this.state.value)
  }

  onClickLink = (event: SyntheticEvent<>) => {
    event.preventDefault()
    const { value } = this.state
    const hasLinks = this.hasLinks()
    const change = value.change()

    if (hasLinks) {
      change.call(unwrapLink)
    } else if (value.isExpanded) {
      const href = window.prompt("Enter the URL of the link:")
      change.call(wrapLink, href)
    } else {
      const href = window.prompt("Enter the URL of the link:")
      const text = window.prompt("Enter the text for the link:")
      change
        .insertText(text)
        .extend(0 - text.length)
        .call(wrapLink, href)
    }

    this.onChange(change)
  }

  onPaste = (e: SyntheticEvent<>, change: Change) => {
    const transfer = getEventTransfer(e)
    const { type } = transfer
    switch (type) {
      case "text":
        return onPasteText(e, change)
      case "html":
        return onPasteHtml(e, change)
      default:
        break
    }
  }

  /* Keyboard Hotkeys */

  onKeyDown = (event: SyntheticEvent<>, change: Change) => {
    // if there is no metaKey, quit
    if (!event.metaKey) return

    if (event.key) {
      switch (event.key) {
        // if user pressed "b", add "bold" mark to text
        case "b": {
          event.preventDefault()
          change.toggleMark("bold")
          return true
        }

        case "i": {
          event.preventDefault()
          change.toggleMark("italic")
          return true
        }

        case "u": {
          event.preventDefault()
          change.toggleMark("underline")
          return true
        }

        // if the user presses " " then don't change text format
        case " ": {
          event.preventDefault()
          change.addBlock(" ")
          return true
        }

        default:
          return
      }
    }
  }

  render() {
    const { readOnly } = this.state
    return (
      <Flex justify="center">
        <NewsEditorBox width={["90%", "80%", "50%", "40%"]}>
          {!readOnly && (
            <NewsToolbar
              value={this.state.value}
              onChange={value => this.onChange(value)}
            />
          )}

          <StyledEditor
            value={this.state.value}
            onChange={this.onChange}
            onPaste={this.onPaste}
            onKeyDown={onKeyDown}
            renderMark={renderMark}
            renderNode={renderNode}
            readOnly={readOnly}
            schema={schema}
            plugins={plugins}
            placeholder="Enter text here..."
          />
          <br />
          <Flex>
            <Box width={["30%"]} mr={1} mt={1}>
              {!readOnly && (
                <CancelButton onClick={this.onCancel}>Cancel</CancelButton>
              )}
            </Box>
            <Box width={["30%"]} mr={1} mt={1}>
              {!readOnly && <SaveButton onClick={this.onSave}>Save</SaveButton>}
            </Box>
          </Flex>
        </NewsEditorBox>
      </Flex>
    )
  }
}

const mapStateToProps = state => {
  const loggedInUser = new AuthenticatedUser(state.auth.user)
  return {
    loggedInUser: loggedInUser,
  }
}

export default connect(mapStateToProps, {
  addNewsItem,
  cancelEditing,
})(AddNewsForm)
