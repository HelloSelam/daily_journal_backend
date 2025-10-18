# 📝 Daily Journal App

A simple **Daily Journal Web Application** built with **Django REST Framework** (backend) and **HTML, CSS, and JavaScript** (frontend).  
It allows users to **register, log in, and manage personal journal entries** securely with authentication.

---

## 🚀 Features

- 🔐 **User Authentication**  
  - Users can register, log in, and log out securely using token-based authentication.

- 📓 **Journal Management (CRUD)**  
  - Create, view, and delete journal entries.

- ✨ **User-Friendly Interface**  
  - Only entry titles are listed.  
  - Clicking a title reveals its content.  
  - Entries can be deleted easily.  

- 🔁 **Dynamic Frontend Integration**  
  - The frontend interacts with the backend API in real time using JavaScript `fetch()`.

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

- **On Windows**
    - python -m venv venv
    - venv\Scripts\activate


- **On Mac/Linux**
    - source venv/bin/activate

### 3️⃣ Install Dependencies
- pip install -r requirements.txt

### 4️⃣ Configure Environment Variables

```
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=127.0.0.1,localhost
```

### 5️⃣ Run Migrations
``` python manage.py migrate ```

### 6️⃣ Start the Development Server

``` python manage.py runserver ```

- Backend will run on:

    ```
    http://127.0.0.1:8000/ 
    ```

### 7️⃣ Open the Frontend
- Open frontend/index.html using Live Server (e.g., in VS Code) or any local web server.
- The frontend connects to backend API (set to http://127.0.0.1:8000/api/).

---

## 🔗 API Endpoints

| Endpoint                  | Method    | Description                         |
| ------------------------- | --------- | ----------------------------------- |
| `/api/auth/registration/` | POST      | Register a new user                 |
| `/api/auth/login/`        | POST      | Log in and get authentication token |
| `/api/auth/logout/`       | POST      | Log out user                        |
| `/api/entries/`           | GET, POST | List all entries / Create new entry |
| `/api/entries/<id>/`      | DELETE    | Delete an entry                     |

---

# 🧪 Testing the API Endpoints

This section guides you through testing the Journal API endpoints locally.

## 🧍 Register a New User

- Endpoint: POST /api/auth/register/
  
  ```
  Example request (JSON):
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password1": "StrongPass123",
    "password2": "StrongPass123"
  }
  
  Expected response:

  {
    "Regusteration successfull! Please login."
  }

  ```

## 🔑 Login

- Endpoint: POST /api/auth/login/

  ```
  Example request (JSON):

  {
    "username": "testuser",
    "password": "StrongPass123"
  }


  Expected response:

  {
    "key": "5a7f90b8a48c19b72cd941f4ff7fbcf9d894e9b2"
  }
  ```

## 📓 CRUD Journal Entries
- Use the token from the login or registration response in your headers:

```
Authorization: Token 5a7f90b8a48c19b72cd941f4ff7fbcf9d894e9b2
```

## ➕ Create a Journal Entry
- Endpoint: POST /api/entries/

  ```
  Example request (JSON):

  {
  "title": "My first journal entry",
  "content": "Testing API with token auth",
  "mood": "Excited"
  }

  Expected response:

  {
    "id": 1,
    "title": "My first journal entry",
    "content": "Testing API with token auth",
    "mood": "Excited",
    "created_at": "2025-10-17T11:25:43.892Z",
    "updated_at": "2025-10-17T11:25:43.892Z",
    "owner": 1
  }
  
  Another Example Entry 

  {
    "title": "Grateful Day",
    "content": "Today I felt very productive and calm.",
    "mood": "Happy"
  }


  Expected response:

  {
    "id": 2,
    "title": "Grateful Day",
    "content": "Today I felt very productive and calm.",
    "mood": "Happy",
    "created_at": "2025-10-17T11:25:43.892Z",
    "updated_at": "2025-10-17T11:25:43.892Z",
    "owner": 1
  }
  
  ```
 

## 👀 View All Journal Entries
- Endpoint: GET /api/entries/
  ```
  Expected response:

  [
    {
      "id": 1,
      "title": "Grateful Day",
      "content": "Today I felt very productive and calm.",
      "mood": "Happy",
      "created_at": "2025-10-17T11:25:43.892Z",
      "updated_at": "2025-10-17T11:25:43.892Z",
      "owner": 1
    }
  ]
  ```

## 🗑️ Delete a Journal Entry
- Endpoint: DELETE /api/entries/1/
  ```
  Expected response:
  Status 204 No Content on success.
  ```

## 🧩 Folder Structure
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

---

## 🔜 Upcoming Improvements
- ✏️ Edit/Update existing entries
- 🔍 Search entries by title or mood
- 🌙 Dark mode toggle
- ☁️ Full deployment (API + Frontend)

---

## 👩‍💻 Author

## Selamawit Yeruk

Built as part of the ALX Back-End Development Capstone Project.
💻 Passionate about web development, learning Django & API integration.

---