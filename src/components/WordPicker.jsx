import React, { PureComponent } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Button, Card, Header, Label, Progress, Flag } from "semantic-ui-react"
import { searchWord } from "../utils/seachWord"

const TARGET_LANGUAGE = "it"
const STORE_INDEX_KEY = "currentWordIndex"
const GOOGLE_TRANSLATE_KEY = "AIzaSyDLI3Dier2paFjpvYalr3m3xYjc5UkiepI"

/**
 * WordPicker that displays the list of the 625 most used words.
 */
export default class WordPicker extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      index: Number(localStorage.getItem(STORE_INDEX_KEY)) || 0,
      translatedWord: "",
    }
  }

  async componentDidMount() {
    const translatedWord = await this.fetchTranslatedWord(
      this.currentWordObj.word
    )
    this.setState({ translatedWord })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.index !== prevState.index) {
      const translatedWord = await this.fetchTranslatedWord(
        this.currentWordObj.word
      )

      this.setState({ translatedWord })
    }
  }

  async fetchTranslatedWord(word) {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_KEY}&q=${word}&target=${TARGET_LANGUAGE}&source=en`
    )
    const json = await response.json()
    const translation = json.data.translations[0].translatedText

    return translation
  }

  handleClickNext = () => {
    if (this.state.index === this.words.length - 1) return

    this.changeWord(1)
  }

  handleClickPrev = () => {
    if (this.state.index === 0) return

    this.changeWord(-1)
  }

  changeWord = indexChangeAmount => {
    this.setState(({ index }) => {
      const newIndex = index + indexChangeAmount

      localStorage.setItem(STORE_INDEX_KEY, newIndex)

      return {
        index: newIndex,
        translatedWord: "",
      }
    })
  }

  handleSearch = () => {
    searchWord(TARGET_LANGUAGE, this.state.translatedWord)
  }

  get isPrevDisabled() {
    return this.state.index === 0
  }

  get isNextDisabled() {
    return this.state.index === this.words.length - 1
  }

  get currentWordObj() {
    return this.words[this.state.index]
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
              <Progress
                attached="top"
                color="green"
                total={this.words.length}
                value={this.state.index + 1}
              />
              <Progress
                attached="bottom"
                color="green"
                total={this.words.length}
                value={this.state.index + 1}
              />
              <Card.Content>
                <Header textAlign="left">
                  <Flag name="us" />
                  {this.currentWordObj.word}
                  {this.currentWordObj.hint && (
                    <Label
                      content={this.currentWordObj.hint}
                      color="green"
                      circular
                    />
                  )}
                </Header>
                <Header textAlign="left">
                  <Flag name={TARGET_LANGUAGE} />
                  {this.state.translatedWord}
                </Header>
              </Card.Content>

              <Card.Content extra>
                <Button.Group>
                  <Button
                    icon="angle double left"
                    disabled={this.isPrevDisabled}
                    onClick={this.handleClickPrev}
                    type="button"
                  />
                  <Button
                    content="Search!"
                    color="orange"
                    type="submit"
                    onClick={this.handleSearch}
                  />
                  <Button
                    icon="angle double right"
                    disabled={this.isNextDisabled}
                    onClick={this.handleClickNext}
                    type="button"
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
