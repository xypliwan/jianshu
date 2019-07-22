import React, { Component } from 'react';
import { HeaderWrapper,
    Logo,Nav,NavItem,
    NavSearch,Addition,
    Button,SearchWrapper,
    SearchInfo,SearchInfoTitle, SearchInfoSwitch,
    SearchInfoList,SearchInfoItem
    
 } from './style';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { actionCreators } from './store'
import { Link } from 'react-router-dom'

class Header extends Component {
    
    getListArea(){
        const { focused, list, page,totalPage,mouseIn,handChangePage, handleEnter,handleLeave } = this.props;
        const jsList = list.toJS()
        const pageList = [];
        if(jsList.length){
            for (let i = (page-1) * 5; i < page*5; i++) {
                pageList.push(
                    <SearchInfoItem key={i}>{jsList[i]}</SearchInfoItem>
                )
                
            }
        }
        
        if(focused || mouseIn){
            return (
                <SearchInfo onMouseEnter={()=>{handleEnter()}}
                onMouseLeave={()=>{handleLeave()}}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch
                            onClick={()=> handChangePage(page,totalPage,this.spinIcon)}
                            >
                            <i ref={(icon)=>this.spinIcon = icon}
                                className="iconfont spin">&#xe851;</i>    换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        }else{
            return null;
        }
    }

    render () {
        const { focused,handleInputFocus,handleInputBlur,list } = this.props;
        return (
            <HeaderWrapper>
                <Link to="/">
                    <Logo />
                </Link>
            
            <Nav>
                <NavItem className="left active">首页</NavItem>
                <NavItem className="left">下载APP</NavItem>
                <NavItem className="right">
                    <i className="iconfont">&#xe636;</i>
                </NavItem>
                <NavItem className="right">登陆</NavItem>
                <SearchWrapper>
                    <CSSTransition
                        timeout={200}
                        in={this.props.focused}
                        classNames="slide"
                    >
                        <NavSearch 
                            className={ focused ? 'focused': '' }
                            onFocus={ ()=> handleInputFocus(list)}
                            onBlur={handleInputBlur}
                            ></NavSearch>
                    </CSSTransition>
                    <i className={ focused ? 'focused iconfont zoom': 'iconfont zoom' } >&#xe614;</i>
                    { this.getListArea() }
                </SearchWrapper>
            </Nav>
            <Addition>
                <Button className="writting">
                    <i className="iconfont">&#xe615;</i>写文章</Button>
                <Button className="reg">注册</Button>
            </Addition>
        </HeaderWrapper>
        )
        
    }

    
}


const mapStateToProps = (state)=>{
    return {
        focused: state.getIn(['header', 'focused']),
        // state.get('header').get('focused')
        list: state.getIn(['header','list']),
        page: state.getIn(['header','page']),
        mouseIn:state.getIn(['header','mouseIn']),
        totalPage:state.getIn(['header','totalPage']),
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleInputFocus(list){
            // if(list.size > 0){
            //     dispatch(actionCreators.getList());
            // }
            (list.size === 0) && dispatch(actionCreators.getList());
            
            dispatch(actionCreators.searchFocus());
        },

        handleInputBlur(){
            dispatch(actionCreators.searchBlur());
        },

        handleEnter(){
            dispatch(actionCreators.mouseEnter())
        },
        handleLeave(){
            dispatch(actionCreators.handleLeave())
        },
        handChangePage(page,totalPage,spin){
            let originAngle = spin.style.transform.replace(/[^0-9]/ig,'')
            // console.log(originAngle)
            if(originAngle){
                originAngle = parseInt(originAngle,10)
            }else{
                originAngle = 0
            }
            spin.style.transform = `rotate(${originAngle+360}deg)`
            if(page<totalPage){
                dispatch(actionCreators.handChangePage(page+1))
            }else{
                dispatch(actionCreators.handChangePage(1))
            }
        }
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Header);