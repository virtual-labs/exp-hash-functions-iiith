// Mobile Detection and Landscape Warning Script
// Detects mobile devices and shows overlay with educational guidance

(function () {
  "use strict";

  // Mobile detection function
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  // Check if device is in portrait mode
  function isPortraitMode() {
    return window.innerHeight > window.innerWidth;
  }

  // Check if screen is small (typically mobile)
  function isSmallScreen() {
    return window.innerWidth < 768;
  }

  // Show mobile overlay
  function showMobileOverlay() {
    const overlay = document.getElementById("mobile-overlay");
    if (overlay) {
      console.log(
        "[DEBUG] showMobileOverlay called, overlay found, setting display:block"
      );
      overlay.style.display = "block";
    } else {
      console.log("[DEBUG] showMobileOverlay called, overlay NOT found");
    }
  }

  // Hide mobile overlay
  function hideMobileOverlay() {
    const overlay = document.getElementById("mobile-overlay");
    if (overlay) {
      overlay.style.display = "none";
    }
  }

  // Check if we should show mobile warning
  function shouldShowMobileWarning() {
    // Show warning if:
    // 1. It's a mobile device (portrait or landscape)
    // 2. Or, screen width is very small (< 480px)
    return isMobileDevice() || window.innerWidth < 480;
  }

  // Main detection function
  function checkMobileAndShow() {
    if (shouldShowMobileWarning()) {
      showMobileOverlay();
    } else {
      hideMobileOverlay();
    }
  }

  // Run detection when page loads
  document.addEventListener("DOMContentLoaded", function () {
    checkMobileAndShow();
  });

  // Re-check on window resize (for device rotation)
  window.addEventListener("resize", function () {
    // Debounce the resize event
    clearTimeout(window.mobileCheckTimeout);
    window.mobileCheckTimeout = setTimeout(checkMobileAndShow, 250);
  });

  // Re-check on orientation change
  window.addEventListener("orientationchange", function () {
    // Wait a bit for the orientation change to complete
    setTimeout(checkMobileAndShow, 500);
  });

  // Global function to manually hide overlay
  window.hideMobileOverlay = hideMobileOverlay;
})();
