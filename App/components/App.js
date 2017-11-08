/*
*
*  to supply custom menu items or change from the default of videos and images
* pass over the required nav items
* <Nav navItems={ [{ title:'videos', url:'/video'}, {title:'images',url:'/images'}] } />
*
 * */

import React from 'react';
import ListItems from './ListItems';
import Nav from './Nav';

export default class AppComponent extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            typeOfMedia: 'videos',
            selectedMenuItem: 'videos'
        }
    }
    menuChange(event){
        this.setState({
            selectedMenuItem: event.currentTarget.title,
            typeOfMedia: event.currentTarget.title
        });
    }
    setTypeOfMedia(menuItem){
        this.setState({
            selectedMenuItem: menuItem,
            typeOfMedia: menuItem
        });
    }
    render() {
        return(
            <div>
                <Nav
                    menuChange={this.menuChange.bind(this)}
                    setTypeOfMedia={this.setTypeOfMedia.bind(this)}
                    selectedMenuItem={this.state.selectedMenuItem}
                />
                {(this.state.typeOfMedia == 'videos') ?
                        <div>
                            <ListItems typeOfMedia="videos" />
                        </div>
                    :
                        <ListItems typeOfMedia="images" />
                }
            </div>
        )
    }
}
