import os
import json
import uuid
from functools import wraps
from flask import (
    Flask, render_template, request, redirect,
    url_for, session, flash, jsonify, send_from_directory
)
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'abhishek-portfolio-super-secret-key-2026')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'data', 'portfolioData.json')
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'pdf'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, 'data'), exist_ok=True)

# Screenshot map for initial portfolio assets
DEFAULT_SCREENSHOT_MAP = {
    'snap': 'signup form.png',
    'snap1': 'contact page.png',
    'snap2': 'home page.png',
    'snap3': 'wishlist.png',
    'snap4': 'home.png',
    'snap5': 'contact.png',
    'snap6': 'login.png',
    'snap7': 'account.png',
    'snap8': 'homepage.png',
    'snap9': 'favorite.png',
    'snap10': 'playlist page.png',
    'snap11': 'About.png',
    'snap12': 'loginpage.png',
    'snap13': 'Signuppage.png',
    'snap14': 'wetherHome.png',
    'snap15': 'wether.png',
    'snap16': 'Teacher Register.png',
    'snap17': 'Teacher login.png',
    'snap18': 'Mark Attendence.png',
    'snap19': 'Add student.png',
    'snap20': 'Class wise Attendence.png',
    'snap21': 'i homepage.png',
    'snap22': 'faculty dashboard.png',
    'snap23': 'student dashboard.png',
    'snap24': 'counsellar dashboard.png',
    'snap25': 'counselar dashbord.png',
    'snap26': 'i login.png',
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_data():
    if not os.path.exists(DATA_FILE):
        return {}
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {DATA_FILE}: {e}")
        return {}

def save_data(data):
    try:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Error saving {DATA_FILE}: {e}")
        return False

def resolve_project_screenshots(project):
    """Returns a list of web-accessible URLs for a project's screenshots."""
    urls = []
    custom_shots = project.get('screenshots', [])
    if custom_shots:
        for s in custom_shots:
            if s.startswith('http://') or s.startswith('https://') or s.startswith('/'):
                urls.append(s)
            else:
                urls.append(f"/static/uploads/{s}")
    else:
        for k in project.get('defaultScreenshotKeys', []):
            fname = DEFAULT_SCREENSHOT_MAP.get(k)
            if fname:
                urls.append(f"/static/images/{fname}")
    return urls

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('admin_logged_in'):
            flash('Please log in to access the Admin Dashboard.', 'warning')
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

# ==========================================
# PUBLIC ROUTES
# ==========================================

@app.route('/')
def index():
    data = load_data()
    profile = data.get('profile', {})
    about = data.get('about', {})
    skills = data.get('skills', {'technical': [], 'additional': []})
    experience = data.get('experience', [])
    education = data.get('education', [])
    certifications = data.get('certifications', [])
    projects_raw = data.get('projects', [])

    # Enrich projects with resolved screenshot URLs
    projects = []
    for p in projects_raw:
        p_copy = dict(p)
        p_copy['resolvedScreenshots'] = resolve_project_screenshots(p)
        projects.append(p_copy)

    # Resume URL resolution
    resume_url = profile.get('resumeUrl', '/static/Abhishek Gaikwad Resume.pdf')
    if resume_url and not (resume_url.startswith('http') or resume_url.startswith('/static/')):
        resume_url = f"/static/{resume_url.lstrip('/')}"

    # Photo URL resolution
    photo_url = profile.get('profilePhotoUrl')
    if not photo_url:
        photo_url = '/static/images/Abhishek image.jpeg'
    elif not (photo_url.startswith('http') or photo_url.startswith('/static/')):
        photo_url = f"/static/{photo_url.lstrip('/')}"

    # About Image resolution
    about_img = about.get('imageUrl')
    if not about_img:
        about_img = '/static/images/Devoloper.jpg'
    elif not (about_img.startswith('http') or about_img.startswith('/static/')):
        about_img = f"/static/{about_img.lstrip('/')}"

    return render_template(
        'index.html',
        profile=profile,
        about=about,
        skills=skills,
        experience=experience,
        education=education,
        certifications=certifications,
        projects=projects,
        resume_url=resume_url,
        photo_url=photo_url,
        about_img=about_img,
        is_admin=session.get('admin_logged_in', False)
    )

@app.route('/login', methods=['GET', 'POST'])
def login():
    if session.get('admin_logged_in'):
        return redirect(url_for('admin_dashboard'))

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()

        data = load_data()
        admin = data.get('admin', {})
        expected_user = admin.get('username', 'admin')
        stored_hash = admin.get('passwordHash', '')

        # Password matching logic
        is_valid = False
        if username == expected_user:
            if stored_hash:
                try:
                    if check_password_hash(stored_hash, password):
                        is_valid = True
                except Exception:
                    pass
            # Fallback if unhashed or default
            if not is_valid and password == 'admin':
                is_valid = True
                # auto-upgrade to werkzeug hash
                admin['passwordHash'] = generate_password_hash('admin')
                data['admin'] = admin
                save_data(data)

        if is_valid:
            session['admin_logged_in'] = True
            session['admin_user'] = username
            flash('Welcome back, Admin!', 'success')
            next_page = request.args.get('next')
            return redirect(next_page or url_for('admin_dashboard'))
        else:
            flash('Invalid username or password. Please try again.', 'danger')

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('admin_logged_in', None)
    session.pop('admin_user', None)
    flash('You have been logged out successfully.', 'info')
    return redirect(url_for('index'))

@app.route('/api/contact', methods=['POST'])
def contact():
    name = request.form.get('name', '').strip()
    email = request.form.get('email', '').strip()
    phone = request.form.get('phone', '').strip()
    message = request.form.get('message', '').strip()

    if not name or not email or not message:
        return jsonify({'success': False, 'message': 'Name, email, and message are required.'}), 400

    # Store message in contacts list inside portfolioData.json
    data = load_data()
    messages = data.setdefault('messages', [])
    messages.append({
        'id': str(uuid.uuid4())[:8],
        'name': name,
        'email': email,
        'phone': phone,
        'message': message,
        'receivedAt': request.date or 'Just now'
    })
    save_data(data)

    return jsonify({'success': True, 'message': 'Thank you! Your message has been received.'})

# ==========================================
# ADMIN DASHBOARD ROUTES
# ==========================================

@app.route('/admin')
@login_required
def admin_dashboard():
    data = load_data()
    profile = data.get('profile', {})
    about = data.get('about', {})
    skills = data.get('skills', {'technical': [], 'additional': []})
    experience = data.get('experience', [])
    education = data.get('education', [])
    certifications = data.get('certifications', [])
    projects = data.get('projects', [])
    messages = data.get('messages', [])

    # Enrich projects with resolved URLs
    for p in projects:
        p['resolvedScreenshots'] = resolve_project_screenshots(p)

    return render_template(
        'admin.html',
        profile=profile,
        about=about,
        skills=skills,
        experience=experience,
        education=education,
        certifications=certifications,
        projects=projects,
        messages=messages
    )

@app.route('/admin/update-profile', methods=['POST'])
@login_required
def update_profile():
    data = load_data()
    profile = data.setdefault('profile', {})

    profile['name'] = request.form.get('name', profile.get('name', 'Abhishek Gaikwad'))
    profile['displayName'] = request.form.get('displayName', profile.get('displayName', 'Abhishek'))
    profile['title'] = request.form.get('title', 'Full Stack Developer')
    profile['greeting'] = request.form.get('greeting', 'Hello,')

    # Intro lines
    intro_raw = request.form.get('introLines', '')
    if intro_raw:
        profile['introLines'] = [line.strip() for line in intro_raw.split('\n') if line.strip()]

    # Social links
    social = profile.setdefault('socialLinks', {})
    social['linkedin'] = request.form.get('linkedin', social.get('linkedin', ''))
    social['github'] = request.form.get('github', social.get('github', ''))
    social['facebook'] = request.form.get('facebook', social.get('facebook', ''))
    social['instagram'] = request.form.get('instagram', social.get('instagram', ''))
    social['email'] = request.form.get('email', social.get('email', ''))
    social['phone'] = request.form.get('phone', social.get('phone', ''))

    # Profile Photo upload
    if 'profilePhoto' in request.files:
        photo = request.files['profilePhoto']
        if photo and photo.filename and allowed_file(photo.filename):
            ext = photo.filename.rsplit('.', 1)[1].lower()
            fname = f"avatar_{uuid.uuid4().hex[:8]}.{ext}"
            photo.save(os.path.join(UPLOAD_FOLDER, fname))
            profile['profilePhotoUrl'] = f"/static/uploads/{fname}"

    # Resume upload
    if 'resumeFile' in request.files:
        resume = request.files['resumeFile']
        if resume and resume.filename and allowed_file(resume.filename):
            ext = resume.filename.rsplit('.', 1)[1].lower()
            fname = f"resume_{uuid.uuid4().hex[:8]}.{ext}"
            resume.save(os.path.join(UPLOAD_FOLDER, fname))
            profile['resumeUrl'] = f"/static/uploads/{fname}"

    save_data(data)
    flash('Profile details updated successfully!', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/update-about', methods=['POST'])
@login_required
def update_about():
    data = load_data()
    about = data.setdefault('about', {})

    about['bio'] = request.form.get('bio', about.get('bio', ''))
    personal = about.setdefault('personalDetails', {})
    personal['birthday'] = request.form.get('birthday', personal.get('birthday', ''))
    personal['phone'] = request.form.get('phone', personal.get('phone', ''))
    personal['email'] = request.form.get('email', personal.get('email', ''))
    personal['age'] = request.form.get('age', personal.get('age', ''))
    personal['degree'] = request.form.get('degree', personal.get('degree', ''))
    personal['city'] = request.form.get('city', personal.get('city', ''))

    # About Image upload
    if 'aboutImage' in request.files:
        img = request.files['aboutImage']
        if img and img.filename and allowed_file(img.filename):
            ext = img.filename.rsplit('.', 1)[1].lower()
            fname = f"about_{uuid.uuid4().hex[:8]}.{ext}"
            img.save(os.path.join(UPLOAD_FOLDER, fname))
            about['imageUrl'] = f"/static/uploads/{fname}"

    save_data(data)
    flash('About section updated successfully!', 'success')
    return redirect(url_for('admin_dashboard') + '#about-tab')

@app.route('/admin/update-skills', methods=['POST'])
@login_required
def update_skills():
    data = load_data()
    skills = data.setdefault('skills', {})

    tech_raw = request.form.get('technicalSkills', '')
    add_raw = request.form.get('additionalSkills', '')

    skills['technical'] = [s.strip() for s in tech_raw.split(',') if s.strip()]
    skills['additional'] = [s.strip() for s in add_raw.split(',') if s.strip()]

    save_data(data)
    flash('Skills updated successfully!', 'success')
    return redirect(url_for('admin_dashboard') + '#skills-tab')

@app.route('/admin/experience/add', methods=['POST'])
@login_required
def add_experience():
    data = load_data()
    exp_list = data.setdefault('experience', [])

    role = request.form.get('role', '').strip()
    company = request.form.get('company', '').strip()
    duration = request.form.get('duration', '').strip()
    description = request.form.get('description', '').strip()

    if role and company:
        exp_list.append({
            'id': f"exp-{uuid.uuid4().hex[:8]}",
            'role': role,
            'company': company,
            'duration': duration,
            'description': description
        })
        save_data(data)
        flash('Work experience added!', 'success')

    return redirect(url_for('admin_dashboard') + '#experience-tab')

@app.route('/admin/experience/delete/<exp_id>', methods=['POST'])
@login_required
def delete_experience(exp_id):
    data = load_data()
    data['experience'] = [e for e in data.get('experience', []) if e.get('id') != exp_id]
    save_data(data)
    flash('Work experience deleted.', 'info')
    return redirect(url_for('admin_dashboard') + '#experience-tab')

@app.route('/admin/education/add', methods=['POST'])
@login_required
def add_education():
    data = load_data()
    edu_list = data.setdefault('education', [])

    degree = request.form.get('degree', '').strip()
    institution = request.form.get('institution', '').strip()
    year = request.form.get('year', '').strip()
    details = request.form.get('details', '').strip()

    if degree and institution:
        edu_list.append({
            'id': f"edu-{uuid.uuid4().hex[:8]}",
            'degree': degree,
            'institution': institution,
            'year': year,
            'details': details
        })
        save_data(data)
        flash('Education entry added!', 'success')

    return redirect(url_for('admin_dashboard') + '#education-tab')

@app.route('/admin/education/delete/<edu_id>', methods=['POST'])
@login_required
def delete_education(edu_id):
    data = load_data()
    data['education'] = [e for e in data.get('education', []) if e.get('id') != edu_id]
    save_data(data)
    flash('Education entry deleted.', 'info')
    return redirect(url_for('admin_dashboard') + '#education-tab')

@app.route('/admin/certification/add', methods=['POST'])
@login_required
def add_certification():
    data = load_data()
    cert_list = data.setdefault('certifications', [])

    name = request.form.get('name', '').strip()
    issuer = request.form.get('issuer', '').strip()
    year = request.form.get('year', '').strip()
    credentialUrl = request.form.get('credentialUrl', '').strip()

    if name and issuer:
        cert_list.append({
            'id': f"cert-{uuid.uuid4().hex[:8]}",
            'name': name,
            'issuer': issuer,
            'year': year,
            'credentialUrl': credentialUrl
        })
        save_data(data)
        flash('Certification added!', 'success')

    return redirect(url_for('admin_dashboard') + '#education-tab')

@app.route('/admin/certification/delete/<cert_id>', methods=['POST'])
@login_required
def delete_certification(cert_id):
    data = load_data()
    data['certifications'] = [c for c in data.get('certifications', []) if c.get('id') != cert_id]
    save_data(data)
    flash('Certification deleted.', 'info')
    return redirect(url_for('admin_dashboard') + '#education-tab')

@app.route('/admin/project/add', methods=['POST'])
@login_required
def add_project():
    data = load_data()
    proj_list = data.setdefault('projects', [])

    title = request.form.get('title', '').strip() or 'New Project'
    description = request.form.get('description', '').strip()
    liveLink = request.form.get('liveLink', '').strip()

    uploaded_shots = []
    if 'screenshots' in request.files:
        files = request.files.getlist('screenshots')
        for f in files:
            if f and f.filename and allowed_file(f.filename):
                ext = f.filename.rsplit('.', 1)[1].lower()
                fname = f"proj_{uuid.uuid4().hex[:8]}.{ext}"
                f.save(os.path.join(UPLOAD_FOLDER, fname))
                uploaded_shots.append(f"/static/uploads/{fname}")

    new_p = {
        'id': f"proj-{uuid.uuid4().hex[:8]}",
        'title': title,
        'description': description,
        'liveLink': liveLink,
        'screenshots': uploaded_shots,
        'defaultScreenshotKeys': []
    }
    proj_list.append(new_p)
    save_data(data)
    flash('New project added successfully!', 'success')
    return redirect(url_for('admin_dashboard') + '#projects-tab')

@app.route('/admin/project/edit/<proj_id>', methods=['POST'])
@login_required
def edit_project(proj_id):
    data = load_data()
    projects = data.get('projects', [])
    target = next((p for p in projects if p.get('id') == proj_id), None)

    if target:
        target['title'] = request.form.get('title', target.get('title', ''))
        target['description'] = request.form.get('description', target.get('description', ''))
        target['liveLink'] = request.form.get('liveLink', target.get('liveLink', ''))

        # Add any newly uploaded screenshots
        if 'screenshots' in request.files:
            files = request.files.getlist('screenshots')
            target_shots = target.setdefault('screenshots', [])
            for f in files:
                if f and f.filename and allowed_file(f.filename):
                    ext = f.filename.rsplit('.', 1)[1].lower()
                    fname = f"proj_{uuid.uuid4().hex[:8]}.{ext}"
                    f.save(os.path.join(UPLOAD_FOLDER, fname))
                    target_shots.append(f"/static/uploads/{fname}")

        save_data(data)
        flash('Project updated successfully!', 'success')

    return redirect(url_for('admin_dashboard') + '#projects-tab')

@app.route('/admin/project/delete/<proj_id>', methods=['POST'])
@login_required
def delete_project(proj_id):
    data = load_data()
    data['projects'] = [p for p in data.get('projects', []) if p.get('id') != proj_id]
    save_data(data)
    flash('Project deleted.', 'info')
    return redirect(url_for('admin_dashboard') + '#projects-tab')

@app.route('/admin/change-password', methods=['POST'])
@login_required
def change_password():
    current_pw = request.form.get('currentPassword', '').strip()
    new_pw = request.form.get('newPassword', '').strip()

    if not current_pw or not new_pw:
        flash('Both current and new passwords are required.', 'danger')
        return redirect(url_for('admin_dashboard') + '#security-tab')

    data = load_data()
    admin = data.setdefault('admin', {})
    stored_hash = admin.get('passwordHash', '')

    valid = False
    if stored_hash:
        try:
            valid = check_password_hash(stored_hash, current_pw)
        except Exception:
            pass
    if not valid and current_pw == 'admin':
        valid = True

    if not valid:
        flash('Current password is incorrect.', 'danger')
        return redirect(url_for('admin_dashboard') + '#security-tab')

    admin['passwordHash'] = generate_password_hash(new_pw)
    save_data(data)
    flash('Admin password changed successfully!', 'success')
    return redirect(url_for('admin_dashboard') + '#security-tab')

# ==========================================
# PUBLIC API (JSON)
# ==========================================

@app.route('/api/portfolio')
def api_portfolio():
    data = load_data()
    # Sanitize admin credentials
    public_data = {k: v for k, v in data.items() if k != 'admin'}
    return jsonify(public_data)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
