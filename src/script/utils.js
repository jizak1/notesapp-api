class Utils {
  static hideElement(element) {
    if (element) {
      element.style.display = 'none';
      element.hidden = true;
    }
  }

  static showElement(element) {
    if (element) {
      element.style.display = 'block';
      element.hidden = false;
    }
  }

  static emptyElement(element) {
    if (element) element.innerHTML = '';
  }
}

export default Utils;
