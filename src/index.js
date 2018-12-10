import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import logo from './logo.svg';
import './App.css';
import {Portfolio} from './components/portfolio.js'

const App = () => {
  const portfolio = {
      nimi: 'Half Stack -sovelluskehitys',
      osat: [
        {
          nimi: 'Reactin perusteet',
          url: "google.com"
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          url: "google.com/test"
        },
        {
          nimi: 'Komponenttien tila',
          url: "google.com"
        }
      ]
    }
    const renObjData = portfolio.osat.map(function(data, idx) {
       return (
           <Portfolio url={data.url} key={idx} />

       );
     });
    return (
      <div className="App">
        <header className="App-header">

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <body>
        <div class="row">
          {renObjData}
          </div>
        </body>
      </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
