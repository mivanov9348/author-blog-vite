export function fetchImages() {
  return fetch("http://localhost:3000/uploads/").then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not okay!");
    }
    return res.json();
  });
}

export function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  return fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}
