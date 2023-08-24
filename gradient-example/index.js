function createGradientBackground(vibrantColorHex) {
  const transparentColor = "rgba(0, 0, 0, 0)"; // Transparent color
  const darkBlack = "#000000"; // Dark black color hex

  const colorStopPosition = 60;
  // Construct the gradient background CSS value
  const gradientBackground = `linear-gradient(to bottom, ${transparentColor}, ${colorStopPosition}%, ${darkBlack})`;

  const target = document.getElementById("overlay");

  target.style.background = gradientBackground;
  target.style.backgroundRepeat = "no-repeat";
  target.style.backgroundAttachment = "fixed";
  target.style.backgroundSize = "cover";
}

// Example usage
const vibrantColorHex = "#FF5733"; // Replace with your desired vibrant color hex
createGradientBackground(vibrantColorHex);

function updateGradientBackgroundPosition() {
  const scrollTop = window.scrollY || window.pageYOffset; // Get the scroll position

  // Calculate the gradient background position based on the scroll position
  const backgroundPosition = `center ${-scrollTop}px`;
  const target = document.getElementById("overlay");
  // Apply the updated gradient background position to the body
  target.style.backgroundPosition = backgroundPosition;
}

// Attach the updateGradientBackgroundPosition function to the 'scroll' event
window.addEventListener("scroll", updateGradientBackgroundPosition);

// Initialize the gradient background position
updateGradientBackgroundPosition();
