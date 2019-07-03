import React, { PureComponent } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Button, Card, Header, Label, Form } from "semantic-ui-react"
import { searchWord } from "../utils/seachWord"

const LANGUAGE = "it"
const STORE_INDEX_KEY = "currentWordIndex"

/**
 * WordPicker that displays the list of the 625 most used words.
 */
export default class WordPicker extends PureComponent {
  state = {
    index: null,
    translatedWord: "",
  }

  componentDidMount() {
    const index = localStorage.getItem(STORE_INDEX_KEY) || 1

    this.setState({ index: Number(index) })
  }

  handleClickNext = () => {
    this.setState(({ index }) => {
      if (index === this.words.length - 1) {
        throw Error("incremented index beyond length of words list!")
      }

      const newIndex = index + 1

      localStorage.setItem(STORE_INDEX_KEY, newIndex)

      return {
        index: newIndex,
        translatedWord: "",
      }
    })
  }

  handleClickPrev = () => {
    this.setState(({ index }) => {
      if (index === 0) throw Error("decremented index lower than 0!")

      const newIndex = index - 1

      localStorage.setItem(STORE_INDEX_KEY, newIndex)

      return {
        index: newIndex,
        translatedWord: "",
      }
    })
  }

  handleSearch = () => {
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

  handleInputChange = event => {
    this.setState({ translatedWord: event.target.value })
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
            this.words = data.allFrequentWordsJson.edges.map(({ node }) => node)
          }

          return (
            <Card raised>
              <Card.Content>
                <Form onSubmit={this.handleSearch}>
                  {this.currentWord && (
                    <>
                      {this.currentWord.hint && (
                        <Label
                          content={this.currentWord.hint}
                          color="green"
                          floating
                        />
                      )}
                      <Header
                        content={this.currentWord.word}
                        textAlign="center"
                      />
                    </>
                  )}

                  <Form.Input
                    value={this.state.translatedWord}
                    onChange={this.handleInputChange}
                    placeholder="Translated Word"
                  />

                  <Button.Group>
                    <Button
                      icon="angle double left"
                      disabled={this.isPrevDisabled}
                      onClick={this.handleClickPrev}
                      type="button"
                    />
                    <Button content="Search!" color="orange" type="submit" />
                    <Button
                      icon="angle double right"
                      disabled={this.isNextDisabled}
                      onClick={this.handleClickNext}
                      type="button"
                    />
                  </Button.Group>
                </Form>
              </Card.Content>
            </Card>
          )
        }}
      />
    )
  }
}
