import React from "react"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"

import { isFunction } from "../utils/utils"

const styles = theme => ({
  button: {
    color: "rgba(0, 0, 0, 0.87)",
    padding: "7px",
    minWidth: "20px",
  },
})

/**
 * Material-UI button that has a click handler attached to it.
 */

const ToolbarButton = ({ children, onClick, classes, ...props }) => (
  <Button
    className={classes.button}
    onClick={event => {
      isFunction(onClick) && onClick(event)
    }}
    {...props}>
    {children}
  </Button>
)

export default withStyles(styles)(ToolbarButton)
