export const getElement = (htmlString) => {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.cloneNode(true);
};

export const getMeridian = (hour) => (hour > 11 ? "PM" : "AM");
