import React, { Component } from 'react';

class ShowcaseIcon extends Component {
    state = {  }

    decodeHTMLEntities = str => {
        var element = document.createElement('div');
        if(str && typeof str === 'string') {
          // strip script/html tags
          str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
          str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
          element.innerHTML = str;
          str = element.textContent;
          element.textContent = '';
          return str
        }
    }

    render() { 
        return (
            <a href={this.props.data.href}>
                <div className="showcaseIcon">
                    <img src={this.props.data.images[0].url} alt="Playlist Icon"/>
                    <div className="showcaseData">
                        <div className="name">{this.decodeHTMLEntities(this.props.data.name)}</div>
                        <div className="desc">{this.decodeHTMLEntities(this.props.data.description)}</div>
                    </div>
                </div>
            </a>
         );
    }
}
 
export default ShowcaseIcon;