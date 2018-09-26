/**
 * 
 * @param {Number} total 
 * @param {Number} cur 
 * @param {Numbre} around 
 */
const makeResult = (total,cur,around) => {
  let result = [];
  let baseCount = around * 2 + 1 + 2 + 2 + 2; //总共元素个数
  let surplus = baseCount - 4; //只出现一个省略号 剩余元素个数
  let startPosition = 1 + 2 + around,endPosition = total - 2 - around;

  if(total <= baseCount - 2){ //全部显示 不出现省略号
      result =  Array.from({length: total}, (v, i) => i + 1);
  }else{ //需要出现省略号
      if(cur <= startPosition){ //1.只有后面出现省略号
          result = [...Array.from({length: surplus}, (v, i) => i + 1),"...",total]
      }else if(cur >= endPosition) { //2.只有前边出现省略号
          result = [1,'...',...Array.from({length: surplus}, (v, i) => total - surplus + i + 1)]
      }else{ //3.两边都有省略号
          result = [1,'...',...Array.from({length: around * 2 + 1}, (v, i) => cur - around + i),'...',total]
      }
  }

  return result
}
// https://juejin.im/post/5ba49868e51d450e664b4407
