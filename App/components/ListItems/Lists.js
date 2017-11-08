  /*
 ********************************************************************************
 Creates the lists for the media items i.e. lists of Videos or Images

 Lists.js
 ********************************************************************************
 */

import React from 'react';
import PropTypes from 'prop-types';
import ItemListComponent from './ItemListComponent.js';
import uuid from 'uuid';

export default class Lists extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sections:  this.props.sections,
            allItemData: this.props.allItemData
        };
    }
    createItemOpenComponent(itemComponentData, componentIndex, numItemsRendered){
        return (
            <ItemListComponent
                componentIndex={componentIndex}
                numItemsRendered={numItemsRendered}
                itemComponentData={itemComponentData}
                key={uuid.v4()}
                itemIsLiked={ this.isThisItemLiked(itemComponentData.src) }
                itemIsWatched={ this.isThisItemWatched(itemComponentData.src) }
                itemPath={this.props.itemPath}
                itemClicked={this.itemClicked.bind(this)}
                itemLikeClicked={this.itemLikeClicked.bind(this)}
            />
        );
    }
    createPlayItemSection(headingName, videoPlayData, index){
        return(
            <div key={uuid.v4()}>
                <h3>{headingName}</h3>
                <ul  key={uuid.v4()}>{videoPlayData}</ul>
            </div>
        );
    }
    createDataToRender(){
        let self=this;
        let i=0;
        let dataToRender = this.state.sections.map((headingName, index)=>{
            let itemDataMap = self.state.allItemData.map((itemData, index2)=>{
                if(itemData.section == headingName){
                    i++;
                    return self.createItemOpenComponent( itemData, index2, i);
                }
            });
            return self.createPlayItemSection(headingName, itemDataMap, index);
        });
        return dataToRender
    }
    itemClicked(clickedItemSrc){
        this.setState({itemClicked:clickedItemSrc},()=>{
            this.props.itemClicked(this.state.itemClicked);
        });
        return true;
    }
    itemLikeClicked(clickedLikeItemSrc){
        this.setState({itemLiked:clickedLikeItemSrc},()=>{
            this.props.itemLikeClicked(this.state.itemLiked);
        });
        return true;
    }
    isThisItemLiked(itemSrc){
        return this.props.isThisItemLiked(itemSrc)
    }
    isThisItemWatched(itemSrc){
        return this.props.isThisItemWatched(itemSrc)
    }
    render(){
        return(
            <div>
                {this.createDataToRender()}
            </div>
        );
    }
}

Lists.propTypes={
    sections: PropTypes.array.isRequired,
    allItemData:  PropTypes.array.isRequired,
    itemPath:  PropTypes.string.isRequired,
    itemClicked: PropTypes.func.isRequired,
    itemLikeClicked: PropTypes.func.isRequired,
    isThisItemLiked: PropTypes.func.isRequired,
    isThisItemWatched: PropTypes.func.isRequired,
};
