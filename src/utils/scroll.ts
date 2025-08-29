export const scrollToTop = (smooth = true): void => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "auto",
  });
};

export const getScrollPosition = (): number => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

export const getDistanceFromBottom = (): number => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.offsetHeight;

  return documentHeight - (scrollTop + windowHeight);
};
