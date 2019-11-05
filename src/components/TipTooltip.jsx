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
const PRONOUN_MESSAGE =
  "Make sure you read about these in your grammar book before adding them. Languages divide their pronouns into many categories. Hungarian, for instance, has six words for “you” (singular informal, singular formal (for acquaintances), singular official (for teachers, policemen, bureaucrats), plural informal, etc.), and depending upon how you count, Japanese either has no pronouns or tons of pronouns. We’ll need to have some pronouns now in order to deal with grammar later, so you’ll want to find at least a few words to refer to yourself or someone else. You’ll find a good explanation of pronouns (and a list of them) in the beginning of your grammar book. Note that you don’t yet need him, her, his, their, etc. We’ll get them later, when we discuss grammar."

const TipTooltip = ({ classes, tip }) => {
  let content
  switch (tip) {
    case "Category Word":
      content = CATEGORY_MESSAGE
      break
    case "Easily Confounded Images":
      content = CONFOUNDED_IMAGES_MESSAGE
      break
    case "Time Unit":
      content = TIME_MESSAGE
      break
    case "Pronoun":
      content = PRONOUN_MESSAGE
      break
    default:
      throw Error("tip unknown")
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
