import React, { PureComponent } from 'react';

import Topic from './components/Topic';
import Recomend from './components/Recomend';
import List from './components/List';
import Writer from './components/Writer';
import { HomeWrapper,HomeLeft,HomeRight,BackTop } from './style';
import { connect } from 'react-redux';
import { actionCreators } from './store'

class Home extends PureComponent {

    handleTop(){
        window.scrollTo(0,0)
    }
    render() { 
        return ( 
            <HomeWrapper>
                <HomeLeft>
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recomend />
                    <Writer />
                </HomeRight>
                {
                    this.props.showScroll ? <BackTop onClick={this.handleTop}>回到顶部</BackTop> : null
                }
                
            </HomeWrapper> 
        );
    }

    componentDidMount(){
        this.props.changeHomeData();
        this.bindEvents();
    }

    componentWillUnmount(){     //销毁组件时
        window.removeEventListener('scroll',this.props.changeScrollTopShow)
    }

    bindEvents(){
        window.addEventListener('scroll',this.props.changeScrollTopShow)
    }

    
}

const mapState = (state) =>({
    showScroll:state.getIn(['home','showScroll'])
})
const mapDispatch = (dispatch)=>({
    changeHomeData(){
        const action = actionCreators.getHomeInfo();
        dispatch(action)
    },

    changeScrollTopShow(){
        // console.log(document.documentElement.scrollTop)
        if(document.documentElement.scrollTop > 400){
           const action = actionCreators.toggleTopShow(true);
            dispatch(action)
        }else{
            const action = actionCreators.toggleTopShow(false);
            dispatch(action)
        }
    }
})
export default connect(mapState,mapDispatch)(Home) ;