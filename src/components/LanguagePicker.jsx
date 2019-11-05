import React from "react"
import { Dropdown } from "semantic-ui-react"

const languageOptions = [
  { key: "it", value: "it", flag: "it", text: "Italian" },
  { key: "es", value: "es", flag: "es", text: "Spanish" },
]

export default ({ language, onChangeLanguage }) => {
  const onChange = (event, data) => {
    onChangeLanguage(data.value)
  }
  return (
    <Dropdown
      defaultValue={language}
      onChange={onChange}
      placeholder="Select Language"
      selection
      options={languageOptions}
    />
  )
}
