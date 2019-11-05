import React from "react"
import { Link } from "gatsby"
import { Container } from "semantic-ui-react"
import injectSheet from "react-jss"
import { GREEN } from "../consts/styles"
import Image from "./image"
import LanguagePicker from "./LanguagePicker"

const styles = {
  container: {
    alignItems: "center",
    display: [["flex"], "!important"],
    justifyContent: "space-between",
  },
  header: {
    background: GREEN,
    marginBottom: `1.45rem`,
  },
}

const Header = ({ classes, language, onChangeLanguage }) => (
  <header className={classes.header}>
    <Container className={classes.container}>
      <Link to="/">
        <Image />
      </Link>
      <LanguagePicker language={language} onChangeLanguage={onChangeLanguage} />
    </Container>
  </header>
)

export default injectSheet(styles)(Header)
