export function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

export function loadFromLS(key) {
  try {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  } catch {
    return '';
  }
}
