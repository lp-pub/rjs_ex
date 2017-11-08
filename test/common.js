import React from 'react';

//TODO move these into the state
var itemClickedVal=false;
var itemLikeClickedVal=false;

export default class testData extends React.Component {
  /* Items.test.js and Lists.test.js - START */
  numItemsRendered(){
    return 1;
  }
  itemComponentData(){
      return {
          title:'test link',
          src:'drum_pick-up.mp4',
          src_thumbnail:'drum_pick-up.png'
        };
  }
  allItemData(){
    let allItemDataArray = [];
    this.sections().map((section, index)=>{
      let dataToStore=this.itemComponentData();
      dataToStore.section=section;
      dataToStore.title+=' '+index;
      allItemDataArray.push(dataToStore);
    });
    return allItemDataArray;
  }
  sections(){
    //do experiment with doing alway with the need to call() - perhaps losing the return?
      return ['Test Section 0', 'Test Section 1', 'Test Section 2'];
  }
  itemPath(){
      return '/images/';
  }
  /* Items.test.js and Lists.test.js - END */
  testServerUrl(hostName){
    return (hostName == '' ) ? '' : 'http://localhost:8081/';
  }
  testImages(){
    return {videos: "videos/drum_pick-up.mp4", images: "images/IMG_1406.JPG"};
  }

  itemClicked(){
    itemClickedVal=true;
    return true;
  }

  itemLikeClicked(){
    itemLikeClickedVal=true;
    return true;
  }
  isThisItemLiked(){
    return true;
  }
  isThisItemWatched(){
    return true;
  }
  render(){
    return(
      <div>
        {this.testServerUrl()}
      </div>
    )
  }
}
