import * as React from 'react';
import expect from 'expect';
import {renderIntoDocument} from 'react-dom/test-utils';
import App from './App'

describe('App/components/Components/App', function(){
        var AppComponent = renderIntoDocument(
            <App />
        );
        it('AppComponent rendered', ()=>{
            expect(App).toExist;
        });
        it('Check state data', ()=>{
            expect(AppComponent.state.typeOfMedia).toEqual('videos');
            expect(AppComponent.state.selectedMenuItem).toEqual('videos');
        });
        it('Menu change', ()=>{
            let title='TestTitle1';
            var clickOnItem = AppComponent.menuChange( { currentTarget:{title: title } } );
            expect(AppComponent.state.typeOfMedia).toEqual(title);
            expect(AppComponent.state.selectedMenuItem).toEqual(title);
        });
        it('Set typeOfMedia', ()=>{
          let title='TestTitle2';
          var clickOnItem = AppComponent.setTypeOfMedia( title );
          expect(AppComponent.state.typeOfMedia).toEqual(title);
          expect(AppComponent.state.selectedMenuItem).toEqual(title);
        });
});
