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
      Word: '',
      Author: ''
    }
  }

  // Search a random quote using a API
  listQuotes = (submit) => {


    fetch('https://api.quotable.io/random?maxLength=50')

      .then(response => response.json())

      .then(dados => {
        console.log(dados)
        this.setState({ Author: dados.author })
        this.setState({ quote: dados.content })

    })

      .then(this.cleanImage)

      .catch(erro => console.log(erro))

    submit.preventDefault();
  }

  randomWord = (submit) => {
    fetch('https://random-word-api.herokuapp.com/word?number=1')

      .then(response => response.json())

      .then(word => {
        this.setState({Word: word[0]})
    })
  }

  /// Uses pexel libary to search a image through a specific query {word}
  searchImage = () => {
    console.log("passei")
    this.randomWord();

    client.photos.search({ query : this.state.Word, per_page: 1 })


      .then(
        // response => {if (response.photos.length === 0) {this.setState({quote : "Image not found, try again", urlPhoto:""})} else {this.setState({urlPhoto:response.photos[0].src.original})}}

        response => 
        {
          if (response.photos.length === 0)
            this.searchImage();
          else 
            this.setState({urlPhoto:response.photos[0].src.original})
        }
      )

      .catch(erro => console.log(erro))

    this.cleanQuote()
  }

  cleanQuote = () => {
    this.setState({ quote: '' })

    console.log("Quote Clen")
  }

  cleanImage = () => {
    this.setState({ urlPhoto: '' })
  }

  /// Search a random word using a API


  componentDidMount() {
    this.randomWord();
  }

  render() {
    return (
      <main>
        <img alt='' style={this.state.urlPhoto === '' ? { display: 'none' } : { display: 'block' }} className="imagePexel" src={this.state.urlPhoto}></img>
        <div className="container">

          <h1 style={this.state.quote === '' ? { display: 'none' } : { display: 'block' }}>
            {
              '"' + this.state.quote + '"'
            }
          </h1>
          {/* <p style={this.state.quote === '' ? { display: 'none' } : { display: 'block' }}> 
by:  {this.state.Author}
          </p> */}

          <div className="container_form">
          
              <button  onClick={this.listQuotes} className="btn" type="submit">Quote</button>
            
          
              <button onClick={this.searchImage} className="btn" type="submit">Image</button>
           
          </div>

        </div>
      </main>
    )
  }
}