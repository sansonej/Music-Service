window.onload = function() {
    var popup = document.getElementById("myPopup");
    // Add the 'show' class to display the popup
    popup.classList.add("show");
  
    // Optional: Hide the popup after a certain time (e.g., 5 seconds)
    setTimeout(function() {
        popup.classList.remove("show");
    }, 5000); // 5000ms = 5 seconds
  };
  