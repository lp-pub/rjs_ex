import * as React from 'react';
import expect from 'expect';
import {renderIntoDocument} from 'react-dom/test-utils';
import Common from 'test/common.js';
var commonData = new Common;
const testImages= commonData.testImages();
const hostName = commonData.testServerUrl(window.location.hostname);
import ItemPlayer from './ItemPlayer';

const testData = [
  { title: 'LIKED video', typeOfMedia: 'videos', src: testImages.videos, itemIsLiked:true, autoPlay:true },
  { title: 'UNLIKED video', typeOfMedia: 'videos', src: testImages.videos, itemIsLiked:false, autoPlay:true },
  { title: 'LIKED image', typeOfMedia: 'images', src: testImages.images, itemIsLiked:true, autoPlay:true },
  { title: 'UNLIKED image', typeOfMedia: 'images', src: testImages.images, itemIsLiked:false, autoPlay:true },
];

describe('App/components/ListItems/ItemPlayer', function(){
    testData.map((testDataItem)=>{
        const item = renderIntoDocument(
                <ItemPlayer
                    typeOfMedia={testDataItem.typeOfMedia}
                    src={testDataItem.src}
                    itemIsLiked={testDataItem.itemIsLiked}
                    autoPlay={testDataItem.autoPlay}
                />
        );
        let itemPlayerRef = (testDataItem.typeOfMedia == 'videos') ? item.refs.video : item.refs.image;

        it(testDataItem.title + '-> item and item player exist', (done)=>{
              expect(item).toExist();
              expect(itemPlayerRef) .toExist();
              done();
        });
        it(testDataItem.title + ' -> state tests', (done)=>{
              expect(item.state.typeOfMedia).toEqual(testDataItem.typeOfMedia);
              expect(item.state.liked).toEqual(testDataItem.itemIsLiked);
              expect(item.state.autoPlay).toEqual(testDataItem.autoPlay);
              done();
        });
        it(testDataItem.title + '-> src tests', (done)=>{
              expect(item.props.src).toEqual(testDataItem.src);
              expect(itemPlayerRef.src).toEqual(hostName+testDataItem.src);
              done();
        });
    });

});
