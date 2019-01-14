export const getToken = (token) => ({
  type: 'GET_TOKEN',
  token: token,
});

export const getUser = (name, imageURL, id) => ({
  type: 'GET_USER',
  name: name,
  image: imageURL,
  id: id,
});