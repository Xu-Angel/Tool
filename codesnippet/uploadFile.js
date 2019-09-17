/* 
https://github.com/ElemeFE/element/blob/de3c38f7b12d4fe5cd8f668b4f20976231d41dc9/packages/upload/src/upload-dragger.vue#L44
*/
const accept = this.uploader.accept;
[].slice.call(e.dataTransfer.files).filter(file => {
  const { type, name } = file;
  const extension = name.indexOf('.') > -1 ?
    `.${ name.split('.').pop() }` :
    '';
  const baseType = type.replace(/\/.*$/, '');
  return accept.split(',')
    .map(type => type.trim())
    .filter(type => type)
    .some(acceptedType => {
      if (/\..+$/.test(acceptedType)) {
        return extension === acceptedType;
      }
      if (/\/\*$/.test(acceptedType)) {
        return baseType === acceptedType.replace(/\/\*$/, '');
      }
      if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
        return type === acceptedType;
      }
      return false;
    });
})