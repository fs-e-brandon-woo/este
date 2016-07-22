import './HomePage.scss';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedHTMLMessage, FormattedMessage, defineMessages } from 'react-intl';
import cytoscape from 'cytoscape'

const messages = defineMessages({
  intro: {
    defaultMessage: `
      <p>
        Ahoy, this is the
        <a target="_blank" href="https://github.com/este/este">Este</a> dev stack.
      </p>
    `,
    id: 'home.intro'
  }
});

export default class HomePage extends Component {
  componentDidMount(){
    const cyData = {　//サーバーから読み込んだキャンペーンフローのjsonデータがこれだとします
      elements: [ // list of graph elements to start with
        { // node a
          data: {
            label: 'A',
            id: 'a',
            type: 'mail',
            nodeAttributes: {
              subject: 'test',
              body: 'test',
            },
          }
        },
        { // node b
          data: {
            label: 'B',
            id: 'b',
            type: 'filter',
            nodeAttributes: {
              column: 'test',
              operator: 'test',
              value: 'test',
            },
          }
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' }
        }
      ],

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(label)'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        }
      ],

      layout: {
        name: 'grid',
        rows: 1
      }
    }

    cyData.container = this.refs.cy //DOMの書き出しさきを指定する

    const cy = cytoscape(cyData) //読み込んだjsonデータをページ上に再現する

    console.log(cy.json()) //jsonに保存する場合は cy.json() で図データをjsonに変換する
  }
  render() {
    return (
      <div className="home-page">
        {/* Note child is a function, so we can localize anything. */}
        <FormattedMessage {...linksMessages.home}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <FormattedHTMLMessage {...messages.intro} />
        {/* Use require for assets. It's super useful for CDN. */}
        <div id="cy" ref="cy"></div>
        <img alt="50x50 placeholder" src={require('./50x50.png')} />
      </div>
    );
  }
}
