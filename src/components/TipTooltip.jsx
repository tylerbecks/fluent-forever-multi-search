import React from "react"
import { Icon, Popup } from "semantic-ui-react"
import injectSheet from "react-jss"

const styles = {
  icon: {
    float: "right",
    fontSize: [["0.6em"], "!important"],
  },
}

const CATEGORY_MESSAGE =
  "Learn these words word by using 2-3 other pictures/words on your flashcards (i.e. ‘animal = dog, cat, fish…’)"
const CONFOUNDED_IMAGES_MESSAGE =
  "These are groups of words that will use very similar images (girl/daughter, marriage/wedding). Learn these words by adding a personal touch (i.e., the name of a ‘daughter’ you might know) or an additional word or two in your target language (i.e., daughter might go with mother/father)."
const TIME_MESSAGE =
  "If needed, define each time division in terms of another time division, i.e. 60 x minuto = 1 ___ (ora), 1 ora = 60 x ____ (minuto)."

const TipTooltip = ({ classes, tip }) => {
  let content
  if (tip === "Category Word") {
    content = CATEGORY_MESSAGE
  }
  if (tip === "Easily Confounded Images") {
    content = CONFOUNDED_IMAGES_MESSAGE
  }
  if (tip === 'Time Unit') {
    content = TIME_MESSAGE
  }

  return (
    <Popup
      trigger={<Icon circular name="info" className={classes.icon} />}
      header={tip}
      content={content}
    />
  )
}

export default injectSheet(styles)(TipTooltip)
