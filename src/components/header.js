import React from "react"
import { Link } from "gatsby"
import { Container } from "semantic-ui-react"
import { createUseStyles } from "react-jss"
import { GREEN } from "../consts/styles"
import Image from "./image"
import LanguagePicker from "./LanguagePicker"

const useStyles = createUseStyles({
  container: {
    alignItems: "center",
    display: [["flex"], "!important"],
    justifyContent: "space-between",
  },
  header: {
    background: GREEN,
    marginBottom: `1.45rem`,
  },
})

export default ({ language, onChangeLanguage }) => {
  const classes = useStyles()

  return (
    <header className={classes.header}>
      <Container className={classes.container}>
        <Link to="/">
          <Image />
        </Link>
        <LanguagePicker
          language={language}
          onChangeLanguage={onChangeLanguage}
        />
      </Container>
    </header>
  )
}
