import * as React from 'react';
import expect from 'expect';
import {renderIntoDocument} from 'react-dom/test-utils';
import Common from 'test/common.js';
var commonData = new Common;
import Items from './Items'

const typeOfMedia='videos';

describe('App/components/ListItems/Items', function(){
        let itemsComponent =  renderIntoDocument(
            <Items
                typeOfMedia={typeOfMedia}
                allItemData={[commonData.itemComponentData]}
                sections={commonData.sections()}
                itemPath={commonData.itemPath()}
                itemClicked={commonData.itemClicked}
                itemLikeClicked={commonData.itemLikeClicked}
                isThisItemLiked={commonData.isThisItemLiked}
                isThisItemWatched={commonData.isThisItemWatched}
            />
        );
        it('Check State Data', ()=>{
            expect(itemsComponent.state.typeOfMedia).toEqual(typeOfMedia);
        });
        it('Click -> ITEM is clicked', ()=>{
            let clickOnItem = itemsComponent.itemClicked(commonData.itemComponentData.src);//simulate item click
            expect(commonData.itemComponentData.src).toEqual(itemsComponent.state.itemClicked);//check the state and ensure the correct data is stored
            expect(clickOnItem).toBe(true);  //check the click calls the function: itemClicked() in this file
        });
        it('Click -> LIKED is clickled', ()=>{
          let clickOnItemLike = itemsComponent.itemLikeClicked(commonData.itemComponentData.src);//simulate item click
          expect(commonData.itemComponentData.src).toEqual(itemsComponent.state.itemLiked);//check the state and ensure the correct data is stored
          expect(clickOnItemLike).toBe(true);  //check the click calls the function: itemClicked() in this file
        });
});
