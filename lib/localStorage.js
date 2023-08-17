// import { cookies } from 'next/headers';

// async function create(data) {
// //
// }

export function storeFormData(data) {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("name", data.name);
    localStorage.setItem("phone", data.phone);
    localStorage.setItem("email", data.email);
    localStorage.setItem("insta", data.insta);
  }
}

export function getFormData(field) {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem(field);
  }
  return '';
}