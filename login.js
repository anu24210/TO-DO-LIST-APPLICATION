document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Perform validation and authentication
    // You can replace this with your own logic
    if (username === "admin" && password === "password") {
      alert("Login successful!");
      // Redirect to the main page or perform other actions
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
  