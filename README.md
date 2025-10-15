# 📝 Daily Journal App

A simple **Daily Journal Web Application** built with **Django REST Framework** (backend) and **HTML, CSS, and JavaScript** (frontend).  
It allows users to **register, log in, and manage personal journal entries** securely with authentication.

---

## 🚀 Features

- 🔐 **User Authentication**  
  Users can register, log in, and log out securely using token-based authentication.

- 📓 **Journal Management (CRUD)**  
  Create, view, and delete journal entries.

- ✨ **User-Friendly Interface**  
  - Only entry titles are listed.  
  - Clicking a title reveals its content.  
  - Entries can be deleted easily.  

- 🔁 **Dynamic Frontend Integration**  
  The frontend interacts with the backend API in real time using JavaScript `fetch()`.

---

## 🧱 Tech Stack

**Frontend:**
- HTML5  
- CSS3  
- Vanilla JavaScript  

**Backend:**
- Django  
- Django REST Framework  
- dj-rest-auth & django-allauth (for authentication)  
- SQLite (local development)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/HelloSelam/daily_journal_backend.git
cd daily_journal_backend 
```

### 2️⃣ Set Up a Virtual Environment
python -m venv venv
venv\Scripts\activate     # On Windows
# or
source venv/bin/activate  # On Mac/Linux

### 3️⃣ Install Dependencies
pip install -r requirements.txt

### 4️⃣ Configure Environment Variables
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3

### 5️⃣ Run Migrations
python manage.py migrate

### 6️⃣ Start the Development Server
python manage.py runserver

```
Backend will run on:
👉 http://127.0.0.1:8000/

```

### 7️⃣ Open the Frontend
- Open frontend/index.html using Live Server (e.g., in VS Code) or any local web server.
- The frontend connects to your backend API (set to http://127.0.0.1:8000/api/).

---

### 🔗 API Endpoints

| Endpoint                  | Method    | Description                         |
| ------------------------- | --------- | ----------------------------------- |
| `/api/auth/registration/` | POST      | Register a new user                 |
| `/api/auth/login/`        | POST      | Log in and get authentication token |
| `/api/auth/logout/`       | POST      | Log out user                        |
| `/api/entries/`           | GET, POST | List all entries / Create new entry |
| `/api/entries/<id>/`      | DELETE    | Delete an entry                     |

---

### 🧩 Folder Structure
```
daily_journal_project/
│
├── journal/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── api_urls.py
│
├── manage.py
│
frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
.env
.gitignore
requirements.txt
```

### 🌍 Deployment (for later)
**Backend (Render or Railway)**
- 1. Push your project to GitHub.
- 2. Connect your repo to Render or Railway
- 3. Add your .env variables in the deployment dashboard.
- 4. Deploy — your API will be live!

**Frontend (Netlify or GitHub Pages)**
- 1. Upload your frontend folder to Netlify
 or host via GitHub Pages.
- 2. Update baseURL in frontend/script.js to point to your deployed backend API.

### 🔜 Upcoming Improvements
- ✏️ Edit/Update existing entries
- 🔍 Search entries by title or mood
- 🌙 Dark mode toggle
- ☁️ Full deployment (API + Frontend)

### 👩‍💻 Author

Selamawit Yeruk
Built as part of the ALX Back-End Development Capstone Project.
💻 Passionate about web development, learning Django & API integration.

### 🌐 Deployed Demo (Coming Soon)

- 🔗 Backend API: https://backend-url.onrender.com/api/
- 🔗 Frontend (Live App): https://frontend-url.netlify.app/