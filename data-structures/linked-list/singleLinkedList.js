
const uuid = require('uuid/v1');

const typeChecker = require('../../utils/typeChecker.js');

// =============================================== //
//
//
//
// =============================================== //


// Single Linked List (unordered) container
// These linked lists contain two sentinals 
// sentinalTop: points to the first cell id
// sentinalBottom: points to the last cell id
let sll = {
  sentinalHead: null,
  sentinalTail: null
};

// SLL basic unit is the cell
// id: is a uuid that is a string
// next: will point to the uuid of the cell
// value: can be any valid js type that is not null, undefined
const cell = {
  id: null,
  next: null,
  value: null
};

// Methods for single linked lists


// ============================================================================= //
//  name: initSLL
//  @param: arr :: An array of any values to construct a linked list.
//    - Array can contain mixed types and each index represents one cells value.
//  @return:: (Object) { ...sll }
//    - If arr is not an array, or is an empty array or an argument 
//    - is not provided, then just { ...sll } is returned
// ============================================================================= //
const initSLL = arr => {
  const newList = {...sll};
  
  
  if (typeChecker(arr) === "Array") { 
    const len = arr.length;

    if (len > 1) {
      let prevCell;

      arr.forEach( (item, idx) => {
        if (idx === 0) { // first cell
          const id = uuid();
          prevCell = id;

          newList.sentinalHead = id;
          newList[id] = {...cell};
          newList[id].id = id;
          newList[id].value = arr[0];
        }
        else if (idx === len - 1) { // last cell
          const id = uuid();
          
          newList[prevCell].next = id;
          newList.sentinalTail = id;

          newList[id] = {...cell};
          newList[id].id = id;
          newList[id].value = arr[idx];
        } else {
          const id = uuid();
          
          newList[prevCell].next = id;
          prevCell = id;

          newList[id] = {...cell};
          newList[id].id = id;
          newList[id].value = arr[idx];
        }
      })
    } 
    if (len === 1) {
      const id = uuid();
      newList.sentinalHead = id;
      newList.sentinalTail = id;
      newList[id] = {...cell};
      newList[id].id = id;
      newList[id].value = arr[0];
    } 
  }
  
  return newList;
};

// this single linked list does not enforce unique values
// so the first match will be returned
// if a match is made a copy of the matching cell object is returned
// if no value is passed in then null is returned
// ============================================================================= //
// ============================================================================= //
const findCellByValue = (sll, value, fn) => {
  
  // TODO: need to check for [] and {} deep equality
  // TODO: allow for custom fn to be called on value comparisons

  let next;
  let id = sll.sentinalHead;
  if (id) { 
    do {
      if (sll[id].value === value) return sll[id];
      
      next = sll[id].next;
      id = sll[id].next;
    } while (next !== null);
  }

  return 0;
};


const insertCellAtHead = (sll, value) => {
  if (sll.sentinalHead) {
    const key = sll.sentinalHead;
    const id = uuid();

    sll.sentinalHead = id;

    sll[id] = {...cell};
    sll[id].id = id;
    sll[id].value = value;
    sll[id].next = key;
  } else { // linked list is empty
    const id = uuid();

    sll.sentinalHead = id;
    sll.sentinalTail = id;

    sll[id] = {...cell};
    sll[id].id = id;
    sll[id].value = value;
    sll[id].next = null;
  }

  return sll;
};

const insertCellAtTail = (sll, value) => {
  if (sll.sentinalTail) {
    const key = sll.sentinalTail;
    const id = uuid();

    sll.sentinalTail = id;

    sll[key].next = id;

    sll[id] = {...cell};
    sll[id].id = id;
    sll[id].value = value;
  } else { // linked list is empty
    const id = uuid();

    sll.sentinalHead = id;
    sll.sentinalTail = id;

    sll[id] = {...cell};
    sll[id].id = id;
    sll[id].value = value;
    sll[id].next = null;
  }

  return sll;
};

// take a linked list and place the values in an array
const sllToArray = sll => {
  let arr = [];

  let cell = sll.sentinalHead;

  while (cell) {
    arr.push(sll[cell].value);
    cell = sll[cell].next;
  }

  return arr;
};

const insertCellAfterValue = () => {};
const insertCellBeforeValue = () => {};

// no mutation of sll, returns a new copy
// applies fn passed in to each cell in the list
const mapCells = (sll, fn) => {
  let copy = {...sll}; // copy of the linked list

  let cell = copy.sentinalHead;

  while (cell) {
    copy[cell].value = fn(copy[cell].value, copy[cell].id, copy);
    
    cell = copy[cell].next;
  }

  return copy;
};

const deleteCellById = (sll, id) => {
  let copy = {...sll}; // copy of the linked list

  // TODO
  // empty list
  // one item
  // more than one
};

const deleteCellByValue = () => {};

// let list = initSLL([]);
let list = initSLL([1,4,3,9]);
// insertCellAtHead(list, 18);
let mapped = mapCells(list, value => value*value);

console.log('list: ',sllToArray(mapped));
// console.log('find: ', findCellByValue(list, 6))

module.exports = {
  initSLL: initSLL
};