SetBackKeyHandler();
var page = {
    currentItem: { vert: 0, horz: 0 }, //vertical: lengthOfColumn, horizontal: countOfColumn
    activeHandler: "",
	oldHandler: "",
	activeMenu: "",
    countOfColumn: 3,
    lengthOfColumn: 9,
    languageList: ["eng", "tur", "ita", "ger", "fre", "spa", "dut"],
    language: "",
    width: 1920, //pixel
    height: 1080, //pixel
    mainMenuMargin: 105, //pixel
    titleVertMargin: 105, //pixel
    mainMenuWidth: 1705, //pixel
    mainMenuHeight: 810, //pixel
    columnWidth: 500, //pixel
    columnHeight: 810, //pixel 9*90
    columnGap: 105, //pixel
    itemIconWidth: 90, //pixel
    itemTextWidth: 392, //pixel
    itemInnerGap: 18, //pixel
    eibTitleHeight: 60, //pixel
    eibTitleFontSize: 35, //pixel
    itemTextFontSize: 36, //pixel
    itemTextActiveFontSize: 42, //pixel
    contentMenuWidth: 1160, //pixel
    contentMenuHeight: 850, //pixel
    contentHorzMargin: 655, //pixel
    contentVertMargin: 165, //pixel
    contentHeadTextFontSize: 45, //pixel
    contentBodyTextFontSize: 36, //pixel
    contentTextLineHeight:  102 //pixel
};

var misc = {
    mainMenuMargin: 0, //(105*100)/1920 - horizontal start point of main menu
    titleVertMargin: 0, //(105*100)/1080 - vertical start point of eib title
    mainMenuWidth: 0, //(1705*100)/1920 - 1705px on 1920px page
    mainMenuHeight: 0, //(810*100)/1080 - 810px on 1080px page
    columnWidth: 0, //(500*100)/1705 - 500px on 1920px width page
    columnHeight: 0, //100 - 100% same height with main menu
    columnGap: 0, //(105*100)/1920 - 105px on 1080px page
    itemOuterWidth: 0, //100 - 100% (same width with column width)
    itemOuterHeight: 0, //100/9 - 11.111% (column height divine item count)
    itemIconHeight: 0, //100 - 100% (same height width itemOuterHeight)
    itemIconWidth: 0, //(90*100)/500 - 90px on 500px width column
    itemTextHeight: 0, //100 - 100% (same height width itemOuterHeight)
    itemTextWidth: 0, //(392*100)/500 - 392px on 500px width column
    itemInnerGap: 0, //(18*100)/500 - 18px on 500px width item
    eibTitleHeight: 0, //(60*100)/1080 - 60px on 1080 height page
    eibTitleFontSize: 0, //(100*35)/1920 - 35px on 1920 width viewport
    itemTextFontSize: 0, //(100*36)/1920 - 36px on 1920 width viewport
    itemTextActiveFontSize: 0, //(100*45)/1920 - 36px on 1920 width viewport
    contentMenuWidth: 0, //(1160*100)/1920 - 1160px on 1920px width page
    contentMenuHeight: 0, //(850*100)/1080 - 850px on 1080px height page
    contentHorzMargin: 0, //(650*100)/1920 - 650px on 1920px width page
    contentVertMargin: 0, //(165*100)/1080 - 165px on 1080px height page
};

var setMisc = function () {
    misc.mainMenuMargin = (page.mainMenuMargin * 100) / page.width;
    misc.titleVertMargin = (page.titleVertMargin * 100) / page.height;
    misc.mainMenuWidth = (page.mainMenuWidth * 100) / page.width;
    misc.mainMenuHeight = (page.mainMenuHeight * 100) / page.height;
    misc.columnWidth = (page.columnWidth * 100) / page.mainMenuWidth;
    misc.columnHeight = 100; //percent
    misc.columnGap = (page.columnGap * 100) / page.width;
    misc.itemOuterWidth = 100; // percent
    misc.itemOuterHeight = 100 / page.lengthOfColumn; // percent
    misc.itemIconHeight = 100; //percent
    misc.itemIconWidth = (page.itemIconWidth * 100) / page.columnWidth;
    misc.itemTextHeight = 100;
    misc.itemTextWidth = (page.itemTextWidth * 100) / page.columnWidth;
    misc.itemInnerGap = (page.itemInnerGap * 100) / page.columnWidth;
    misc.eibTitleHeight = (page.eibTitleHeight * 100) / page.height;
    misc.eibTitleFontSize = (100 * page.eibTitleFontSize) / page.width; //viewport unit to be responsive
    misc.itemTextFontSize = (100 * page.eibTitleFontSize) / page.width; //viewport unit to be responsive
    misc.itemTextActiveFontSize = (100 * page.itemTextActiveFontSize) / page.width; //viewport unit to be responsive
    misc.contentMenuWidth = (page.contentMenuWidth * 100) / page.width;
    misc.contentMenuHeight = (page.contentMenuHeight * 100) / page.height;
    misc.contentHorzMargin = (page.contentHorzMargin * 100) / page.width;
    misc.contentVertMargin = (page.contentVertMargin * 100) / page.height;
}


