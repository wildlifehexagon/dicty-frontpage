// @flow
import React from "react"
import { Flex } from "grid-styled"
import FontAwsome from "react-fontawesome"

import {
  PaperContainer,
  PaperTitle,
  Header,
  ListBox,
  ListItems,
  LeadText,
  MainContent,
  SourceContent,
  SourceTitle,
  Link,
  MoreLink,
  Danger,
} from "./styles"

/**
 * The Papers component that will be displayed on the right in every
 * react web application of [dictyBase](http://dictybase.org).
 */

const Papers = (props: {
  /** List of paper items */
  papers: Array<{
    "id": number,
    "author": string,
    "title": string,
    "journal": string,
  }>,
}) => {
  const text = props.papers.map((paper, index) =>
    <ListItems key={index}>
      <LeadText>
        {paper.author}
      </LeadText>
      <MainContent>
        <Danger dangerouslySetInnerHTML={{ __html: paper.title }} />
      </MainContent>
      <SourceContent>
        <SourceTitle>Journal:</SourceTitle>
        <Danger dangerouslySetInnerHTML={{ __html: paper.journal }} />
      </SourceContent>
    </ListItems>,
  )

  return (
    <PaperContainer>
      <Header>
        <Flex wrap>
            <PaperTitle>
                <FontAwsome name="paperclip fa-lg" />
            </PaperTitle>
            <PaperTitle>
                LATEST PAPERS
            </PaperTitle>
        </Flex>
      </Header>
      <ListBox>
        {text}
      </ListBox>
      <MoreLink>
        <FontAwsome name="plus" />
        <Link href="" alt="more papers">
          {" "}more papers{" "}
        </Link>
      </MoreLink>
    </PaperContainer>
  )
}

export default Papers
