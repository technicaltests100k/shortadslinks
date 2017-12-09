import React, { PureComponent } from 'react';
import type { Element } from 'react';
import firebase from '../../firebase';
import GphApiClient from 'giphy-js-sdk-core';
const client = GphApiClient("L7j1y29ltD407GJpNowpaf2AuYz8vglx&");

/**
 * <Advert /> component.
 */
class Advert extends PureComponent {

  constructor() {
    super();
    this.state = {
      url: null,
      category: null,
      advert: null
    }
  }

  getInfo = () => {
    const id = this.props.location.pathname;
    const notFound = {
      url: '/',
      category: 'not found'
    }
    
    firebase.database().ref(id).once('value').then((snapshot) => {
      // const obj = snapshot.val();
      const obj = snapshot.val() ? snapshot.val() : notFound;
      if(obj){
        this.setState({
          url: obj.url,
          category: obj.category
        })
        this.getAdvertFromApi(obj.category)
      }
      
    });
  }

  getAdvertFromApi = (search) => {
    client.search('gifs', {"q": search, "limit": 1})
    .then((response) => {
      response.data.forEach((gifObject) => {
        this.setState({
          advert: gifObject.embed_url
        })
      })
    })
    .catch((err) => {})
  }

  redirectToClientSite = (url) => {
    setTimeout(()=>{
      window.location = url
    }, 5000)
  }

  /**
   * Renders the Advert component.
   *
   * @return {JSX} - rendered Advert page.
   */
  render(): Element {

    this.getInfo()

    if(this.state.url == null){
      return null;
    }

    const content = this.state.url !== '/' ? `You are going to be redirect in 5 seconds enjoy our advert` :
    `OPPSSSS this link doesn't exist!`

    return (
      <div>
        <h1>{content}</h1>
        {
          this.state.advert ? (
          
            <div style={ { left: 0, width: 100 + '%', height: 0, position: 'relative', paddingBottom: 74.0247 + '%'}}>
              <iframe 
                style={ { border: 0, top: 0, left: 0, width: 100 + '%', height: 100 + '%', position: 'absolute' }} 
                src={this.state.advert} 
                className="giphy-embed" 
                allowFullScreen 
                scrolling={"no"} 
                title={'show advert'}
                onLoad= {this.redirectToClientSite(this.state.url)}>
              </iframe>
            </div>) : null
        }
      </div>
    );
  }
}

export default Advert;
