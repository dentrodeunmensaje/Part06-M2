var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;

  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ


  if (matchFunc(startEl)) resultSet.push(startEl);

  if(startEl.children.length){
    for (let el of startEl.children) {
      const result = traverseDomAndCollectElements(matchFunc, el);
      resultSet = [...resultSet, ...result];
    }
  }

  return resultSet;
  
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  const firstCharacter = selector.charAt(0);
  if (firstCharacter==='#'){
    return 'id';
  } else if (firstCharacter==='.'){
    return 'class';
  } else{
    for (let i = 0; i < selector.length; i++) {
      const element = selector.charAt(i);
      if (element==='.'){
        return 'tag.class';
      }
    }
    return 'tag';
  }
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
    return (el) =>`#${el.id}`=== selector;
  } else if (selectorType === "class") {
    return (el)=> el.classList.contains(selector.replace('.', ''));   
  } else if (selectorType === "tag.class") {
    return (el) => {
      const tagAndClassArray = selector.split('.');
      const tagBoolean = el.tagName.toLowerCase()===tagAndClassArray[0].toLowerCase();
      const classBoolean = el.classList.contains(tagAndClassArray[1]);
      return tagBoolean && classBoolean;
    }
  } else if (selectorType === "tag") {
    matchFunction = function(el){
      return el.tagName.toLowerCase()===selector.toLowerCase();
    }    
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
