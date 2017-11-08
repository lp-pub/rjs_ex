import * as React from 'react';
import { findDOMNode } from 'react-dom/test-utils';
import { scryRenderedDOMComponentsWithClass as findByClass } from 'react-dom/test-utils';
import expect from 'expect';
import {renderIntoDocument} from 'react-dom/test-utils';
import {Simulate} from 'react-dom/test-utils';
import Common from 'test/common.js';
var commonData = new Common;
const hostName = commonData.testServerUrl(window.location.hostname);
import ItemListComponent from './ItemListComponent';

const itemComponentData={title:'test link', src:'drum_pick-up.mp4', src_thumbnail:'drum_pick-up.png'};
const numItemsRendered=1;
const testData = [
  { title: 'LIKED item, UNWATCHED', itemComponentData: itemComponentData, numItemsRendered: numItemsRendered, src: itemComponentData.src, src_thumbnail: itemComponentData.src_thumbnail, itemIsLiked:true, itemIsWatched:false },
  { title: 'UNLIKED item, UNWATCHED', itemComponentData: itemComponentData, numItemsRendered: numItemsRendered, src: itemComponentData.src, src_thumbnail: itemComponentData.src_thumbnail, itemIsLiked:false, itemIsWatched:false },
  { title: 'LIKED item, WATCHED', itemComponentData: itemComponentData, numItemsRendered: numItemsRendered, src: itemComponentData.src, src_thumbnail: itemComponentData.src_thumbnail, itemIsLiked:true, itemIsWatched:true },
  { title: 'UNLIKED item, WATCHED', itemComponentData: itemComponentData, numItemsRendered: numItemsRendered, src: itemComponentData.src, src_thumbnail: itemComponentData.src_thumbnail, itemIsLiked:false, itemIsWatched:true },
];

function itemClicked(e){
  //do nothing
}
function itemLikeClicked(e){
  //do nothing
}
describe('App/components/ListItems/ItemListComponent', function(){
    testData.map((testDataItem)=>{
        let item = renderIntoDocument(
                <ItemListComponent
                    numItemsRendered={testDataItem.numItemsRendered}
                    itemComponentData={itemComponentData}
                    src={itemComponentData.src}
                    itemIsLiked={testDataItem.itemIsLiked}
                    itemIsWatched={testDataItem.itemIsWatched}
                    itemPath={hostName}
                    itemClicked={itemClicked}
                    itemLikeClicked={itemLikeClicked}
                />
        );
        it(testDataItem.title + ' -> item exists', (done)=>{
              expect(item).toExist();
              done();
        });
        it(testDataItem.title + ' -> state data', (done)=>{
              expect(item.state.numItemsRendered).toEqual(testDataItem.numItemsRendered);
              expect(item.state.itemIsLiked).toEqual(testDataItem.itemIsLiked);
              expect(item.state.itemIsWatched).toEqual(testDataItem.itemIsWatched);
              expect(item.state.itemComponentData.src).toEqual(itemComponentData.src);
              done();
        });
        it(testDataItem.title + '-> link text', (done)=>{
              let linkObj = item.refs['item_'+parseInt(numItemsRendered)];
              expect(item.refs.linkText.innerHTML).toBe(itemComponentData.title);
              done();
        });
        it(testDataItem.title + '-> CSS of LIKE', (done)=>{
              let linkObj = item.refs['like_'+parseInt(numItemsRendered)];
              (testDataItem.itemIsLiked===true) ? expect(linkObj.className).toContain('liked') : expect(linkObj.className).toNotContain('liked');
              done();
        });
        it(testDataItem.title + '-> CSS of WATCHED', (done)=>{
              let linkObj = item.refs['item_'+parseInt(numItemsRendered)];
              (testDataItem.itemIsWatched) ? expect(linkObj.className).toBe('watched') : expect(linkObj.className).toBe('');
              done();
        });
        it(testDataItem.title + '-> click LINK and check WATCHED State and className are toggled correctly', (done)=>{
          item.itemClicked();
          let linkObj = item.refs['item_'+parseInt(numItemsRendered)];
          expect(item.state.itemIsWatched).toBe(true);//check the state
          expect(linkObj.className).toBe('watched');//check the className
          done();
        });
        it(testDataItem.title + '-> click LIKE and check LIKED State and className', (done)=>{
            //click the time to toggle
            item.itemLikeClicked();
            let linkObj = item.refs['like_'+parseInt(numItemsRendered)];
            if(testDataItem.itemIsLiked){
              expect(item.state.itemIsLiked).toBe(false);//check the state
              expect(linkObj.className).toNotContain('liked');//check the className
            }
            else{
              expect(item.state.itemIsLiked).toBe(true);//check the state
              expect(linkObj.className).toContain('liked')//check the className
            }
            //click again to ensure state toggles back to the original state
            item.itemLikeClicked();
            linkObj = item.refs['like_'+parseInt(numItemsRendered)];
            if(testDataItem.itemIsLiked){
              expect(item.state.itemIsLiked).toBe(true);//check the state
              expect(linkObj.className).toContain('liked');//check the className
            }
            else{
              expect(item.state.itemIsLiked).toBe(false);//check the state
              expect(linkObj.className).toNotContain('liked')//check the className
            }
            done();
        });
        it(testDataItem.title + '-> background image', (done)=>{
          let linkObj = item.refs['item_'+parseInt(numItemsRendered)];
          var stringToSearchFor = ( item.props.itemPath.includes('http') ) ? 'url(\"'+item.props.itemPath+item.state.itemComponentData.src_thumbnail+'\")' : 'url('+item.props.itemPath+item.state.itemComponentData.src_thumbnail+')' ;
          expect(linkObj.style.backgroundImage).toBe(stringToSearchFor);
          done();
        });

    });

});
