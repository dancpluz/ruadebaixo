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
    return localStorage.getItem(field) ? localStorage.getItem(field) : '';
  }
}

export function getNumberData(field) {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem(field) ? Number(localStorage.getItem(field)) : 0;
  }
}

export function storeCartData(products, price, discount) {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("cart",JSON.stringify(products));
    localStorage.setItem("price",price.toString());
    localStorage.setItem("discount",discount.toString());
  }
}

export function getCartData() {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  }
}