import React from 'react'

export const Stock = (props) => {
  return (
    <tr>
      <td><p>{props.stock.name}</p></td>
      <td><p>{props.stock.uv}</p></td>
      <td><p>{props.stock.quantity}</p></td>
      <td><p>{props.stock.tv}</p></td>
      <td><input type="checkbox" name="same" ></input></td>
    </tr>
    
  )
}
