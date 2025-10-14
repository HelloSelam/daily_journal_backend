// frontend/script.js
const baseURL = "http://127.0.0.1:8000/api"; // backend API base
let token = localStorage.getItem("token") || "";

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const showRegister = document.getElementById("show-register");
  const showLogin = document.getElementById("show-login");
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const addEntryBtn = document.getElementById("add-entry-btn");
  const entriesDiv = document.getElementById("entries");

  if (!loginForm || !registerForm) {
    console.error("Auth forms not found in DOM. Check your index.html IDs.");
    return;
  }

  // Toggle between login and signup
  showRegister?.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  });

  showLogin?.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  // Helper to parse fetch responses
  async function parseResponse(res) {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }
  }

  // Show journal page
  function showJournalPage() {
    if (!token) return; // Not logged in
    document.getElementById("auth-section").classList.add("hidden");
    document.getElementById("journal-section").classList.remove("hidden");
    loadEntries();
  }

  // LOGIN
  loginBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    try {
      const res = await fetch(`${baseURL}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await parseResponse(res);
      console.log("Login response:", res.status, data);

      if (res.ok && (data.key || data.token)) {
        token = data.key || data.token;
        localStorage.setItem("token", token); // Store token
        showJournalPage();
      } else {
        alert("Login failed: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Network or server error during login. See console for details.");
    }
  });

  // REGISTER
  registerBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password1 = document.getElementById("reg-password1").value;
    const password2 = document.getElementById("reg-password2").value;

    if (!username || !email || !password1 || !password2) {
      alert("Please fill all registration fields.");
      return;
    }
    if (password1 !== password2) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${baseURL}/auth/registration/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password1, password2 }),
      });

      const data = await parseResponse(res);
      console.log("Registration response:", res.status, data);

      if (res.ok) {
        alert("Registration successful! Please log in.");
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        document.getElementById("username").value = username; // prefill username
      } else {
        alert("Registration failed: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Network or server error during registration. See console for details.");
    }
  });

  // Logout
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    token = "";
    location.reload();
  });

  // Load journal entries
  async function loadEntries() {
    try {
      const res = await fetch(`${baseURL}/entries/`, {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await parseResponse(res);
      console.log("Load entries response:", res.status, data);

      if (res.ok) {
        entriesDiv.innerHTML = data
          .map((entry) => {
            const date = entry.created_at ? new Date(entry.created_at).toLocaleString() : "";
            return `<div class="entry">
                      <h4>${escapeHtml(entry.title)}</h4>
                      <p>${escapeHtml(entry.content)}</p>
                      <small>Mood: ${escapeHtml(entry.mood || "N/A")} | Date: ${date}</small>
                    </div>`;
          })
          .join("");
      } else {
        alert("Failed to load entries: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("Load entries error:", err);
      alert("Network or server error when loading entries. See console.");
    }
  }

  // Add entry
  addEntryBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const mood = document.getElementById("mood").value.trim();

    if (!title || !content) {
      alert("Please provide title and content.");
      return;
    }

    try {
      const res = await fetch(`${baseURL}/entries/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ title, content, mood }),
      });

      const data = await parseResponse(res);
      console.log("Create entry response:", res.status, data);

      if (res.ok) {
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
        document.getElementById("mood").value = "";
        loadEntries();
      } else {
        alert("Failed to add entry: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("Add entry error:", err);
      alert("Network or server error when adding entry. See console.");
    }
  });

  // Escape HTML helper
  function escapeHtml(text) {
    if (!text) return "";
    return text.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  // Show journal page if already logged in
  if (token) {
    showJournalPage();
  }
});