import React, { Component } from 'react';
import type { Element } from 'react';
import firebase from 'firebase';
import shortid from 'shortid';
import './style.css';

/**
 * <Home /> component.
 */
class Home extends Component<*, *> {
  constructor() {
    super();
    this.state = {
      url: '',
      category: '',
      key: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const item = {
      url: this.state.url,
      category: this.state.category
    }
    const key = shortid.generate();
    firebase.database().ref(key).set(item);
    this.setState({
      url: '',
      category: '',
      key: key
    });
  }

  checkUrl = (url) => {
    const pattern = /^((http|https):\/\/)/;
    return pattern.test(url);
  }

  handleChange = (e) => {
    let state = {
      [e.target.name]: e.target.value
    };

    if(e.target.name === 'url'){
      state['errorUrl'] = !this.checkUrl(e.target.value) ? true : false
    }
    
    this.setState(state);
  }

  simpleValidation = () =>{
    const { url, category, errorUrl } = this.state;
    return url.length > 0 && category.length > 0 && !errorUrl;
  }

  /**
   * Renders the Home component.
   *
   * @return {JSX} - rendered Home page.
   */
  render(): Element {
    return (
      <div>
      {
        !this.state.key ?
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="url" placeholder="http://..." onChange={this.handleChange} value={this.state.url} />
          {
            this.state.errorUrl ? <p className={'error'}>{'Please provide a http protocol (http or https)'}</p> : null
          }
          <input type="text" name="category" placeholder="Category" onChange={this.handleChange} value={this.state.category} />
          
          {
            this.simpleValidation() ? <button>Add Item</button> : null
          }
        </form>
      :
        <div>
          <a href={`http://localhost:3000/${this.state.key}`} target={'_blank'}>Link</a>
          <p>{`http://localhost:3000/${this.state.key}`}</p>
        </div>
      }
      </div>
    )
  }
}

export default Home;