var scroll = {
    lineHeight: 0,
    contentHeight: 0,
    selectedTextHeight: 0,
    scrollingTime: 0,
    scrollingIndex: 0,
    innerContentTopMargin: 0,

    scrollDivHeight: 0,
    scrollBarHeight: 0,
    scrollBarNewMargin: 0
};

var Start = function () {
    setMisc();
    StartMenu();
}

var StartMenu = function () {
    mainMenu.Create();
    mainMenu.Activate();
    mainMenu.Load();
    mainMenu.Select();
    document.onkeydown = keyEventListener;
    $('body').css('opacity', 1);
}

var keyEventListener = function (evt) {
    var evtobj = evt ? evt : window.event;
    var unicode = evtobj.keyCode ? evtobj.keyCode : evtobj.which;

    if (page.activeHandler(unicode)) {
        evt.preventDefault();
    }
}

var KEYS = {
UP: 38,
DOWN: 40,
RIGHT: 39,
LEFT: 37,
BACKSPACE: 48,
OK: 13,
DEL: -7,
TAB: -9,
ESC: -27,
COMMA: -188,
PAGEUP: -33,
PAGEDOWN: -34,
NEXTPART: 0,
PREPART: 0
};

window.onload = Start;

var mainMenu = {
    Handler: function (key) {
        switch (key) {
            case KEYS.UP:
                if (page.currentItem.vert > 0) {
                    mainMenu.DeactivateScrolling();
                    mainMenu.Deselect();
                    page.currentItem.vert = page.currentItem.vert - 1;
                    mainMenu.Select();
                    mainMenu.ActivateScrolling();
                }
				else{
					searchMenu.Activate();
				}
                break;
            case KEYS.DOWN:
                if (page.currentItem.vert < page.lengthOfColumn - 1) {
                    mainMenu.DeactivateScrolling();
                    mainMenu.Deselect();
                    page.currentItem.vert = page.currentItem.vert + 1;
                    mainMenu.Select();
                    mainMenu.ActivateScrolling();
                }
                break;
            case KEYS.RIGHT:
                if (page.currentItem.horz < page.countOfColumn - 1) {
                    mainMenu.DeactivateScrolling();
                    mainMenu.Deselect();
                    page.currentItem.horz = page.currentItem.horz + 1;
                    mainMenu.Select();
                    mainMenu.ActivateScrolling();
                }
                break;
            case KEYS.LEFT:
                if (page.currentItem.horz > 0) {
                    mainMenu.DeactivateScrolling();
                    mainMenu.Deselect();
                    page.currentItem.horz = page.currentItem.horz - 1;
                    mainMenu.Select();
                    mainMenu.ActivateScrolling();
                }
                break;
            case KEYS.OK:
                mainMenu.Deactivate();
                contentMenu.Activate();
                break;
			case KEYS.BACKSPACE:
                searchMenu.clearSearch();
                break;
            default: break;

        }
    },

    Create: function () {

        //eib title
        jQuery('<div/>', {
            "id": 'eibTitle',
            "style": 'height:' + misc.eibTitleHeight + '%; top:' + misc.titleVertMargin + '%; left:' + misc.mainMenuMargin + '%; font-size:' + misc.eibTitleFontSize + 'vw;'
        }).appendTo('#main');

		searchMenu.initSearchBar();
		
        //mainMenu
        jQuery('<div/>', {
            "id": 'mainMenu',
            "style": 'width:' + misc.mainMenuWidth + '%; height:' + misc.mainMenuHeight + '%; top:' + (misc.titleVertMargin + misc.eibTitleHeight) + '%; left:' + misc.mainMenuMargin + '%;'
        }).appendTo('#main');

        for (var i = 0; i < page.countOfColumn; i++) {
            jQuery('<div/>', {
                "id": 'menu' + i,
                "class": 'menuColumns',
                "style": 'width:' + misc.columnWidth + '%; height: 100%; top: 0%; left:' + (i * (misc.columnWidth + misc.columnGap)) + '%;'
            }).appendTo('#mainMenu');

            for (var j = 0; j < page.lengthOfColumn; j++) {
                jQuery('<div/>', {
                    "id": 'menuItem' + i + '' + j,
                    "class": 'menuItems',
                    "style": 'width:' + misc.itemOuterWidth + '%; height:' + misc.itemOuterHeight + '%; top:' + (j * misc.itemOuterHeight) + '%; left: 0%;'
                }).appendTo('#menu' + i);

                jQuery('<div/>', {
                    "id": 'menuItemIcon' + i + '' + j,
                    "class": 'menuItemIcons',
                    "style": 'width:' + misc.itemIconWidth + '%; height:' + misc.itemIconHeight + '%; top: 0%; left: 0%;'
                }).appendTo('#menuItem' + i + '' + j);

                jQuery('<img/>', {
                    "id": 'menuItemIconImg' + i + '' + j,
                    "class": 'itemIconImages',
                    "src": 'resources/icons/' + i + '' + j + 'off.png'
                }).appendTo('#menuItemIcon' + i + '' + j);

                jQuery('<div/>', {
                "id": 'menuItemIconLayer' + i + '' + j,
                "class": 'iconLayers iLayer' + i,
                "style": 'width: 100%; height:100%; top: 0%; left: 0%;'
                }).appendTo('#menuItemIcon' + i + '' + j);

                jQuery('<div/>', {
                    "id": 'menuItemText' + i + '' + j,
                    "class": 'menuItemTexts',
                    "style": 'width:' + misc.itemTextWidth + '%; height:' + misc.itemTextHeight + '%; top: 0%; left:' + (misc.itemIconWidth + misc.itemInnerGap) + '%; font-size:' + misc.itemTextFontSize + 'vw;'
                }).appendTo('#menuItem' + i + '' + j);
                
                jQuery('<div/>', {
                "id": 'menuItemTextLayer' + i + '' + j,
                "class": 'textLayers tLayer' + i ,
                "style": 'width: 100%; height:100%; top: 0%; left:0%;'
                }).appendTo('#menuItemText' + i + '' + j);

                jQuery('<div/>', {
                    "class": 'menuItemTextInnerDiv'
                }).appendTo('#menuItemText' + i + '' + j);
				
				jQuery('<div/>', {
                    "id": 'menuItemTextSearchCount' + i + '' + j,
					"class": 'menuItemTextSearchCount'
                }).appendTo('#menuItemText' + i + '' + j);

                jQuery('<div/>', {
                    "id": 'itemScrollingText' + i + '' + j,
                    "class": 'menuScrollingText'
                }).appendTo('#menuItemText' + i + '' + j + ' .menuItemTextInnerDiv');

            }
            jQuery('<div/>', {
                "id": 'itemIconLayer' + i,
                "class": 'menuLayers',
                "style": 'width:' + misc.itemIconWidth + '%; height:100%; top: 0%; left: 0%;'
            }).appendTo('#menu' + i);

            jQuery('<div/>', {
                "id": 'itemTextLayer' + i,
                "class": 'menuLayers',
                "style": 'width:' + misc.itemTextWidth + '%; height:100%; top: 0%; left:' + (misc.itemIconWidth + misc.itemInnerGap) + '%;'
            }).appendTo('#menu' + i);

            $('#menuItemIcon' + i + '' + (page.lengthOfColumn - 1)).css('border-bottom', 0)
            $('#menuItemText' + i + '' + (page.lengthOfColumn - 1)).css('border-bottom', 0)

        }

        //contentMenu
        jQuery('<div/>', {
            "id": 'contentMenu',
            "style": 'width:' + misc.contentMenuWidth + '%; height:' + misc.contentMenuHeight + '%; top:' + misc.contentVertMargin + '%; left:' + misc.contentHorzMargin + '%; opacity: 0;'
        }).appendTo('#main');

        jQuery('<div/>', {
            "id": 'contentLayer',
            "class": 'menuLayers',
            "style": 'width:' + misc.contentMenuWidth + '%; height:' + misc.contentMenuHeight + '%; top:' + misc.contentVertMargin + '%; left:' + misc.contentHorzMargin + '%; opacity: 0;'
        }).appendTo('#main');

        jQuery('<div/>', {
            "id": 'content'
        }).appendTo('#contentMenu');

        jQuery('<div/>', {
            "id": 'innerContent',
            "style": 'width: 100%; top: 0%; left: 0%;'
        }).appendTo('#content');

        jQuery('<div/>', {
            "id": 'scrollDiv',
            "style": 'width: 0.9%; height: 90%; top: 5%; right: 2.5%;'
        }).appendTo('#contentMenu');

        jQuery('<div/>', {
            "id": 'scrollBar',
            "style": 'width: 100%; top: 0%; left 0%;'
        }).appendTo('#scrollDiv');


        
    },

    Activate: function () {
		page.activeMenu = "mainMenu";
        page.activeHandler = mainMenu.Handler;
    },
    Deactivate: function () {

    },
    Select: function () {
        //$('#menuItem' + page.currentItem.horz + '' + page.currentItem.vert).css('background-color', 'blue');
        $('#menuItemText' + page.currentItem.horz + '' + page.currentItem.vert).addClass('menuItemTextsActive');
        $('#menuItemText' + page.currentItem.horz + '' + page.currentItem.vert).css('font-size', misc.itemTextActiveFontSize + 'vw');
        $('#menuItemIcon' + page.currentItem.horz + '' + page.currentItem.vert).addClass('menuItemIconsActive');
        $('#menuItemIconImg' + page.currentItem.horz + '' + page.currentItem.vert).attr('src', 'resources/icons/' + page.currentItem.horz + '' + page.currentItem.vert + 'on.png');

        contentMenu.Load();
    },
    Deselect: function () {
        //$('#menuItem' + page.currentItem.horz + '' + page.currentItem.vert).css('background-color', 'gray');
        $('#menuItemText' + page.currentItem.horz + '' + page.currentItem.vert).removeClass('menuItemTextsActive');
        $('#menuItemText' + page.currentItem.horz + '' + page.currentItem.vert).css('font-size', misc.itemTextFontSize + 'vw');
        $('#menuItemIcon' + page.currentItem.horz + '' + page.currentItem.vert).removeClass('menuItemIconsActive');
        $('#menuItemIconImg' + page.currentItem.horz + '' + page.currentItem.vert).attr('src', 'resources/icons/' + page.currentItem.horz + '' + page.currentItem.vert + 'off.png');
    },
    Load: function () {
        $('#eibTitle').html(categories.menuTitle);
        for (var i = 0; i < page.countOfColumn; i++) {
            for (var j = 0; j < page.lengthOfColumn; j++) {
//                $('#menuItemText' + i + '' + j + ' .menuItemTextInnerDiv').html(categories.categoryItems[i].Items[j].title);
                $('#itemScrollingText' + i + '' + j).html(categories.categoryItems[i].Items[j].title);
            }
        }


    },
    ActivateScrolling: function () {
        var menuItemDiv = $('.menuItemTextInnerDiv')[(page.currentItem.horz * page.lengthOfColumn) + page.currentItem.vert];
        var scrollingDiv = $('#itemScrollingText' + page.currentItem.horz + '' + page.currentItem.vert);
        var width = scrollingDiv.width();
        var n = menuItemDiv.clientWidth;

        if (width > n) {
            var i = 20;
            mainMenu.interval = setInterval(function () {
                scrollingDiv.css('left', i + 'px');
                i--;
                if (-i > width - n + 50) {
                    i = 25;
                }
            }, 20);
        }
    },
    DeactivateScrolling: function () {
        $('#itemScrollingText' + page.currentItem.horz + '' + page.currentItem.vert).css('left', '0px');
        clearInterval(mainMenu.interval);
    },
    interval: null
}

