var getElem = function(selector){
    return document.querySelector(selector);
}

var getAllElem = function(selector){
    return document.querySelectorAll(selector);
}

var getCls = function(element){
    return element.getAttribute('class');
}
var setCls = function(element, cls){
    return element.setAttribute('class', cls);
}
var addCls = function(element, cls){
    var baseCls = getCls(element);
    if(baseCls.indexOf(cls) === -1){
        setCls(element, baseCls+ ' ' +cls);
    }
    return;
}
var delCls = function(element, cls){
    var baseCls = getCls(element);
    if(baseCls.indexOf(cls) > -1){
        setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g,' '));
    }
    return;
}



var screenAnimateElements = {
    '.screen-1' : [
        '.screen-1__h1',
        '.screen-1__h2'
      ],
    '.screen-2' : [
        '.screen-2__h1',
        '.screen-2__h2',
        '.screen-2__pt1',
        '.screen-2__pt2'
      ],
    '.screen-3' : [
        '.screen-3__pt1',
        '.screen-3__h1',
        '.screen-3__h2',
        '.screen-3__nav',
        '.screen-3__nav-item_1',
        '.screen-3__nav-item_2',
        '.screen-3__nav-item_3',
        '.screen-3__nav-item_4',
        '.screen-3__nav-item_5'
    ],
    '.screen-4' : [
        '.screen-4__h1',
        '.screen-4__h2',
        '.screen-4__features'
    ],
    '.screen-5' : [
        '.screen-5__pic',
        '.screen-5__h1',
        '.screen-5__h2',
    ]
};

function setScreenAnimateInit(screenCls){
    var screen = document.querySelector(screenCls);
    var animateElements = screenAnimateElements[screenCls];
    for(var i = 0; i < animateElements.length; i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
    }
}
window.onload = function(){
    for(k in screenAnimateElements){
        if(k == '.screen-1' || k == '.screen-2'){
            continue;
        }
        setScreenAnimateInit(k);
    }
}

function playScreenAnimateDone(screenCls){
    var screen = document.querySelector(screenCls); // 获取当前屏的元素
    var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
    for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));    
    }
}
setTimeout(function(){playScreenAnimateDone('.screen-1');},100);

var navItems = getAllElem('.nav-item');
var outLineItems = getAllElem('.outline__item');

var setNavJump = function(i, lib){
    var elem = lib[i];
    elem.onclick = function(){
        document.documentElement.scrollTop = i * 640 +1;
        console.log(document.documentElement.scrollTop);
    }
}
for(var i = 0; i < navItems.length; i++){
    setNavJump(i,navItems);
    console.log("done");
}
for(var i = 0; i < outLineItems.length; i++){
    setNavJump(i,outLineItems);
}

var navTip = getElem('.header__nav-tip');

var setTip = function(idx, lib){
    lib[idx].onmouseover = function(){
        navTip.style.left = (idx * 90) +'px';
    }
    var currentIdx = 0;
    lib[idx].onmouseout = function(){
        for(var i = 0;i < lib.length; i++){
            if(getCls(lib[i]).indexOf('header__nav-item_active') > -1){
                currentIdx = i;
                break;
            }
        }
        navTip.style.left = (currentIdx * 90) + 'px';
    }
}

for(var i = 0; i < navItems.length; i++){
    setTip(i, navItems);
}

var switchNavItemsActive = function(idx){
    for(var i=0; i< navItems.length; i++){
        delCls(navItems[i], 'header__nav-item_active');
        navTip.style.left = 0 + 'px';
    }
    addCls(navItems[idx], 'header__nav-item_active');
    navTip.style.left = (idx * 90 ) + 'px';

    for(var i = 0; i<outLineItems.length; i++){
        delCls(outLineItems[i], 'oueline__item_active');
    }
    addCls(outLineItems[idx], 'outline__item_active');
    
}

window.onscroll = function(){
    var top = document.body.scrollTop | document.documentElement.scrollTop;

    if(top >= 1){
        switchNavItemsActive(0);
    }

    if(top>640-80){
        playScreenAnimateDone('.screen-2');
        switchNavItemsActive(1);
        addCls(getElem('.outline'), 'outline_status_in')
    } else {
        delCls(getElem('.outline'), 'outline_status_in')
    }
    if(top>640*2-80){
        playScreenAnimateDone('.screen-3');
        switchNavItemsActive(2);
    }
    if(top>640*3-80){
        playScreenAnimateDone('.screen-4');
        switchNavItemsActive(3);
    }
    if(top>640*4-80){
        playScreenAnimateDone('.screen-5');
        switchNavItemsActive(4);
    }
}

