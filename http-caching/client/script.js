function fetchNewImage() {
  // Generate a random query parameter to bypass caching
  const randomQuery = Math.random().toString(36).substring(7);

  // Update the image source with the randomly generated query parameter to invalidate the cache
  const imgElement = document.getElementById("cached-image");
  imgElement.src = `image.gif?${randomQuery}`;
}

const invalidateCacheBtn = document.getElementById("invalidate-cache-btn");
invalidateCacheBtn.addEventListener("click", fetchNewImage);
