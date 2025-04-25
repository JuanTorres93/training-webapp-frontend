export const hidePopup = (setShowPopup) => {
  setShowPopup(false);
};

export const showPopup = (setShowPopup) => {
  setShowPopup(true);
};

export const positionPopup = (
  event,
  setPopupPosition,
  setArrowClassModifier,
  // Object with keys: x, y and arrowClassModifier
  upperLeft,
  upperRight,
  lowerLeft,
  lowerRight
) => {
  // DOC: currentTarget property always refers to the element to which the event is bound, i.e. the component that has the onMouseEnter.
  const rect = event.currentTarget.getBoundingClientRect();

  let x = rect.left + window.scrollX; // Absolute X coordinate
  let y = rect.top + rect.height + window.scrollY; // Absolute Y coordinate, just below the button

  // Breakpoints for responsive design
  const largestBreakpoint =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--bp-largest")
      .trim() * 1;

  const smallBreakpoint =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--bp-small")
      .trim() * 1;

  const yResponsiveOffset = 50; // Offset for the popup position

  // Check if x is less than half of the screen
  // Left part of the screen
  if (x < window.innerWidth / 2) {
    // BASE POSITION
    // Check if y is less than half of the screen
    // Upper left part of the screen
    if (y < window.innerHeight / 2) {
      x = x + upperLeft.x; // Center the popup
      y = y + upperLeft.y; // Center the popup
      setArrowClassModifier(upperLeft.arrowClassModifier);
    }
    // Lower left part of the screen
    else {
      x = x + lowerLeft.x; // Center the popup
      y = y + lowerLeft.y; // Center the popup
      setArrowClassModifier(lowerLeft.arrowClassModifier);

      // RESPONSIVE POSITION
      if (window.innerWidth < largestBreakpoint) {
        y += yResponsiveOffset;
      }
    }

    // RESPONSIVE POSITION
  }

  // Right part of the screen
  else {
    // BASE POSITION
    // Check if y is less than half of the screen
    // Upper right part of the screen
    if (y < window.innerHeight / 2) {
      x = x + upperRight.x; // Center the popup
      y = y + upperRight.y; // Center the popup
      setArrowClassModifier(upperRight.arrowClassModifier);
    }
    // Lower right part of the screen
    else {
      x = x + lowerRight.x; // Center the popup
      y = y + lowerRight.y; // Center the popup
      setArrowClassModifier(lowerRight.arrowClassModifier);

      // RESPONSIVE POSITION
      if (window.innerWidth < largestBreakpoint) {
        y += yResponsiveOffset;
      }
    }

    // RESPONSIVE POSITION
    if (window.innerWidth <= smallBreakpoint) {
      x += 85;
    } else if (window.innerWidth <= largestBreakpoint) {
      x += 70;
    }
  }

  setPopupPosition({
    x,
    y,
  });
};

export const closePopupOnClickOutside = (
  event,
  setShowPopup,
  ignoredClasses = null
) => {
  // TODO update for accepting an array of setShowPopups
  // ignoredClasses is an array of strings that are class names that should not trigger the closing of the popup
  // This allows for the popup to be able to show up in the first place

  const classList = Array.from(event.target.classList);

  // If the click is on the ignored class, do nothing
  const isIgnoredClass =
    ignoredClasses &&
    ignoredClasses.some((ignoredClass) => {
      return classList.includes(ignoredClass);
    });
  if (isIgnoredClass) return;

  const isInsidePopup = classList.some((className) => {
    return className.startsWith("popup-name-desc");
  });

  if (!isInsidePopup) setShowPopup(false);
};
