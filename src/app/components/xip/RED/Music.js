import React, { Component} from 'react';


// 음악 링크
export default class Music extends Component {

    componentDidMount(){
        console.log(this.props)
        window.location.replace(this.props.link)
    }

    render () {
        return(
            <></>
        )
    }
        
}