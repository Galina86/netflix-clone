import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../App'
import Switch from 'react-switch'

const ThemeToggle = () => {

  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div>
      <Switch
        uncheckedIcon={false}
        checkedIcon={false}
        onColor={'#ffffff'}
        onHandleColor={'#000000'}
        offHandleColor={'#ffffff'}
        offColor={'#b22222'}
        onChange={handleThemeToggle}
        checked={theme === 'light'}
      />
    </div>
  )
}

export default ThemeToggle;