var contentMenu = {
    Handler: function (key) {
        switch (key) {
            case KEYS.UP:
                contentMenu.GoUp();
                break;
            case KEYS.DOWN:
                contentMenu.GoDown();
                break;
            case KEYS.RIGHT:
                break;
            case KEYS.LEFT:
                break;
            case KEYS.OK:
                contentMenu.Deactivate();
                mainMenu.Activate();
                break;
			case KEYS.BACKSPACE:
                searchMenu.clearSearch();
                break;
            default: break;

        }
    },
    Activate: function () {
        for (var i = 0; i < page.countOfColumn; i++) {
            if (page.currentItem.horz == i) { continue; }
            $('#menu' + i).css('opacity', 0);
        }
        $('#menu' + page.currentItem.horz).css('left', '0%');
        $('.iLayer' + page.currentItem.horz).css('opacity', 0.6);
        $('.tLayer' + page.currentItem.horz).css('opacity', 0.6);
        $('#menuItemIcon' + page.currentItem.horz + '' + page.currentItem.vert + ' .iLayer' + page.currentItem.horz).css('opacity', 0);
        $('#menuItemText' + page.currentItem.horz + '' + page.currentItem.vert + ' .tLayer' + page.currentItem.horz).css('opacity', 0);

        $('#scrollDiv').css('opacity',1);
        $('#contentMenu').css('opacity', 1);
        $('#contentLayer').css('opacity', 0.3);
        

        contentMenu.SetScroll();
		
		page.activeMenu = "contentMenu";
        page.activeHandler = contentMenu.Handler;
		
		searchMenu.highlightContent(window.searchString);
    },
    Deactivate: function () {
        
        $('#scrollDiv').css('opacity',0);
        $('#contentMenu').css('opacity', 0);
        $('#contentLayer').css('opacity', 0);

        $('#menu' + page.currentItem.horz).css('left', (page.currentItem.horz * (misc.columnWidth + misc.columnGap)) + '%');
        $('.iLayer' + page.currentItem.horz).css('opacity', 0);
        $('.tLayer' + page.currentItem.horz).css('opacity', 0);

        for (var i = 0; i < page.countOfColumn; i++) {
            $('#menu' + i).css('opacity', 1);
        }
		
		for(var i=0 ; i < categories.categoryItems.length ; i++) {
			for(var j=0 ; j < categories.categoryItems[i].Items.length ; j++) {
				var text = document.getElementById("menuItemText"+i+j);
				text.style.color = "rgba(255,255,255,0.6) !important";
				var title = document.getElementById("menuItemTextLayer"+i+j);
				title.style.opacity = "";
		}}
		searchMenu.updateView();
		
        $('#innerContent').css('margin-top', '0px');

    },
    GoDown: function () {
        if (scroll.scrollingIndex < scroll.scrollingTime) {
            scroll.scrollingIndex++;
            var newMargin = (2* scroll.scrollingIndex * scroll.lineHeight);
            $('#innerContent').css('margin-top', '-' + newMargin + 'vw');

            if (scroll.scrollingIndex == scroll.scrollingTime) {
                scroll.scrollBarNewMargin = scroll.scrollDivHeight - scroll.scrollBarHeight + 'vw';
            } else {
                scroll.scrollBarNewMargin = scroll.scrollingIndex * scroll.scrollBarHeight + 'vw';
            }
            $('#scrollBar').css('margin-top', scroll.scrollBarNewMargin);
        }
    },
    GoUp: function () {
        if (scroll.scrollingIndex > 0) {
            scroll.scrollingIndex--;
            var newMargin = (2* scroll.scrollingIndex * scroll.lineHeight);
            $('#innerContent').css('margin-top', '-' + newMargin + 'vw');
            
            
            if (scroll.scrollingIndex == 0) {
                scroll.scrollBarNewMargin = '0vw';
            } else {
                scroll.scrollBarNewMargin = scroll.scrollingIndex * scroll.scrollBarHeight + 'vw';
            }

            $('#scrollBar').css('margin-top', scroll.scrollBarNewMargin);

        }
		else{
			searchMenu.Activate();
		}
    },
    Load: function () {
        $('#innerContent').css('margin-top', '0px');
        var content = categories.categoryItems[page.currentItem.horz].Items[page.currentItem.vert].content;
        $('#innerContent').html(content);
    },
    SetScroll: function () {
        
        scroll.scrollingIndex = 0;
        scroll.lineHeight = ((parseInt($('.contentHead').css('line-height'), 10)) * 100) / window.innerWidth;
        scroll.contentHeight = ((parseInt($('#content').css('height'), 10)) * 100) / window.innerWidth;
        scroll.selectedTextHeight = ((parseInt($('#innerContent').css('height'), 10)) * 100) / window.innerWidth;
        if (scroll.selectedTextHeight >= scroll.contentHeight) {
            scroll.scrollingTime = Math.ceil((scroll.selectedTextHeight - scroll.contentHeight) / (2 * scroll.lineHeight)) + 1;
        } else
        {
            scroll.scrollingTime = 0;
        }

        scroll.scrollDivHeight = ((parseInt($('#scrollDiv').css('height'), 10)) * 100) / window.innerWidth;
        scroll.scrollBarHeight = scroll.scrollDivHeight / (scroll.scrollingTime + 1);
        $('#scrollBar').css('height', scroll.scrollBarHeight + 'vw');

        scroll.scrollBarNewMargin = scroll.scrollingIndex * scroll.scrollBarHeight + 'vw';
        $('#scrollBar').css('margin-top', scroll.scrollBarNewMargin);
    }

}

