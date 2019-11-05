import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Button, Card, Header, Label, Progress, Flag } from "semantic-ui-react"
import { searchWord } from "../utils/seachWord"

const TARGET_LANGUAGE = "it"
const STORE_INDEX_KEY = "currentWordIndex"
let words

export default () => {
  const [index, setIndex] = useState(getInitialIndex())
  const [translatedWord, setTranslatedWord] = useState("")

  useEffect(() => {
    ;(async () => {
      const { word } = words[index]
      const translatedWord = await fetchTranslatedWord(word)
      setTranslatedWord(translatedWord)
    })()
  }, [index])

  const handleClickNext = () => {
    if (index === words.length - 1) return
    changeWord(index + 1)
  }

  const handleClickPrev = () => {
    if (index === 0) return
    changeWord(index - 1)
  }

  const changeWord = newIndex => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORE_INDEX_KEY, newIndex)
    }

    setIndex(newIndex)
  }

  const handleSearch = () => {
    searchWord(TARGET_LANGUAGE, translatedWord)
  }

  const isPrevDisabled = () => index === 0
  const isNextDisabled = () => index === words.length - 1

  return (
    <StaticQuery
      query={graphql`
        query AllWordsJson2 {
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
        if (!words) {
          words = data.allFrequentWordsJson.edges.map(({ node }) => node)
        }

        const { hint, word } = words[index]

        return (
          <Card raised>
            <Progress
              attached="top"
              color="green"
              total={words.length}
              value={index + 1}
            />
            <Progress
              attached="bottom"
              color="green"
              total={words.length}
              value={index + 1}
            />
            <Card.Content>
              <Header textAlign="left">
                <Flag name="us" />
                {word}
                {hint && <Label content={hint} color="green" circular />}
              </Header>
              <Header textAlign="left">
                <Flag name={TARGET_LANGUAGE} />
                {translatedWord}
              </Header>
            </Card.Content>

            <Card.Content extra>
              <Button.Group>
                <Button
                  icon="angle double left"
                  disabled={isPrevDisabled()}
                  onClick={handleClickPrev}
                  type="button"
                />
                <Button
                  content="Search!"
                  color="orange"
                  type="submit"
                  onClick={handleSearch}
                />
                <Button
                  icon="angle double right"
                  disabled={isNextDisabled()}
                  onClick={handleClickNext}
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

const getInitialIndex = () => {
  let initialIndex
  if (typeof window !== "undefined") {
    initialIndex = Number(localStorage.getItem(STORE_INDEX_KEY))
  }

  return initialIndex || 0
}

const fetchTranslatedWord = async word => {
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${process.env.GATSBY_GOOGLE_TRANSLATE_API_KEY}&q=${word}&target=${TARGET_LANGUAGE}&source=en`
  )
  const json = await response.json()
  const translation = json.data.translations[0].translatedText

  return translation
}
