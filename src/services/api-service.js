const BASE_URL = "https://slon2k-test-api.firebaseio.com";
const IMAGES_URL = `${BASE_URL}/images.json`;
const token = localStorage.getItem("token");

export const createImage = async (imageProps) => {
  const result = await fetch(IMAGES_URL, {
    method: "POST",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({...imageProps, returnSecureToken: true}),
  });
  if (!result.ok) {
    console.log(result);
    throw new Error('Error uploading image');
  }
  return await result.json();
}

export const getImages = async () => {
  const result = await fetch(IMAGES_URL, {
    method: "GET",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
  if (!result.ok) {
    console.log(result);
    throw new Error('Error downloading image');
  }
  return await result.json();
}