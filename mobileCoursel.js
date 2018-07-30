/*
*     slider({cont:banner,imgCon:imgUl,dotCon:dotUl,time:2000});
*     传入json{cont:最大容器，imgCon:图片容器,dotCon:圆点容器,dotSty:圆点活动样式,time:图片播放间隔}
*/
function slider(json) {
    var banner = json.cont;
    var imgUl = json.imgCon;
    var dotUl = json.dotCon;
    var now = json.dotSty;
    var width = banner.offsetWidth;
    var current = 1;
    banner.timeInterval = json.time;
    clearInterval(banner.timer);
    banner.timer = setInterval(function () {
        current++;
        slide.addTransition(imgUl);
        var dis = -current * width;
        slide.setTransform(imgUl, dis, 'x');
    }, banner.timeInterval);
    slide.addTransitionEnd(imgUl, function () {
        if (current > imgUl.children.length - 2) {
            current = 1;
        } else if (current <= 0) {
            current = imgUl.children.length - 2;
        }
        slide.removeTransition(imgUl);
        slide.setTransform(imgUl, -current * width, 'x');
        updateDot();
    });

    function updateDot() {
        for (var i = 0; i < dotUl.children.length; i++) {
            dotUl.children[i].className = '';
        }
        dotUl.children[current - 1].className = now;
    }

    imgUl.addEventListener('touchstart', function (e) {

        clearInterval(banner.timer);
        imgUl.startX = e.touches[0].pageX;
    });
    imgUl.addEventListener('touchmove', function (e) {

        imgUl.isMove = true;
        imgUl.endX = e.touches[0].pageX;

        imgUl.distance = imgUl.endX - imgUl.startX;
        slide.removeTransition(imgUl);
        slide.setTransform(imgUl, -current * width + imgUl.distance, 'x');
    });
    imgUl.addEventListener('touchend', function () {
        if (imgUl.isMove) {

            if (Math.abs(imgUl.distance) > width / 3) {
                if (imgUl.distance > 0) {
                    current--;
                } else {
                    current++;
                }
                slide.addTransition(imgUl);
                slide.setTransform(imgUl, -current * width, 'x');
            } else {
                slide.addTransition(imgUl);
                slide.setTransform(imgUl, -current * width, 'x');
            }
        }
        clearInterval(banner.timer)
        banner.timer = setInterval(function () {
            current++;
            slide.addTransition(imgUl);
            slide.setTransform(imgUl, -current * width, 'x');
        }, banner.timeInterval);
    });
}

var slide = {};

/**
 * 给对象添加过度
 * @param obj       需要添加过度的对象
 */
slide.addTransition = function (obj) {
    obj.style.transition = 'all 0.5s';
    obj.style.webkitTransition = 'all 0.5s';
};
/**
 * 设置对象的变形行为
 * @param obj       需要变形的对象
 * @param dis       移动的距离
 */
slide.setTransform = function (obj, dis, dir) {
    obj.style.transform = 'translate' + dir.toUpperCase() + '(' + dis + 'px)';
    obj.style.webkitTransform = 'translate' + dir.toUpperCase() + '(' + dis + 'px)';
};
/**
 * 移除对象的过度行为
 * @param obj       需要移除过度的对象
 */
slide.removeTransition = function (obj) {
    obj.style.transition = '';
    obj.style.webkitTransition = '';
};
/**
 * 当过度完成时，调用fn函数
 * @param obj       需要监听过度完成的对象
 * @param fn        调用的函数
 */
slide.addTransitionEnd = function (obj, fn) {
    obj.addEventListener('transitionEnd', fn);
    obj.addEventListener('webkitTransitionEnd', fn);
};


/**
 * 监听触摸按钮时的点击事件
 */
slide.tap = function (obj, fn) {
    var start = 0;  // 保存触摸到屏幕的开始时间
    var end = 0;    // 离开屏幕的时间
    var spend = 0;  // 触摸到离开花费的时长
    var isMove = false; // 记录是否有移动过手指
    obj.addEventListener('touchstart', function () {
        start = Date.now();
    });
    obj.addEventListener('touchmove', function () {
        isMove = true;
    });
    obj.addEventListener('touchend', function () {
        end = Date.now();
        spend = end - start;
        if (!isMove && spend < 200) {
            if (fn) {
                fn();
            }
        }
        isMove = false;
    });
};