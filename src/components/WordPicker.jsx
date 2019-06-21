import React, { PureComponent } from "react"
// import { StaticQuery, graphql } from "gatsby"
import { Button, Icon, Card, Label } from "semantic-ui-react"
import { searchWord } from "../utils/seachWord"

var LANGUAGE = "it"

const WORDS = [
  { word: "actor" },
  { word: "black" },
  { word: "clay" },
  { word: "disease" },
  { word: "adjective" },
  { word: "blind", hint: "adjective" },
  { word: "clean", hint: "adjective" },
]

/**
 * WordPicker that displays the list of the 625 most used words.
 */
export default class WordPicker extends PureComponent {
  state = {
    index: 0,
  }

  handleClickNext = () => {
    this.setState(({ index }) => {
      if (index === WORDS.length - 1)
        throw Error("incremented index beyond length of words list!")

      return {
        index: index + 1,
      }
    })
  }

  handleClickPrev = () => {
    this.setState(({ index }) => {
      if (index === 0) throw Error("decremented index lower than 0!")

      return {
        index: index - 1,
      }
    })
  }

  handleClickSearch = () => {
    const { word } = this.currentWord
    searchWord(LANGUAGE, word)
  }

  get isPrevDisabled() {
    return this.state.index === 0
  }

  get isNextDisabled() {
    return this.state.index === WORDS.length - 1
  }

  get currentWord() {
    return WORDS[this.state.index]
  }

  render() {
    const { word, hint } = this.currentWord

    return (
      // <StaticQuery
      //   query={graphql`
      //     query SiteTitleQuery {
      //       site {
      //         siteMetadata {
      //           mostFrequentWords
      //         }
      //       }
      //     }
      //   `}
      //   render={data => (
      //     <div>
      //       {data.site.siteMetadata.mostFrequentWords.map(({ word }) => (
      //         word
      //       ))}
      //     </div>
      //   )}
      // />
      <Card raised>
        <Card.Content style={{ height: 80 }}>
          {hint && <Label content={hint} color="orange" ribbon />}
          <Card.Header content={word} style={{ textAlign: "center" }} />
          {/* <Card.Meta>{flashCardHelp}</Card.Meta> */}
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
        <Card.Content style={{ textAlign: "center" }}>
          <Button.Group>
            <Button
              icon="angle double left"
              disabled={this.isPrevDisabled}
              onClick={this.handleClickPrev}
            />
            <Button
              content="Search!"
              positive
              onClick={this.handleClickSearch}
            />
            <Button
              icon="angle double right"
              disabled={this.isNextDisabled}
              onClick={this.handleClickNext}
            />
          </Button.Group>
        </Card.Content>
      </Card>
    )
  }
}
