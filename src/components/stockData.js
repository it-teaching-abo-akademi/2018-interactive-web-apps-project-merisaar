import React from 'react'

export default class Stock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stock: this.props.stock,
    }
    this.setChecked = this.setChecked.bind(this)
    console.log(this.state.stock.checked)
  }
  setChecked (e) {
    e.stopPropagation()
    let stockCopy = {...this.state.stock}
    if(this.state.stock.checked === false){
      stockCopy.checked = true
      console.log(stockCopy)
      this.setState({
        stock: stockCopy,
      });
    } else {
      stockCopy.checked = false
      console.log(stockCopy)
      this.setState({
        stock: stockCopy,
      });
    }
  }
  render() {
  return (
    <tr>
      <td><p>{this.state.stock.name}</p></td>
      <td><p>{this.state.stock.uv}</p></td>
      <td><p>{this.state.stock.quantity}</p></td>
      <td><p>{this.state.stock.tv}</p></td>
      <td><input onClick={this.setChecked}id ={'check-' +this.state.id} type="checkbox" defaultChecked = {this.state.stock.checked}></input></td>
    </tr>
    
  )
  }
}
