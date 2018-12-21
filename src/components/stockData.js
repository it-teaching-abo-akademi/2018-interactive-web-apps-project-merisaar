import React from 'react'

export default class Stock extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
  return (
    <tr>
      <td><p>{this.props.stock.name}</p></td>
      <td><p>{this.props.stock.uv}{this.props.currencySymbol}</p></td>
      <td><p>{this.props.stock.quantity}</p></td>
      <td><p>{this.props.stock.tv}{this.props.currencySymbol}</p></td>
      <td><input onChange={(e) => {this.props.setChecked(e, this.props.stock.id)}} id ={'check-' +this.props.stock.id} defaultChecked = {this.props.stock.checked} type="checkbox" ></input></td>
    </tr>
    
  )
  }
}
