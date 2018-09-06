// @flow
import React, { type Node } from "react"
import { type Block } from "slate"

import Video from "components/editor/renderer/Video"
import BLOCKS from "components/editor/constants/blocks"
import INLINES from "components/editor/constants/inlines"
import { AlignmentNode } from "components/editor/plugins/alignment"
import {
  ListItemNode,
  OrderedListNode,
  UnorderedListNode,
} from "components/editor/plugins/list"

type Props = {
  node: Block,
  children: Node,
  attributes: Object,
}

const renderNode = (props: Props) => {
  const { attributes, children, node } = props
  switch (node.type) {
    case "alignment":
      return <AlignmentNode {...props} />
    case "list-item":
      return <ListItemNode {...props} />
    case "ordered-list":
      return <OrderedListNode {...props} />
    case "unordered-list":
      return <UnorderedListNode {...props} />

    case BLOCKS.HEADING_1:
      return <h1 {...attributes}>{children}</h1>

    case BLOCKS.HEADING_2:
      return <h2 {...attributes}>{children}</h2>

    case BLOCKS.HEADING_3:
      return <h3 {...attributes}>{children}</h3>

    case BLOCKS.BLOCKQUOTE:
      return <blockquote {...attributes}>{children}</blockquote>

    case INLINES.LINK: {
      const { data } = node
      const href = data.get("href")
      return (
        <a {...attributes} href={href}>
          {children}
        </a>
      )
    }

    case BLOCKS.IMAGE: {
      const { data, isSelected } = node
      const src = data.get("src")
      const className = isSelected ? "selected" : "unselected"
      return <img src={src} className={className} {...attributes} alt="" />
    }

    case BLOCKS.HR:
      return <hr {...attributes} />

    case BLOCKS.TABLE:
      return (
        <table {...attributes}>
          <tbody>{children}</tbody>
        </table>
      )

    case BLOCKS.TABLE_ROW:
      return <tr {...attributes}>{children}</tr>

    case BLOCKS.TABLE_CELL:
      return <td {...attributes}>{children}</td>

    case BLOCKS.VIDEO:
      return <Video {...props} />

    default:
      return null
  }
}

export default renderNode
