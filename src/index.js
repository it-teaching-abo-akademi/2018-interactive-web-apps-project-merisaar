import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import * as serviceWorker from './serviceWorker';
// import logo from './logo.svg';
import './App.css';
import Portfolio from './components/portfolio.js'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      portfolio: [
          {
            name: 'Portfolio 1',
            stocks: [
              {
                name: 'Reactin perusteet',
                uv: 4.3,
                quantity:10,
                tv: 0,
              },
              {
                name: 'Tiedonvälitys propseilla',
                uv: 2.64,
                quantity:4,
                tv: 0,
              },
              {
                name: 'Komponenttien tila',
                uv: 40.32,
                quantity:1,
                tv: 0,
              }
            ]
          },
          {
            name: 'Portfolio 2',
            stocks: [
              {
                name: 'Reactin perusteet',
                uv: 4.3,
                quantity:10,
                tv: 0,
              },
              {
                name: 'Tiedonvälitys propseilla',
                uv: 2.64,
                quantity:4,
                tv: 0,
              },
              {
                name: 'Komponenttien tila',
                uv: 40.32,
                quantity:1,
                tv: 0,
              }
            ]
          }
        ]
      }
      this.addNewPortfolio = this.addNewPortfolio.bind(this);
    }
    
  addNewPortfolio (e) {
    e.stopPropagation();
    let len = this.state.portfolio.length +1
    let newPortfolio = { name: 'Portfolio ' + len, stocks: []}
    this.setState({
      portfolio: this.state.portfolio.concat([newPortfolio])
    });
    }
    render(){
    const renObjData = this.state.portfolio.map(function(data, idx) {
      console.log(data) 
      return (
         
           <Portfolio name={data.name} stocks={data.stocks} key={idx} />

       );
     });
    return (
      // <MuiThemeProvider>

      <div className="App">
        <header >

        </header>
        <body>
        <div className="addPortfolio"> <button onClick={this.addNewPortfolio}>Add portfolio</button></div>
        <div className="row">
          {renObjData}

          </div>
        </body>
      </div>
      // </MuiThemeProvider>
  )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
