import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Modal from "@material-ui/core/Modal"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import { SaveButton } from "styles/EditablePageStyles"

function getModalStyle() {
  return {
    top: "5%",
    margin: "auto",
  }
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 75,
    backgroundColor: "#faf9f9",
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    borderRadius: "5px",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
  },
  save: {
    width: "50%",
    color: "#fff",

    "&:hover": {
      backgroundColor: "#3f51b5",
    },
  },
  link: {
    textDecoration: "none",
  },
})

const HelpMuiModal = props => {
  const { showHelpModal, classes, handleClose } = props
  console.log(handleClose)
  return (
    <Modal className={classes.modal} open={showHelpModal}>
      <ClickAwayListener onClickAway={handleClose}>
        <div style={getModalStyle()} className={classes.paper}>
          <Grid container justify="center" direction="column">
            <Grid item xs={12}>
              <center>
                <h1>Editor Help</h1>
              </center>
            </Grid>
            <Grid item xs={12}>
              <h3>Pasting Content</h3>
              <p>
                Some content from HTML pages can be copied and pasted directly
                into the editor. Just go to any page, highlight what you want to
                copy then paste it into the editor.
              </p>
              <p>
                <strong>Known bugs:</strong> Lists and tables sometimes do not
                work as expected when pasted into the editor. For lists, your
                best bet is to copy item by item (or a few items at once), then
                format accordingly. For tables, it will be easier to create a
                new table with the applicable toolbar buttons (i.e. create
                table, add row, etc.), then paste in the content cell by cell.
              </p>
              <p>
                Links can easily be added by highlighting text and pasting a
                URL.
              </p>
              <p>
                Images can be added by simply copying and pasting an image URL.
              </p>
              <p>
                Videos can be added by copying and pasting the video URL (either
                YouTube or Vimeo). This will automatically embed the video.
              </p>
              <h3>Keyboard Shortcuts</h3>
              <p>
                Some features have keyboard shortcuts. These can be found by
                hovering over a button in the toolbar. These tooltips will show
                any available shortcuts. For example, <strong>bold</strong> is
                CTRL + B.
              </p>
              <h3>Found a bug? Got a request?</h3>
              <p>
                Send an email and/or post an issue in the{" "}
                <em>
                  <a
                    className={classes.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/dictyBase/dicty-frontpage/issues">
                    dicty-frontpage
                  </a>
                </em>{" "}
                repo.
              </p>
              <SaveButton className={classes.save} onClick={handleClose}>
                Close
              </SaveButton>
            </Grid>
          </Grid>
        </div>
      </ClickAwayListener>
    </Modal>
  )
}

const HelpModal = withStyles(styles)(HelpMuiModal)

export default HelpModal
