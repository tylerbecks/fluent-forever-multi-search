import React, { PureComponent } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Button, Card, Input, Label } from "semantic-ui-react"
import { searchWord } from "../utils/seachWord"

const LANGUAGE = "it"

/**
 * WordPicker that displays the list of the 625 most used words.
 */
export default class WordPicker extends PureComponent {
  state = {
    index: 0,
  }

  handleClickNext = () => {
    this.setState(({ index }) => {
      if (index === this.words.length - 1)
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
    searchWord(LANGUAGE, this.state.translatedWord)
  }

  get isPrevDisabled() {
    return this.state.index === 0
  }

  get isNextDisabled() {
    return this.state.index === this.words.length - 1
  }

  get currentWord() {
    return this.words[this.state.index]
  }

  handleInputChange = (event) => {
    const word = event.target.value;
    this.setState({ translatedWord: word })
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query AllWordsJson {
            allFrequentWordsJson {
              edges {
                node {
                  word
                  hint
                }
              }
            }
          }
        `}
        render={data => {
          if (!this.words) {
            this.words = data.allFrequentWordsJson.edges.map(({ node }) => node);
          }
          const { word, hint } = this.currentWord;

          return (
            <Card raised>
              <Card.Content style={{ height: 80 }}>
                {hint && <Label content={hint} color="orange" ribbon />}
                <Card.Header content={word} textAlign="center" />
                {/* <Card.Meta>{flashCardHelp}</Card.Meta> */}
                {/* TODO remove */}
                <Input onChange={this.handleInputChange}></Input>
              </Card.Content>
              <Card.Content textAlign="center">
                <Button.Group>
                  <Button
                    icon="angle double left"
                    disabled={this.isPrevDisabled}
                    onClick={this.handleClickPrev}
                  />
                  <Button
                    content="Search!"
                    color="orange"
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
        }}
      />
    )
  }
}
