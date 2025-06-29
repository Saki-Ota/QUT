function handleRegister() {
  const loginForm = document.getElementById("registerForm");
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const emailInput = document.getElementById("registerEmailInput").value;
    const passwordInput = document.getElementById("registerPasswordInput").value;

    const resultsContainer = document.getElementById("registerResults");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (!emailInput || !passwordInput) {
      resultsContainer.innerHTML = "Email and password are required.";
      return;
    }

    try {
      const response = await fetch("https://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
        }),
      });

      if (!response.ok) {
        throw new Error("Register failed. Please check your credentials.");
      }

      const data = await response.json();

      // redirect to the main page after successful login
      window.location.href = "/login.html";
    } catch (error) {
      console.error(error);
      resultsContainer.innerHTML = "An error occurred while logging in.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  handleRegister();
});
