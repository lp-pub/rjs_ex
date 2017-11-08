import * as React from 'react';
import expect from 'expect';
import * as TestUtils from 'react-dom/test-utils';
import ListItems from './ListItems';
import mediaJSON from './ListItems/Media.json';

describe('App/components/Components/ListItems', function(){
        function isModalOpen(ListItemsComponent, ){
            try{
                let modalObj = TestUtils.findRenderedDOMComponentWithClass(
                    ListItemsComponent,
                    'modalStyle'
                );
                if(modalObj.getAttribute('id') == 'modal'){
                    return true;
                }
                else{
                    return false;
                }
            }
            catch(e){
                //we are expecting the modal to not exist so an error is a good thing
                return false;
            }
        }

        const testItemData=mediaJSON.videos[2];//row of data to use as test
        var itemPosition=0;//initialise this var - will be set to correct value later
        const ListItemsComponent = TestUtils.renderIntoDocument(
            <ListItems typeOfMedia="videos" />
        );
        const allItemData=ListItemsComponent.state.allItemData;

        it('ListItemsComponent rendered', ()=>{
            expect(ListItemsComponent).toExist;
        });
        it('Check state data', ()=>{
            expect(ListItemsComponent.state.typeOfMedia).toEqual('videos');
            expect(ListItemsComponent.state.isModalOpen).toEqual(false);
            expect(ListItemsComponent.state.currentItem).toEqual(null);
            expect(ListItemsComponent.state.mediaData).toEqual(mediaJSON);
            expect(ListItemsComponent.state.videoAutoPlay).toEqual(true);
            expect(ListItemsComponent.state.itemPath).toEqual('../videos/');
        });
        it('buildItemsStateTable', (done)=>{
            let allItemDataReturned =  ListItemsComponent.buildItemsStateTable();
            expect( allItemDataReturned[itemPosition].src ).toEqual(allItemData[itemPosition].src);
            done();
        });
        it('itemPosition', ()=>{
          let thisItemPosition;
          let currentPosition=allItemData.map((item,index)=>{
              (item.src == testItemData.src) ? thisItemPosition=index : null;
          });
          let returneditemPosition =   ListItemsComponent.itemPosition(testItemData.src);
          expect(thisItemPosition).toBe(returneditemPosition);

          itemPosition = thisItemPosition;//to be used in other tests
        });
        it('setItemToLiked', ()=>{
          ListItemsComponent.setItemToLiked(testItemData.src);
          expect(ListItemsComponent.state.allItemData[itemPosition].itemIsLiked).toBe(true);
        });
        it('unsetItemToLiked', ()=>{
          ListItemsComponent.unsetItemToLiked(testItemData.src);
          expect(ListItemsComponent.state.allItemData[itemPosition].itemIsLiked).toBe(false);
        });
        it('itemLikeClicked', ()=>{
          //check like state
          ListItemsComponent.itemLikeClicked(testItemData.src);
          expect(ListItemsComponent.state.itemLiked).toBe(testItemData.src);
          //check like state is reset
          ListItemsComponent.itemLikeClicked(testItemData.src);
          expect(ListItemsComponent.state.itemLiked).toBe('');
        });
        it('addToWatchedItems', ()=>{
          ListItemsComponent.addToWatchedItems(testItemData.src);
          expect(ListItemsComponent.state.allItemData[itemPosition].watched).toBe(true);
        });
        it('isThisItemWatched', ()=>{
          let returnedValue = ListItemsComponent.isThisItemWatched(testItemData.src);
          expect(returnedValue).toBe(true);
        });
        it('totalItems', ()=>{
          let totalItems = allItemData.length;
          expect( ListItemsComponent.totalItems() ).toBe(totalItems);
        });
        it('Modal -> Open', ()=>{
          ListItemsComponent.state.ModalControls.playItem(testItemData.src);
          expect( isModalOpen(ListItemsComponent) ).toBe(true);
        });
        it('Modal -> Close', ()=>{
          ListItemsComponent.state.ModalControls.closeModal();
          expect( isModalOpen(ListItemsComponent) ).toBe(false);
        });
        it('itemClicked', ()=>{
            ListItemsComponent.state.allItemData[itemPosition].watched=false;//reset the watched state
            ListItemsComponent.itemClicked(testItemData.src);
            expect(ListItemsComponent.state.itemClicked).toBe(testItemData.src);
            expect( isModalOpen(ListItemsComponent) ).toBe(true);
        });
});
