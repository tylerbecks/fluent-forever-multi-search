import React from "react"
import { Button, Card, Header, Label, Flag } from "semantic-ui-react"
import TipTooltip from './TipTooltip'
import { searchWord } from "../utils/seachWord"

export default ({
  englishWord,
  hint,
  index,
  language,
  onChangeIndex,
  tip,
  totalWordCount,
  translatedWord,
}) => {
  const handleClickNext = () => {
    if (index === totalWordCount - 1) return
    onChangeIndex(index + 1)
  }

  const handleClickPrev = () => {
    if (index === 0) return
    onChangeIndex(index - 1)
  }

  const handleSearch = () => {
    searchWord(language, translatedWord, englishWord)
  }

  const isPrevDisabled = () => index === 0
  const isNextDisabled = () => index === totalWordCount - 1

  return (
    <Card raised>
      <Card.Content>
        <Header textAlign="left">
          <Flag name="us" />
          {englishWord}
          {hint && <Label content={hint} color="green" circular />}
          {tip && <TipTooltip tip={tip} />}
        </Header>
        <Header textAlign="left">
          <Flag name={language} />
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
}