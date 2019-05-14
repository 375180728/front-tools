import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
const { TweenOneGroup } = TweenOne;

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-containers">
        <header>FE Assist - Improvement & Wiki</header>
        <div>
          <h2>
            What can <span>FE Assist</span> do for you
          </h2>
          <div className="title-line-wrapper page1-line">
            <div className="title-line" />
          </div>
          <Models />
        </div>
      </div>
    );
  }
}

class Models extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hoverNum: null
    };
  }

  onMouseOver(i) {
    this.setState({
      hoverNum: i
    });
  }

  onMouseOut(i) {
    this.setState({
      hoverNum: i + 3
    });
  }

  getEnter(e) {
    // console.log(1)
    const i = e.index;
    const r = Math.random() * 2 - 1;
    const y = Math.random() * 10 + 5;
    const delay = Math.round(Math.random() * (i * 50));
    return [
      {
        delay,
        opacity: 0.5,
        ...pointPos[e.index],
        ease: 'easeOutBack',
        duration: 300
      },
      {
        y: r > 0 ? `+=${y}` : `-=${y}`,
        duration: Math.random() * 1000 + 2000,
        yoyo: true,
        repeat: -1
      }
    ];
  }

  getLeave(e) {
    // console.log(2)
    return {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 300,
        ease: 'easeInBack'
      }
  }

  render() {
    const { hoverNum } = this.state;
    let children = [];
    featuresCN.forEach((item, i) => {
      const isHover = hoverNum === i;
      const pointChild = ['point-0 left', 'point-0 right', 'point-ring', 'point-1', 'point-2', 'point-3'].map(className => (
        <TweenOne
          component="i"
          className={className}
          key={className}
          style={{
            background: item.color,
            borderColor: item.color
          }}
        />
      ));
      const child = (
        <li key={i.toString()} onClick={() => (window.location.hash = item.uri)}>
          <div
            className="page1-box"
            onMouseEnter={() => {
              this.onMouseOver(i);
            }}
            onMouseLeave={() => {
              this.onMouseOut(i);
            }}
          >
            <TweenOneGroup
              className="page1-point-wrapper"
              enter={this.getEnter}
              leave={this.getLeave}
            >
              {isHover && pointChild}
            </TweenOneGroup>
            <div
              className="page1-image"
              style={{
                boxShadow: `${isHover ? '0 12px 24px' : '0 6px 12px'} ${item.shadowColor}`
              }}
            >
              <img src={item.src} alt="img" style={i === 4 ? { marginLeft: -15 } : {}} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        </li>
      );
      children.push(child);
    });
    children = children.map((item, i) => item);
    return <div><ul className="page1-box-wrapper">{children}</ul></div>;
  }
}

import Svg1 from '../../../i/home/1.svg';
import Svg2 from '../../../i/home/2.svg';
import Svg3 from '../../../i/home/3.svg';

const featuresCN = [
  {
    title: '分支同步',
    content: '自动关联GIT，同步管理各平台分支',
    src: Svg1,
    color: '#2F54EB',
    shadowColor: 'rgba(47,84,235,.12)',
    uri: '#/case/list'
  },
  {
    title: '课程列表',
    content: '分享React/Vue 等前端前沿技术',
    src: Svg2,
    color: '#F5222D',
    shadowColor: 'rgba(245,34,45,.12)',
    uri: '#/docs/list'
  },
  {
    title: '小工具',
    content: '各类前端小工具，包括动画插件等',
    src: Svg3,
    color: '#FAAD14',
    shadowColor: 'rgba(250,173,20,.12)',
    uri: '#/tools/list'
  }
];

const pointPos = [{ x: -30, y: -10 }, { x: 20, y: -20 }, { x: -65, y: 15 }, { x: -45, y: 80 }, { x: 35, y: 5 }, { x: 50, y: 50, opacity: 0.2 }];
