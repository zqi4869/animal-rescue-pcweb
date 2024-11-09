const GlobalStorage = (key, dataType = 'string') => {
  const value = localStorage.getItem(key) || '';
  if(value) {
    if(dataType === 'json') {
      return JSON.parse(value)
    } else {
      return value
    }
  } else {
    return null
  }
};

export default GlobalStorage;
