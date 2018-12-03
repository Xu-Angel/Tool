   /*
    * 查询节点方法：
    *       1、id：document.getElementById('id')
    *       2、element: document.getElementsByTagName('element')
    *       3、class：document.getElementsByClassName('className');IE678不兼容
    *       4、sibling：要求是元素节点，如何完成？
    *               next（下一个）：dom.nextElementSibling||dom.nextSibling
    *               previous（上一个）：dom.previousElementSibling||dom.previousSibling
    *       5、parent: dom.parentNode
    *       6、child:
    *            所有的子节点：node.childNodes
    *            节点类型：node.nodeType (1:元素  2：属性  3：文本   8：注释)
    *            所有的子元素节点：node.children    在ie678中包含注释
    *  * 节点：node
    *  查：根据id   document.getElementById(id);
    *      根据element   document.getElementsByTagName(element)
    *      根据className   document.getElementsByClassName(className)----有兼容性
    *      根据关系：父母，兄弟，子元素
    *      node的父元素：node.parentNode
    *      node的下一个兄弟：node.nextElementSibling||node.nextSibling
    *      node的子元素：node.childNodes   三种
    *                    node.children     元素
    *      node类型判断：node.nodeType:
    *                       1-元素节点
    *                       2-属性节点
    *                       3-文本节点
    *                       8-注释节点
    * 特殊节点获取方法：
    * html:document.documentElement
    * body:document.body
    *title:document.title
    * head:document.head
 
    * */
/* <body></body>
    <input type="text">
    <span></span>
    <div></div>
    <script>
        //创建节点：
        var node = document.createElement('a');
        node.innerHTML = "我是div前面的a标签";
        //在div前面插入
        var div = document.getElementsByTagName('div')[0];
        div.parentNode.insertBefore(node,div);         !TODO:div为参考位置 即在div前面插入
        div.parentNode.appendChild(node);      此子节点为最后位置
    </script>
</body>
。cloneNode（默认为false）  true  深度克隆  
                false 浅度克隆 
*/ 
/*  insertBefore  */
const insertBefore = (el, htmlString) => el.insertAdjacentHTML('beforebegin', htmlString)
insertBefore(document.getElementById('myId'), '<p>before</p>'); // <p>before</p> <div id="myId">...</div>

/* insertAfter */
const insertAfter = (el, htmlString) => el.insertAdjacentHTML('afterend', htmlString)
insertAfter(document.getElementById('myId'), '<p>after</p>'); // <div id="myId">...</div> <p>after</p>

/* getStyle */
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
getStyle(document.querySelector('p'), 'font-size'); // '16px'

/* hasClass */
const hasClass = (el, className) => el.classList.contains(className);
hasClass(document.querySelector('p.special'), 'special'); // true