export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};
export const creatProduct = (title, description, imageUrl, price) => {
  return { type: CREATE_PRODUCT, pid: productData :{
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price
  } };
};
export const updateProduct = (productId) => {
  return { type: UPDATE_PRODUCT, pid: productId };
};
