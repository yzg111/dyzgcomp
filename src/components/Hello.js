import React,{Component} from "react"
import PropTypes from 'prop-types';


export default class Hello extends Component{

    static propTypes = {
        /**
         *定义属性
         */
        // style: PropTypes.shape({
        //     color: PropTypes.string,
        //     fontSize: PropTypes.number,
        //     background: PropTypes.string,
        //     padding: PropTypes.string,
        // }),
        test:PropTypes.string
    };

    render(){
        const {test}=this.props;
        return(
            <div>测试修改Hello!{test?test:"没有传值过来！"}</div>
        );

    }
}