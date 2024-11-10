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

const getLoginUser = () => {
  return GlobalStorage('loginUser', 'json')
};

const saveLoginUser = (user) => {
  localStorage.setItem('loginUser', JSON.stringify(user))
};


export { GlobalStorage, getLoginUser, saveLoginUser };
