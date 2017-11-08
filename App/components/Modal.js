/*
********************************************************************************
    Modal - displayed on item list onCLick - displays images or videos
********************************************************************************
*/
import React from'react';

export default class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }
    }
    openModal () {
        this.props.self.setState({ isModalOpen: true });
    }
    closeModal () {
        this.props.self.setState({ isModalOpen: false })
    }
    playItem(clickedItemSrc){
        if(clickedItemSrc.currentTarget !== undefined){
            //this a call from the item onClick
            clickedItemSrc = currentTarget.dataset.src;
        }
        this.props.self.setState({
            currentItem: clickedItemSrc
        });
        this.props.self.state.ModalControls.openModal();
        this.props.self.addToWatchedItems(clickedItemSrc);
    }
    renderSkipButton(typeOfButton){
        if( typeOfButton=='next'){
            if(this.props.self.itemPosition(this.props.self.state.currentItem)>=(this.props.self.totalItems()-1)){return null};
        }
        else{
            if(this.props.self.itemPosition(this.props.self.state.currentItem)<1){return null};
        }
        return(
            <div
                id={typeOfButton+'Item'}
                className={ (typeOfButton=='next') ? "glyphicon glyphicon-chevron-right" : "glyphicon glyphicon-chevron-left" }
                ref={typeOfButton}
                onClick={e => this.skipItem(typeOfButton,e)}
            />
        )
    }
    skipItem(direction, e){
        let currentItemPosition=this.props.self.itemPosition(this.props.self.state.currentItem);
        if(direction=='prev' && currentItemPosition > 0){
            var nextPosition=currentItemPosition-1;
        }
        else if( direction=='next' && currentItemPosition < this.props.self.totalItems()-1 ){
            var nextPosition=currentItemPosition+1;
        }
        this.props.self.addToWatchedItems(this.props.self.state.allItemData[nextPosition].src);
        this.props.self.setState({currentItem: this.props.self.state.allItemData[nextPosition].src});//set the state
    }
    likeItemButton(thisItemSrc){
        return (
            <div
                id="likeButtonModal"
                className={ ( this.props.self.isThisItemLiked(thisItemSrc) ) ? 'glyphicon glyphicon-heart liked' : 'glyphicon glyphicon-heart' }
                onClick={this.likeItemButtonClicked.bind(this)}
                ref="modalLikeButton"
            />
        );
    }

    likeItemButtonClicked(){
        this.props.self.itemLikeClicked(this.props.self.state.currentItem);
    }
    close(e) {
        e.preventDefault()

        if (this.props.onClose) {
            this.props.onClose()
        }
        else{
        }
    }
    render() {
        if (this.props.isOpen === false){
            return null
        }
        return (
            <div>
                <div className="modalStyle" id="modal">
                    {this.props.children}
                    <div className="glyphicon glyphicon-remove" aria-hidden="true" id="closeModal" onClick={e => this.close(e)}></div>
                </div>
                <div className="backdrop" onClick={e => this.close(e)} />
            </div>
        )
    }
}
