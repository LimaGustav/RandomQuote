import { Component } from 'react';
import './App.css';

import { createClient } from 'pexels';

const client = createClient('563492ad6f91700001000001fc5c04629d24449abce86e0f897ed939');


export default class RandomQuotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: [],
      quote: '',
      urlPhoto: '',
      Word: ''
    }
  }

  listQuotes = (submit) => {


    fetch('https://api.quotable.io/random?maxLength=50')

      .then(response => response.json())

      .then(dados => this.setState({ quote: dados.content }))

      .then(console.log("I got here"))

      .then(this.cleanImage)

      .catch(erro => console.log(erro))

    submit.preventDefault();
  }


  searchImage = (submit) => {
    submit.preventDefault();

    client.photos.search({ query : this.state.Word, per_page: 1 })

      // .then(response => console.log(response.photos[0].src.original))

      .then(response => console.log(response.photos))

      .then(this.cleanQuote)

      .catch(erro => console.log(erro))
  }

  cleanQuote = () => {
    this.setState({ quote: '' })

    console.log("cheguei aqui")
  }

  cleanImage = () => {
    this.setState({ urlPhoto: '' })
  }

  randomWord = (submit) => {
    fetch('https://random-word-api.herokuapp.com/word?number=1')

      .then(response => response.json())

      // .then(dados => console.log(dados[0]))

      .then(word => this.setState({Word: word[0]}))
  }

  componentDidMount() {
    this.randomWord();
  }

  render() {
    return (
      <main>
        <img style={this.state.urlPhoto === '' ? { display: 'none' } : { display: 'block' }} className="imagePexel" src={this.state.urlPhoto} alt="Image"></img>
        <div className="container">

          <h1 style={this.state.quote === '' ? { display: 'none' } : { display: 'block' }}>
            {
              '"' + this.state.quote + '"'
            }
          </h1>

          <div className="container_form">
            <form onSubmit onSubmit={this.listQuotes}>
              <button className="btn" type="submit">Quote</button>
            </form>
            <form onSubmit={this.searchImage} >
              <button className="btn" type="submit">Image</button>
            </form>
          </div>

        </div>
      </main>
    )
  }
}