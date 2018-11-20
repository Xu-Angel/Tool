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