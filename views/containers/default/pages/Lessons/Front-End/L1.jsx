import React, { Component } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Popover from 'antd/lib/popover';
import Icon from 'antd/lib/icon';
import backend from '../../../../../i/lesson/front-end/L1/backend.png'
import frontend from '../../../../../i/lesson/front-end/L1/frontend.png'
import uier from '../../../../../i/lesson/front-end/L1/uier.png'
import weber from '../../../../../i/lesson/front-end/L1/weber.png'
import stackfull from '../../../../../i/lesson/front-end/L1/backend.png'

export default class L1 extends Component {
  render() {
    return (
      <div className="lessonOne-container">
        <ReactFullpage
          render={({ state, fullpageApi }) => {
            return (
              <ReactFullpage.Wrapper>
                <div className="section p1">
                  <h3>互联网公司研发团队的运作流程</h3>
                  <p className='image-1'>
                    <Popover placement="left" title='SETP1' content={<Idea />} >
                      <a className='step1 steps'>
                        <span className='number'>1</span>
                      </a>
                    </Popover>
                    <Popover placement="left" title='SETP2' content={<Information />} >
                      <a className='step2 steps'>
                        <span className='number'>2</span>
                      </a>
                    </Popover>
                    <Popover placement="right" title='SETP3' content={<Strategies />} >
                      <a className='step3 steps'>
                        <span className='number'>3</span>
                      </a>
                    </Popover>
                    <Popover placement="right" title='SETP4' content={<Design />} >
                      <a className='step4 steps'>
                        <span className='number'>4</span>
                      </a>
                    </Popover>
                    <Popover placement="right" title='SETP5' content={<Development />} >
                      <a className='step5 steps'>
                        <span className='number'>5</span>
                      </a>
                    </Popover>
                    <Popover placement="left" title='SETP6' content={<Testing />} >
                      <a className='step6 steps'>
                        <span className='number'>6</span>
                      </a>
                    </Popover>
                    <Popover placement="right" title='SETP7' content={<Launch />} >
                      <a className='step7 steps'>
                        <span className='number'>7</span>
                      </a>
                    </Popover>
                  </p>
                  <Next next={() => fullpageApi.moveSectionDown()}/>
                </div>
                <div className="section p2">
                  <h3>
                    前端在开发中担任的角色
                  </h3>
                  <p className="image-2">
                    <Popover placement="right" title="UI设计狮" content={<Ui/>}>
                      <a className="pa-2">
                        <img src={uier} alt=""/>
                      </a>
                    </Popover>
                  </p>
                  <Next next={() => fullpageApi.moveSectionDown()}/>
                </div>
                <div className="section p3">
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </div>
    );
  }
}

export class Next extends Component {
  render() {
    return (
      <div className='next' onClick={() => this.props.next()}>
        <Icon type="double-right" />
      </div>
    )
  }
}


export class Idea extends Component {
  render() {
    return (
      <div>
        一个产品（功能）的开始往往都源于一个想法（Idea）<br/>
        这个想法可能来自于产品经理（Product Manager）<br />
        也有可能直接来源于客户（Customer）<br />
        这群有着奇奇怪怪想法的人创造诸多优秀的应用<br />
        <a href='https://www.zhihu.com/question/288032791' target='_blank'>但也有例外</a>
      </div>
    )
  }
}

export class Information extends Component {
  render() {
    return (
      <div>
        有了想法并非直接付诸实施<br/>
        对于新的项目，或者较为复杂的功能模块，我们还需要对市场调研<br />
        同事还得了解目标人群，市场定位，分析可行性等等<br />
        有经验的同事常常会在这个期间制作<a href='https://www.xmind.cn/' target='_blank'>思维导图</a>来将想法可视化 <br />
      </div>
    )
  }
}

export class Strategies extends Component {
  render() {
    return (
      <div>
        在交由研发团队开始开发之前<br/>
        研发团队的大佬们（Team Leader/ Team Manager）<br/>会坐下来一起讨论这个需求在系统层面的可行性<br />
        <b>产品经理：</b>脑电波控制+VR设备在线大型3D网游市场很大<br />
        <b>研发经理：</b>请你滚出去 <br />
        同时，也会初步定下研发计划
      </div>
    )
  }
}

export class Design extends Component {
  render() {
    return (
      <div>
        接下来交由设计团队<a href='https://www.zhihu.com/question/27928975' target='_blank'>UED（User Experience Design）</a><br/>
        进行视觉设计，最终产出研发所需素材
      </div>
    )
  }
}

export class Development extends Component {
  render() {
    return (
      <div>
        研发团队（Development & Research）分工开始研发<br />
        前端开发（Front-End）创建Web页面或app等前端界面呈现给用户<br />
        后端开发（Back-End）为前端网页或者app小程序提供服务<br />
        <div style={{color: 'firebrick'}}>
          值得注意的是：<br/>
          1. 开发过程并非一定在设计交付后，对于后端开发而言，通常会与设计团队并行工作<br/>
          2. 后端可分为多种语言JAVA/PHP/.NET等，而前端笼统的讲只有一种语言Javascript
        </div>
      </div>
    )
  }
}

export class Testing extends Component {
  render() {
    return (
      <div>
        当研发过程到达一定程度的时候<br/>就会提交给测试团队QA（Quality Assurance）进行测试<br />
        在测试过程中，不仅要找出软件的BUG，还需提高系统的性能 <br />
        <div style={{color: 'firebrick'}}>
          虽然很多时候企业要求测试团队承担QA的责任<br/>
          但实际上多数测试团队只会承担QC（Quality Control）的工作<br/>
          <a href='https://www.jianshu.com/p/b691d17c37dd' target='_blank'>QA与QC的区别</a>
        </div>
      </div>
    )
  }
}

export class Launch extends Component {
  render() {
    return (
      <div>
        当系统质量符合测试通过标准后（并非无BUG才能上线）<br/>
        交由运维团队（Operations Team）进行发布上线<br/>
        运维团队会维护并确保整个服务的高可用性，同时不断优化系统架构提升部署效率<br/>
        对系统的试试监控和预警也是运维团队的重要职责
      </div>
    )
  }
}

export class Ui extends Component {
  render(){
    return (
      <div>
        aaaaaa
      </div>
    )
  }
}