// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import InlineEditor from "./InlineEditor"
import { fetchPage } from "actions/EditablePageActions"

/**
 * This is the view component for the Special Thanks section of the About page.
 */

class SpecialThanks extends Component {
  static defaultProps = {
    page: {
      data: {
        attributes: {},
      },
    },
  }
  componentDidMount() {
    this.props.fetchPage("dfp-specialthanks")
  }
  render() {
    const { isFetching, page } = this.props
    console.log(page)
    if (!isFetching && page.data.attributes.content) {
      return <InlineEditor side="contentLeft" page={this.props.page} />
    }
    return (
      <div>
        <br />
        <Skeleton count={5} />
        <br />
        <br />
        <Skeleton count={5} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const slugName = "dfp-specialthanks"
  return {
    isFetching: state.editablePages.isFetching,
    page: state.editablePages[slugName],
  }
}

export default connect(mapStateToProps, { fetchPage })(SpecialThanks)
