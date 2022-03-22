export default function setItemsTo(item, searchData) {
  const now = new Date();
  const value = {
    result: searchData,
    expiry: now.getTime() + 1.8e6, //expire time 30분
  };
  localStorage.setItem(item, JSON.stringify(value));
}
