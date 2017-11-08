/*
 ********************************************************
 * Renders the item player
 *
 * ImagesPlayer.js
 ********************************************************
 */

import React from 'react';

export default class ItemPlayer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            typeOfMedia: this.props.typeOfMedia,
            liked: this.props.itemIsLiked,
            autoPlay: this.props.autoPlay
        };
    }
    render(){
        return(
            <div>
                 {(this.state.typeOfMedia=='videos') ?
                    <div className="itemPlayerImageContainer">
                        <video controls type="video/mp4" id="itemPlayer" preload src={this.props.src} ref="video" autoPlay={this.state.autoPlay} />
                    </div>
                    :
                    <div className="itemPlayerImageContainer">
                        <img id="itemPlayer" src={this.props.src} ref="image"  />
                    </div>
                }
            </div>
        );
    }
};
