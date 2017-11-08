import React from 'react';

export default class Nav extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            navItems:  [{ title:'videos', url:'/video'}, {title:'images',url:'/images'}],
            selectedMenuItem: 'videos'
        };
    }
    navBarClick(event){
        this.setState({selectedMenuItem:event.currentTarget.title});
    }
    generateNavItem(item,index){
        var menuChange =   this.props.menuChange;
        return(
            <li className={(item.title==this.props.selectedMenuItem) ? "selected" : ""} key={index}>
                <a onClick={e => menuChange(e)} title={item.title} ref={'menuItem_'+index}>{item.title}</a>
            </li>
        )
    }
    generateNavItems(){
        var self=this;
        var navItems=this.state.navItems.map(function(item, index){
            return(
                self.generateNavItem(item,index)
            );
        });
        return (
            navItems
        );
    }
    setTypeOfMedia(mediaType){
        let returnedData = this.props.setTypeOfMedia(mediaType);
        return returnedData;
    }
    componentWillMount(){
        if(this.props.navItems!==undefined){
            this.setState({
               navItems: this.props.navItems
            });
            this.setTypeOfMedia(this.props.navItems[0].title);
        }
    }
    render(){
        return(
            <div id="topNav">
                <div className="col-sm-1 col-md-2" />
                <div className="navContainer col-sm-10 col-md-8 ">
                    <nav ref="nav">
                        <ul>
                            {this.generateNavItems()}
                        </ul>
                    </nav>
                </div>
                <div className="col-sm-1 col-md-2" />
            </div>
        )
    }
};
