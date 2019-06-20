/**
 * WordPicker that displays the list of the 625 most used words.
 */

import React, { PureComponent } from 'react'
// import { StaticQuery, graphql } from "gatsby"
import { Button, Card, Label } from 'semantic-ui-react'

const WORDS = [
  { word: "actor" },
  { word: "black" },
  { word: "clay" },
  { word: "disease" },
  { word: "adjective" },
  { word: "blind", hint: "adjective" },
  { word: "clean", hint: "adjective" },
]

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
    });
  }

  handleClickPrev = () => {
    this.setState(({ index }) => {
      if (index === 0)
        throw Error("decremented index lower than 0!")

      return {
        index: index - 1,
      }
    });
  }

  get isPrevDisabled() {
    return this.state.index === 0;
  }

  get isNextDisabled() {
    return this.state.index === WORDS.length - 1;
  }

  render() {
    const { word, hint } = WORDS[this.state.index];
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
        <Card.Content>
          <Card.Header content={word} />
          {/* <Card.Meta>{flashCardHelp}</Card.Meta> */}
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Label content={hint} ribbon />
          <Button
            content="Prev"
            disabled={this.isPrevDisabled}
            onClick={this.handleClickPrev}
          />
          <Button
            content="Next"
            disabled={this.isNextDisabled}
            onClick={this.handleClickNext}
          />
        </Card.Content>
      </Card>
    )
  }
}
