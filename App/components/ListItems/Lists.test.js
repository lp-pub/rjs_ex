import * as React from 'react';
import expect from 'expect';
import * as TestUtils from 'react-dom/test-utils';
import {renderIntoDocument} from 'react-dom/test-utils';
import Common from 'test/common.js';
var commonData = new Common;
const hostName = commonData.testServerUrl(window.location.hostname);
import {testServerUrl} from 'test/common.js'
import Lists from './Lists'

describe('App/components/ListItems/Lists', function(){
        var listComponent = renderIntoDocument(
            <Lists
                allItemData={commonData.allItemData()}
                sections={commonData.sections()}
                itemPath={commonData.itemPath()}
                itemClicked={commonData.itemClicked}
                itemLikeClicked={commonData.itemLikeClicked}
                isThisItemLiked={commonData.isThisItemLiked}
                isThisItemWatched={commonData.isThisItemWatched}
            />
        );
        it('ListComponent Rendered', ()=>{
            expect(listComponent).toExist;
        });
        it('Check State Data', ()=>{
            expect(listComponent.state.sections).toEqual(commonData.sections());
            expect(listComponent.state.allItemData).toEqual(commonData.allItemData());
        });

        //check rendered data is correct - check all sections exist
        it('Check Rendered Data -> Section Headings', ()=>{
          let headingsTags = TestUtils.scryRenderedDOMComponentsWithTag(listComponent, 'h3');//get all the <h3> tags
          headingsTags.map((headingItem,index)=>{
              expect(headingItem.textContent).toContain(commonData.sections()[index]);
          });
        });
        it('Check Rendered Data -> Item Data -> Title, src, backgroundImage (src_thumbnail), section', ()=>{
          let liTags = TestUtils.scryRenderedDOMComponentsWithTag(listComponent, 'li');//get all the <h3> tags
          liTags.map((liItem,index)=>{
              for(let i=0;i<liItem.children.length;i++){
                if(liItem.children[i].id.includes('item')){
                  //this is a link component
                  var stringToSearchFor = ( hostName.includes('http') ) ? 'url(\"'+commonData.itemPath()+commonData.allItemData()[index].src_thumbnail+'\")' : 'url('+commonData.itemPath()+commonData.allItemData()[index].src_thumbnail+')' ;
                  expect(liItem.children[i].getAttribute('data-src')).toEqual(commonData.allItemData()[index].src);//check the src
                  expect(liItem.children[i].style.backgroundImage).toEqual(stringToSearchFor);//check the background image - i.e. the thumb_src
                  expect(commonData.sections()[index]).toEqual(commonData.allItemData()[index].section);//check the section
                  //check the title`
                  for(let j=0;j<liItem.children[i].length;j++){
                    if(liItem.children[i].children[j].className.includes('linkText') ){
                      let linkText=liItem.children[i].children[j].textContent;
                      expect(linkText).toEqual(allItemData()[index].title);
                    }
                  };
                }else if(liItem.children[i].id.includes('like')){
                  //this is a like component
                }
              }
          });
        });
        it('Click -> ITEM is clicked', ()=>{
            let clickOnItem = listComponent.itemClicked(commonData.itemComponentData.src);//simulate item click
            expect(commonData.itemComponentData.src).toEqual(listComponent.state.itemClicked);//check the state and ensure the correct data is stored
            expect(clickOnItem).toBe(true);  //check the click calls the function: itemClicked() in this file
        });
        it('Click -> LIKED is clickled', ()=>{
          let clickOnItemLike = listComponent.itemLikeClicked(commonData.itemComponentData.src);//simulate item click
          expect(commonData.itemComponentData.src).toEqual(listComponent.state.itemLiked);//check the state and ensure the correct data is stored
          expect(clickOnItemLike).toBe(true);  //check the click calls the function: itemClicked() in this file
        });
});
