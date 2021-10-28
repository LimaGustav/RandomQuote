import { Component } from 'react';
import './App.css';


export default class RandomQuotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
    }
  }

  listQuotes = (submit) => {
    

    fetch('https://api.quotable.io/random?maxLength=50')

    .then(response => response.json())

    .then(dados => this.setState({quote: dados.content}))

    .then(console.log("I got here"))

    .catch(erro => console.log(erro))

    submit.preventDefault();
  }

  componentDidMount() {
  }

  render() {
    return (
      <main>
        <div className="container">
          <h1>
            {
              '"'+this.state.quote+'"'
            }
          </h1>
          <form onSubmit={this.listQuotes}>
            <button className="btn" type="submit">Quote</button>
          </form>
        </div>
      </main>
    )
  }
}