const apiKey = "df83af87ad75499f9648325e451efdc6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

let unit = "metric";

document.getElementById("toggleUnitBtn").addEventListener("click", () => {
    unit = unit === "metric" ? "imperial" : "metric";
    document.getElementById("toggleUnitBtn").innerText = unit === "metric" ? "Switch to ℉" : "Switch to ℃";
    const city = document.getElementById("city").value.trim();
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        });
    } else {
        console.error("Geolocation is not available.");
    }
});

// Function to fetch weather by coordinates
async function getWeatherByCoords(lat, lon) {
    const weatherDiv = document.getElementById("weatherData");
    weatherDiv.innerHTML = "<p>Loading...</p>";  // Loading Message

    try {
        const response = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error("Location not found");
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error:", error);
        weatherDiv.innerText = error.message;
    }
}

// Check for Geolocation and fetch weather if permission is granted


// Function to display weather Data
function displayWeather(data) {
    const temperatureUnit = unit === "metric" ? "℃" : "℉";
    const icon = data.weather[0].icon;
    const weatherDiv = document.getElementById("weatherData");
    weatherDiv.innerHTML = `
    <h2>Weather in ${data.name}<h2>
    <p>Temperature: ${data.main.temp}℃</p> 
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Weather: ${data.weather[0].description}</p>
    `;
}
// Event listener for the button
document.getElementById("getWeatherBtn").addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        });
    } else {
        console.error("Geolocation is not available.");
    }
});

function signUpUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('signupForm').value;
    const password = document.getElementById('signupForm').value;

    // Store credentials in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    showAlert('Sign up successful! You can now log in.');

    // Switch to login
    toggleForms();
}

function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById('loginForm').value;
    const password = document.getElementById('loginForm').value;

    // Retrieve credentials in localStorage
    localStorage.getItem('username', username);
    localStorage.getItem('password', password);

    // Validation
    if (username === username && password === password) {
        showAlert('Login successful!');
    } else {
        showAlert('Invalid username or password. Please try again.')
    }
}

// Function for alert message
function showAlert(message) {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    alertBox.style.display = 'flex';
}

// Function to close alert message
function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    alertBox.style.display = 'none'; // Hide the alert
}

 // Redirect login to category modal
 const modal = document.getElementById("loginModal");
 const closeModalBtn = document.getElementById("closeModalBtn");

 // Handle form submission
 loginForm.addEventListener("submit", (event) => {
   // Allow form submission to proceed immediately
   console.log("Form submitted");
   setTimeout(() => {
     // Open modal after the alert is dismissed
     modal.style.display = "block";
     console.log("Modal opened after alert");
   }, 0); // Delay to ensure alert shows after form submission
 });
 // Close modal when 'x' is clicked
 closeModalBtn.addEventListener("click", () => {
   modal.style.display = "none";
   console.log("Modal closed");
 });

 // Close modal when clicking outside the modal content
 window.addEventListener("click", (event) => {
   if (event.target == modal) {
     modal.style.display = "none";
     console.log("Modal closed by clicking outside");
   }
 });

  // Store cart items in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Display cart items
  function displayCart() {
    const cartContainer = document.getElementById("cart");
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    
    cartContainer.innerHTML = '';  // Clear existing items

    cartItems.forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.textContent = `${item.name} - KSh ${item.price}`;
      cartContainer.appendChild(itemElement);
    });
  }

  displayCart();

  // Handle payment button click
  document.getElementById("paymentBtn").addEventListener("click", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
    
    // Redirect to M-Pesa payment processing (simulate with alert)
    initiatePayment(totalAmount);
  });

  // Initiate M-Pesa payment process
  function initiatePayment(amount) {
    // Example of sending data to your server to initiate M-Pesa payment
    alert(`Redirecting to M-Pesa payment gateway for KSh ${amount}...`);

    // Here you would send a request to your backend (server) that communicates with M-Pesa API
    // For now, let's assume we just show a simple confirmation
    // Make sure your backend is set up to handle M-Pesa payment request
  }
// Function to toggle password visibility and icon
function togglePasswordVisibility() {
  const passwordField = document.getElementById('loginPassword');
  const toggleIcon = document.querySelector('.toggle-password');
  
  // Check if the passwordField exists to avoid errors
  if (passwordField && toggleIcon) {
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      toggleIcon.textContent = '🙈'; // Change icon to hide icon
    } else {
      passwordField.type = 'password';
      toggleIcon.textContent = '👁'; // Change icon to show icon
    }
  } else {
    console.error("Password field not found");
  }
}

