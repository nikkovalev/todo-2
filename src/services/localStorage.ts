function SET(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function GET<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function REMOVE<T>(key: string) {
  localStorage.removeItem(key);
}

export const storage = { SET, GET, REMOVE };
