/*
 ********************************************************
 * Renders the lists of images or videos
 *
 * Items.js
 ********************************************************
 */

import React from 'react';
import PropTypes from 'prop-types';
import Lists from './Lists';

export default class Items extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            typeOfMedia: this.props.typeOfMedia
        };
    }
    itemClicked(clickedItemSrc){
        this.setState({itemClicked:clickedItemSrc},()=>{
            this.props.itemClicked(this.state.itemClicked);
        });
        return true
    }
    itemLikeClicked(clickedLikeItemSrc){
        this.setState({itemLiked:clickedLikeItemSrc},()=>{
            this.props.itemLikeClicked(this.state.itemLiked);
        });
        return true
    }
    isThisItemLiked(itemSrc){
        return this.props.isThisItemLiked(itemSrc);
    }
    isThisItemWatched(itemSrc){
        return this.props.isThisItemWatched(itemSrc);
    }
    render(){
        return (
            <div>
                <h2>{this.state.typeOfMedia}</h2>
                <div className="chooseItem" >
                    <Lists
                        allItemData={this.props.allItemData}
                        sections={this.props.sections}
                        itemPath={this.props.itemPath}
                        itemClicked={this.itemClicked.bind(this)}
                        itemLikeClicked={this.itemLikeClicked.bind(this)}
                        isThisItemLiked={this.isThisItemLiked.bind(this)}
                        isThisItemWatched={this.isThisItemWatched.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

Items.propTypes={
    typeOfMedia: PropTypes.string.isRequired,
    allItemData: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
    itemPath: PropTypes.string.isRequired,
    itemClicked: PropTypes.func.isRequired,
    itemLikeClicked: PropTypes.func.isRequired,
    isThisItemLiked: PropTypes.func.isRequired,
    isThisItemWatched: PropTypes.func.isRequired
}