var getLanguage = function () {
    try {
        page.language = document.getElementById("oipfcfg").configuration.preferredAudioLanguage;
    } catch (e) {
        page.language = "tst";
    }
}

var isLanguageValid = function (lang) {
    try {
        valid = validateLanguageList(lang);
    }
    catch (e)
    { valid = false; }
    return valid;
}

function validateLanguageList(txt) {
    txt = txt.toUpperCase();
    if (!txt) return false;
    while (txt) {
        if (txt.length < 3) {
            return false;
        }
        for (var i = 0; i < 3; i++) {
            var c = txt.charCodeAt(i);
            if (c < 0x41 || c > 0x5a) return false;
        }
        txt = txt.substring(3);
        if (txt.length > 0) {
            if (txt.substring(0, 1) != ',') return false;
            txt = txt.substring(1);
        }
    }
    return true;
}

var containsArray = function (a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj.toString()) {
            return true;
        }
    }
    return false;
};


function SetBackKeyHandler () {
    if (window.history && history.pushState) { // check for history api support
    window.addEventListener('load', function () {
    // create history states
                        history.pushState(-1, null); // back state
                        history.pushState(0, null); // main state
                        history.pushState(1, null); // forward state
                        history.go(-1); // start in main state

                        this.addEventListener('popstate', function (event, state) {
                            // check history state and fire custom events
                            if (state = event.state) {

                                event = document.createEvent('Event');
                                event.initEvent(state > 0 ? 'next' : 'previous', true, true);
                                this.dispatchEvent(event);

                                // reset state
                                history.go(-state);
                            }
                        }, false);
                    }, false);
                }
                window.addEventListener('previous', function () {
                    searchMenu.clearSearch();
                }, false);
}
			
