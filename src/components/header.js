import React from "react"
import { Link } from "gatsby"
import { Container } from "semantic-ui-react"
import injectSheet from 'react-jss'
import { GREEN } from '../consts/styles'
import Image from './image'
import LanguagePicker from './LanguagePicker'

const styles = {
  header: {
    background: GREEN,
    marginBottom: `1.45rem`,
  }
}

const Header = ({ classes }) => (
  <header className={classes.header}>
    <Container>
      <Link to="/">
        <Image />
      </Link>
      <LanguagePicker />
    </Container>
  </header>
)

export default injectSheet(styles)(Header)