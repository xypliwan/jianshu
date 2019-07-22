import React, { PureComponent } from 'react';
import { RecommendWrapper,RecommendItem } from './../style'
import { connect } from 'react-redux'

class Recomend extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <RecommendWrapper>
                {
                    this.props.list.map((item)=>{
                        return (
                            <RecommendItem imgUrl={item.get('imgUrl')} key={item.get('id')}>
                            </RecommendItem>
                        )
                    })
                }
                
            </RecommendWrapper> 
        );
    }
}
 
const mapState = (state)=>({
    list:state.getIn(['home','recomendList'])
})
export default connect(mapState,null)(Recomend) ;