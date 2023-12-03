// utils.js
export function map(num, start1, stop1, start2, stop2) {
  // Maps a number from one range to another.
  return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

export function setVariable(domElement, obj) {
  // Sets CSS custom properties on a given DOM element.
  const value = Object.keys(obj)
    .map(function (key) {
      // Constructs a string for font-variation-settings.
      return `"${key}" ${obj[key]}`;
    })
    .join(", ");

  // Applies the constructed string to the element's style.
  domElement.style.setProperty("font-variation-settings", value);
}

export function useMouse() {
  // Tracks and returns the current mouse position.
  const mouse = { x: 0, y: 0 };
  document.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX; // Horizontal position
    mouse.y = event.clientY; // Vertical position
  });
  return mouse;
}

// #region dependencies for random ----------

function isNumber(elem) {
  return !(isNaN(elem) || elem === null);
}

// #endregion ----------

export function random(a, b) {
  if (arguments.length === 1) {
    if (Array.isArray(a)) {
      const index = Math.floor(random(a.length));

      return a[index];
    } else if (typeof a === "object") {
      return random(Object.values(a));
    } else if (isNumber(a)) {
      return Math.random() * a;
    }
  } else if (arguments.length === 0) {
    return Math.random();
  }

  return Math.random() * (b - a) + a;
}
