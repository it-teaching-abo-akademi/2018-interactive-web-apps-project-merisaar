import React from 'react'

export const Sisalto= (props) => {

  return (
    <div>
      <Osa osa = {props.osa1} tehtavia ={props.tehtavia1}/>
      <Osa osa = {props.osa2} tehtavia ={props.tehtavia2}/>
      <Osa osa = {props.osa3} tehtavia ={props.tehtavia3}/>
    </div>
  )
}

const Osa= (props) => {
  return (
       <p>{props.osa} {props.tehtavia}</p>
  )
}
