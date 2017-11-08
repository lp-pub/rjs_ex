import * as React from 'react';
import expect from 'expect';
import * as TestUtils from 'react-dom/test-utils';
import Nav from './Nav';

describe('App/components/Components/Nav', function(){
    var navItems = {};
    const selectedMenuItem = 'videos';

    function menuChange(selectedTitle){
        return selectedTitle;
    }
    function setTypeOfMedia(selectedMedia){
        return selectedMedia;
    }

    const NavComponent = TestUtils.renderIntoDocument(
        <Nav
            menuChange={menuChange}
            setTypeOfMedia={setTypeOfMedia}
            selectedMenuItem={selectedMenuItem}
        />
    );
    it('ModalComponent rendered', ()=>{
        expect(NavComponent).toExist;
    });
    it('Nav Items', ()=>{
        navItems=NavComponent.state.navItems;//to be used later
        expect (NavComponent.state.navItems.length).toBeGreaterThan(0);//is there at least one nav item?
    });
    it('State Tests', ()=>{
        expect (NavComponent.state.navItems.length).toBeGreaterThan(0);//is there at least one nav item?
        expect( NavComponent.state.selectedMenuItem ).toBe(navItems[0].title);
    });
    it('generateNavItem', ()=>{
        let navItemIndex=0;
        let navItems=NavComponent.state.navItems;
        let navItemToTest=navItems[navItemIndex];
        let NavItem = NavComponent.generateNavItem(navItemToTest,navItemIndex);
        //check if the item should be selected and if so is the className set correctly?
        (navItemToTest.title == NavComponent.state.selectedMenuItem) ? expect(NavItem.props.className).toEqual('selected') : expect(NavItem.props.className).toEqual('');
        //check the clickable <a> object
        let linkObj = NavItem.props.children;
        expect(linkObj.props.title).toEqual(navItemToTest.title);
        expect(linkObj.ref).toEqual('menuItem_'+navItemIndex);
        expect(linkObj.props.children).toEqual(navItemToTest.title);//<a>this text</a>
        expect( linkObj.props.onClick(navItemToTest.title) ).toEqual(navItemToTest.title);//test click
    });
    it('generateNavItems', ()=>{
        let returnedNavItems=NavComponent.generateNavItems();
        expect(navItems.length).toEqual(returnedNavItems.length);
        returnedNavItems.map( (navItemElement, index)=>{
            //check if the item should be selected and if so is the className set correctly?
            (navItems[index].title == NavComponent.state.selectedMenuItem) ? expect(navItemElement.props.className).toEqual('selected') : expect(navItemElement.props.className).toEqual('');
            let linkObj = navItemElement.props.children;
            expect(linkObj.props.title).toEqual(navItems[index].title);
            expect(linkObj.ref).toEqual('menuItem_'+index);
            expect(linkObj.props.children).toEqual(navItems[index].title);//<a>this text</a>
            expect( linkObj.props.onClick(navItems[index].title) ).toEqual(navItems[index].title);//test click
        });
    });
    it('Clickable Items Rendered Correctly', ()=>{
        var renderedNavItems=TestUtils.scryRenderedDOMComponentsWithTag(NavComponent,'li');
        expect(navItems.length).toEqual(renderedNavItems.length);
        renderedNavItems.map( (navItemElement, index)=>{
            //check if the item should be selected and if so is the className set correctly?
            (navItems[index].title == NavComponent.state.selectedMenuItem) ? expect(navItemElement.className).toEqual('selected') : expect(navItemElement.className).toEqual('');
            let linkObj = navItemElement.children;
            expect(linkObj[0].title).toEqual(navItems[index].title);
        });
    });
    it('setTypeOfMedia', ()=>{
        let typeOfMedia = (navItems.length>0) ? navItems[1].title : navItems[0].title;//if possible select a new menu item
        let returnedData = NavComponent.setTypeOfMedia(typeOfMedia);
        expect(returnedData).toEqual(typeOfMedia);
    });
    it('navBarClick', ()=>{
        let currentSelectedItem=NavComponent.state.selectedMenuItem;
        let title = (navItems.length>0) ? navItems[1].title : navItems[0].title;//if possible select a new menu item
        let clickOnItem = NavComponent.navBarClick( { currentTarget:{title: title } } );
        expect(NavComponent.state.selectedMenuItem).toEqual(title);
    });
});
