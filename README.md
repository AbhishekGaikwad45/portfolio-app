# 💼 Abhishek Gaikwad - Full Stack Developer Portfolio (Python & Flask)

A modern, responsive, and dynamic **Portfolio & CMS Web Application** built with **Python & Flask**.  
Featuring a clean light-theme UI, interactive project galleries, contact system, and an authenticated **Admin Dashboard** for live content management without database complexity.

---

## 🚀 Key Features

- **Dynamic Hero Section**: Typewriter title effect for *"Full Stack Developer"*, intro bio, downloadable resume link, and social profiles.
- **Fixed & Centered Sidebar**: Non-scrollable on desktop, horizontally centered avatar with precision facial framing.
- **Secret Admin Trigger**: Clicking on the greeting *"Hello,"* opens the secure Admin Portal.
- **Full Admin Dashboard (`/admin`)**:
  - Edit Profile & Social Links
  - Edit About, Bio, and Personal Details
  - Manage Technical & Additional Skills
  - Manage Work Experience, Education & Certifications
  - Manage Projects (add/edit titles, live links, descriptions, and upload screenshots)
  - Change Admin Password
  - View incoming contact inquiries
- **Light Theme Design**: Modern, clean, and elegant palette with crisp contrast.
- **Responsive Layout**: Optimized for mobile, tablet, laptop, and desktop viewports.

---

## 🛠️ Tech Stack

- **Backend**: Python 3.13, Flask 3.0, Werkzeug (Security & Password Hashing)
- **Frontend**: Jinja2 Templates, HTML5, CSS3, Bootstrap 5.3, Bootstrap Icons, Vanilla JavaScript
- **Data Persistence**: Atomic JSON File Store (`data/portfolioData.json`)
- **Deployment Ready**: Gunicorn WSGI server, `Procfile`, and `render.yaml` for Render deployment

---

## 💻 Running Locally

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Flask application**:
   ```bash
   python app.py
   ```

3. **Open in browser**:
   Navigate to [http://localhost:5000](http://localhost:5000) (or the port displayed in terminal).

---

## 🔐 Admin Access

- **Secret Login**: Click on the `"Hello,"` text on the Home page (or navigate directly to `/login`).
- **Default Username**: `admin`
- **Default Password**: `admin`

---

## 👨‍💻 Author

**Abhishek Gaikwad**  
Full Stack Developer (Python, Flask, React, Node.js)

