function handleLogin() {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const emailInput = document.getElementById("loginEmailInput").value;
    const passwordInput = document.getElementById("loginPasswordInput").value;

    const resultsContainer = document.getElementById("loginResults");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (!emailInput || !passwordInput) {
      resultsContainer.innerHTML = "Email and password are required.";
      return;
    }

    try {
      const response = await fetch("https://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
        }),
      });

      console.log(response);

      if (!response.ok) {
        if (response.status === 404) {
          resultsContainer.innerHTML = "User does not exist. Please register.";
          const registerButton = document.createElement("a");
          registerButton.href = "/register.html";
          registerButton.textContent = "Register here";
          resultsContainer.appendChild(registerButton);
          return;
        }
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();

      // redirect to the main page after successful login
      window.location.href = "/index.html";
    } catch (error) {
      console.error(error);
      resultsContainer.innerHTML = "An error occurred while logging in.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  handleLogin();
});