var searchMenu = {
    Handler: function (key) {
        switch (key) {
            case KEYS.DOWN:
                searchMenu.Deactivate();
                break;
			case KEYS.RIGHT:
                break;
            case KEYS.LEFT:
                break;
			case KEYS.UP:
                break;
			case KEYS.OK:
				searchMenu.Activate();
                break;
			case KEYS.BACKSPACE:
                searchMenu.clearSearch();
                break;
            default:
				searchMenu.updateView();
				break;

        }
		
    },
    Activate: function () {
        $('#searchInput').css('border', '#06bdcd 3px solid');
        $('#searchInput').css('border-radius', '5px');
		$('#searchInput').attr('readonly', false);
		$('#searchInput').focus();
		if(page.activeMenu == "mainMenu"){
			mainMenu.Deselect();
		}
		if(page.activeHandler != searchMenu.Handler){
			page.oldHandler = page.activeHandler;
		}
        page.activeHandler = searchMenu.Handler;	
    },
    Deactivate: function () {        
		$('#searchInput').css('border', '');
		$('#searchInput').attr('readonly', true);
		$('#searchInput').blur();
		page.activeHandler = page.oldHandler;
		if(page.activeMenu == "mainMenu"){
			mainMenu.Select();
		}	
    },
    clearSearch: function () {        
		searchMenu.removeHighlightTitles();
		$('#innerContent').removeHighlight();
		$('#searchCount').text("");
		document.getElementById('searchInput').value = "";
    },
    updateView: function () {        
		setTimeout(function(){ 
			window.searchString = document.getElementById('searchInput').value;
			if(window.searchString.length > 0){
				var temp = searchMenu.searchAllCategories(window.searchString);
				var ind = temp[0];
				searchMenu.highlightTitles(ind);
				searchMenu.highlightContent(window.searchString);	
				$('#searchCount').text(temp[1]);
			}
			else{
				searchMenu.removeHighlightTitles();
				$('#innerContent').removeHighlight();
				$('#searchCount').text("");
				
			}
		}, 200);
    },
    initSearchBar: function () {        
        jQuery('<div/>', {
            "id": 'searchBar',
            "style": 'height:' + misc.eibTitleHeight + '%; font-size:' + misc.eibTitleFontSize + 'vw;'
        }).appendTo('#main');
		jQuery('<input readonly id="searchInput">').appendTo('#searchBar');
		jQuery('<div id="searchCount"></div>').appendTo('#searchBar');	
    },
	removeHighlightTitles: function () {        
		for(var i=0 ; i < categories.categoryItems.length ; i++) {
			for(var j=0 ; j < categories.categoryItems[i].Items.length ; j++) {
				$('#menuItemTextSearchCount'+i+j).text("");
				//if(page.currentItem.horz == i && page.currentItem.vert == j){
				if(page.activeMenu == "mainMenu"){
					var text = document.getElementById("itemScrollingText"+i+j);
					text.style.color = "";
					var title = document.getElementById("menuItemTextLayer"+i+j);
					title.style.opacity = "";
				}
				else{
					var text = document.getElementById("itemScrollingText"+i+j);
					var title = document.getElementById("menuItemTextLayer"+i+j);	
					if(page.currentItem.horz == i && page.currentItem.vert == j){
						text.style.color = "";
						title.style.opacity = "";
					}
					else{
						text.style.color = "";
						title.style.opacity = "0.6";		
					}
				}
			}}
    },
	highlightTitles: function (indices) {        
		searchMenu.removeHighlightTitles();
		for(var i=0 ; i < indices[1].length ; i++) {
			var text = document.getElementById("itemScrollingText"+indices[1][i][0]+indices[1][i][1]);
			text.style.color = "#41ecfb";
			if(indices[1][i][2]>0){
				$('#menuItemTextSearchCount'+indices[1][i][0]+indices[1][i][1]).text(indices[1][i][2]);
			}
		}
		for(var i=0 ; i < indices[0].length ; i++) {
			var title = document.getElementById("menuItemTextLayer"+indices[0][i][0]+indices[0][i][1]);
			title.style.opacity = "0.6";
		}
    },
	highlightContent: function (str) {        
		$('#innerContent').removeHighlight();
		$('#innerContent').highlight(str);
    },
	allIndexOf: function (str, toSearch) {        
		var indices = [];
		var count = 0;
		for(var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
			indices.push(pos);
			count++;
		}
		return count;
    },
    searchAllCategories: function (str) {        
		var indices = [[],[],[]];
		var htmlObject = document.createElement('div');
		var count = 0;
		var chapterCount = 0;
		for(var i=0 ; i < categories.categoryItems.length ; i++) {
			for(var j=0 ; j < categories.categoryItems[i].Items.length ; j++) {
				var cont = categories.categoryItems[i].Items[j].content;
				htmlObject.innerHTML = cont;
				chapterCount = searchMenu.allIndexOf(htmlObject.innerText.toLowerCase(),str);
	
				count = count + chapterCount;
				if(htmlObject.innerText.toLowerCase().indexOf(str) > 0){
					indices[1].push([i,j,chapterCount]);
				}
				else{
					indices[0].push([i,j,chapterCount]);
				}
			}
		}
		return	[indices,count];
    }
}
