// frontend/script.js
const baseURL = "http://127.0.0.1:8000/api"; // Django API base
let token = "";

document.addEventListener("DOMContentLoaded", () => {
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

  // Check for saved token (persist login)
  const savedToken = localStorage.getItem("authToken");
  if (savedToken) {
    token = savedToken;
    document.getElementById("auth-section").classList.add("hidden");
    document.getElementById("journal-section").classList.remove("hidden");
    loadEntries();
  }

  // Toggle views
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

  async function parseResponse(res) {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }
  }

  // Register
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
      if (res.ok) {
        alert("Registration successful! Please login with your credentials.");
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        document.getElementById("username").value = username;
      } else {
        alert("Registration failed: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Network or server error during registration.");
    }
  });

  // Login
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
      if (res.ok && (data.key || data.token)) {
        token = data.key || data.token;
        localStorage.setItem("authToken", token);
        document.getElementById("auth-section").classList.add("hidden");
        document.getElementById("journal-section").classList.remove("hidden");
        loadEntries();
      } else {
        alert("Login failed: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Network or server error during login.");
    }
  });

  // Logout
    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn?.addEventListener("click", (e) => {
       e.preventDefault();
        const confirmLogout = confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        // Clear stored token
        token = "";
        localStorage.removeItem("authToken");

        // Hide journal section, show login again
        document.getElementById("journal-section").classList.add("hidden");
        document.getElementById("auth-section").classList.remove("hidden");

        // Optional: clear form fields
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        alert("You have logged out successfully.");
    }); 
    
  // Load entries
  async function loadEntries() {
    try {
      const res = await fetch(`${baseURL}/entries/`, {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await parseResponse(res);

      if (res.ok) {
        if (data.length === 0) {
          entriesDiv.innerHTML = "<p>No journal entries yet.</p>";
          return;
        }

        entriesDiv.innerHTML = data
          .map(
            (entry) => `
              <div class="entry">
                <h4 class="entry-title" data-id="${entry.id}">
                  ${escapeHtml(entry.title)}
                </h4>
                <div class="entry-content hidden" id="entry-${entry.id}">
                  <p>${escapeHtml(entry.content)}</p>
                  <small>Mood: ${escapeHtml(entry.mood || "N/A")}</small><br>
                  <small>Date: ${new Date(entry.created_at).toLocaleString()}</small><br>
                  <button class="delete-btn" data-id="${entry.id}">Delete</button>
                </div>
              </div>
            `
          )
          .join("");

        attachEntryListeners();
      } else {
        alert("Failed to load entries: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("Load entries error:", err);
      alert("Network or server error when loading entries.");
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
      alert("Network or server error when adding entry.");
    }
  });

  // Attach listeners for toggling and deleting
  function attachEntryListeners() {
    document.querySelectorAll(".entry-title").forEach((titleEl) => {
      titleEl.addEventListener("click", () => {
        const id = titleEl.dataset.id;
        const contentDiv = document.getElementById(`entry-${id}`);
        contentDiv.classList.toggle("hidden");
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const confirmDel = confirm("Are you sure you want to delete this entry?");
        if (!confirmDel) return;

        try {
          const res = await fetch(`${baseURL}/entries/${id}/`, {
            method: "DELETE",
            headers: { Authorization: `Token ${token}` },
          });

          if (res.status === 204) {
            alert("Entry deleted successfully.");
            loadEntries();
          } else {
            const data = await parseResponse(res);
            alert("Failed to delete: " + JSON.stringify(data));
          }
        } catch (err) {
          console.error("Delete error:", err);
          alert("Network or server error during delete.");
        }
      });
    });
  }

  function escapeHtml(text) {
    if (!text) return "";
    return text.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }
});
