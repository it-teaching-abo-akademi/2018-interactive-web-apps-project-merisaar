import React from 'react'
import logo from '../logo.svg';

export const Portfolio = (props) => {

  return (
    <a href={props.url} class='col'>
      <img src={logo} className="App-logo" alt="logo" />
      <p>test</p>
    </a>
  )
}
