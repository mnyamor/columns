import { identity, keys, pickBy, values, get, set, pick } from 'lodash';

const initialState = {
  "Properties": {
    "Product code": true,
    "GTIN": false,
    "Main Category": true,
    "Status": true
  },
  "Channels": {
    "Price lists": true,

  }
};

const modifiedState = {
  "Properties": {
    "Product code": true,
    "GTIN": true,
    "Main Category": false,
    "Status": true
  },
  "Channels": {
    "Price lists": false
  }
};

const categories = keys(initialState);
const allOptions = categories.map(category => initialState[category]);
const categoryName = "Properties";
const specificOptions = initialState[categoryName];

console.log(allOptions);

const allSelectedOptions = allOptions.reduce((accumulator, currentValue) => {
  return accumulator.concat(keys(pickBy(currentValue, identity)));
}, []);

console.log(allSelectedOptions);
const getDiffState = (originalState, modifiedState) => {
  const pickKeys = keys(originalState).reduce((accumulator, currentValue) => {
    const options = originalState[currentValue];
    const getValue = (stateObject, propertyKey, optionKey) => get(stateObject, `${propertyKey}.${optionKey}`)
    const modifiedKeys = keys(options)
      .filter(k => getValue(originalState, currentValue, k) !== getValue(modifiedState, currentValue, k))
      .map(k => `${currentValue}.${k}`);
    return accumulator.concat(modifiedKeys);
  }, []);
  return pick(modifiedState, pickKeys);
}

const diff = getDiffState(initialState, modifiedState);
