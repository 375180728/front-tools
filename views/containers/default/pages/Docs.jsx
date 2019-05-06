import React, { Component } from 'react'
import { DOMAIN } from '../../../constants/config'
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';

const docList = [
  {title: '如何写出优雅的代码', uri: '#/docs/pretty-code', desc:'如何写出易于理解，维护，并且结构良好的代码', img: DOMAIN + 'docs/pretty-code.jpg', height: '22810px'},
  {title: '读redux源码笔记', uri: '#/docs/redux-source', desc:'redux源码解读', img: DOMAIN + 'docs/redux-source.jpg', height: '7550px'},
  {title: 'webpack入门', uri: '#/docs/webpack', desc:'webpack入门理解和配置', img: DOMAIN + 'docs/webpack.png', height: '7210px'},
  {title: 'js执行上下文', uri: '#/docs/js-context', desc:'对js执行上下文的理解', img: DOMAIN + 'docs/js-context.png', height: '2300px'}
]
export class Docs extends Component {
  
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){

  }

  render() {
    return (
      <div className='docs-containers'>
        <header><a href='#/'>FE Assist - Training Docs</a></header>
        {
          _.find(docList, {uri: document.location.hash}) ? 
          <DocDetail />
          :
          <DocList />
        }
      </div>
    )
  }
}

export default Docs

class DocList extends Component {
  render() {
    return (
      <div className="contents">
        <h2>教程，文档，WIKI</h2>
        <div className="title-line-wrapper page1-line">
          <div className="title-line" />
        </div>
        <div className='card-content'>
          {
            docList.map((item, index) =>
              <a href={item.uri} key={index} >
                <Card type="inner" hoverable style={{ width: 275, margin: '20px' }} cover={<img alt={item.title} src={item.img} />}>
                  <Card.Meta
                    title={item.title}
                    description={item.desc}
                  />
                </Card>
              </a>
            )
          }
        </div>
      </div>
    )
  }
}

class DocDetail extends Component {
  render() {
    const { uri, height } = _.find(docList, {uri: document.location.hash});
    return (
      <div className="contents">
        <a href="#/docs/list" style={{ lineHeight: '40px', fontSize: 14}}><Icon type="double-left" />返回列表页</a>
        <iframe src={DOMAIN + uri.substr(2)} style={{border: 0, width: '100%', height: height}}/>
      </div>
    )
  }
}