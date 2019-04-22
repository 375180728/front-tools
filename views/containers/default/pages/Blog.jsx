import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DOMAIN } from '../../../constants/config'
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';

const docList = [
  {title: '如何写出优雅的代码', uri: '#/docs/pretty-code', desc:'如何写出易于理解，维护，并且结构良好的代码', img: DOMAIN + 'docs/pretty-code.jpg', height: '22810px'},
  {title: '读redux源码笔记', uri: '#/docs/redux-source', desc:'redux源码解读', img: DOMAIN + 'docs/redux-source.jpg', height: '7550px'}
]


export class Blog extends Component {
  
  constructor(props){
    super(props);
    this.get_blog = this.get_blog.bind(this);
    this.state = {data: []};
  }

  componentDidMount(){
    // this.get_blog();
  }

  get_blog(){
    this.props.$$GET_BLOG.get_blog((res) => {
      this.setState({data: res.data});
    });
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

const mapStateToProps = state => ({
  $get_blog: state.blog
})

const mapDispatchToProps = dispatch => ({
  $$GET_BLOG: bindActionCreators(blogAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);

class DocList extends Component {
  render() {
    return (
      <div className="contents">
        <h2>教程，文档，博客</h2>
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