# 📩 Chat Application (React + MUI)

A modern and responsive **chat application** built using **React**, **Material-UI (MUI)**, and **React Router**.  
The app includes a **login system**, **signup page**, and a structured **home chat interface**.

---

## 🚀 Features

- 🔒 **User Authentication**
  - Login & Signup pages with validation
  - Social login buttons (Google & Facebook)
  - "Forgot Password" link
- 💬 **Chat Interface**

  - Sidebar with user list (like WhatsApp)
  - Chat window with message history
  - Emojis & attachments support

- 🎨 **Beautiful UI**
  - Styled using **Material-UI (MUI)**
  - Dark & light theme support
  - Smooth animations

---

## 📂 Folder Structure

```
/chat-app
│── /src
│   ├── /components
│   │   ├── Sidebar.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── UserItem.jsx
│   ├── /pages
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── HomePage.jsx
│   ├── App.jsx
│   ├── index.js
│── /public
│── package.json
│── README.md
```

---

## 🛠️ Installation & Setup

1️⃣ **Clone the Repository**

```sh
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

2️⃣ **Install Dependencies**

```sh
npm install
```

3️⃣ **Run the Application**

```sh
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## 🔗 Routing (React Router)

| Route     | Page       | Description             |
| --------- | ---------- | ----------------------- |
| `/`       | LoginPage  | User login form         |
| `/login`  | LoginPage  | User login              |
| `/signup` | SignupPage | User registration form  |
| `/home`   | HomePage   | Chat window & user list |

---

## 🎨 Theming & Styling

- **Primary Color:** `#023E8A` (Dark Blue)
- **Secondary Color:** `#ADE8F4` (Light Blue)
- **Components:** Styled using **MUI**

---

## 📦 Dependencies

| Package       | Version |
| ------------- | ------- |
| React         | ^18.x   |
| MUI           | ^5.x    |
| React Router  | ^6.x    |
| Framer Motion | ^10.x   |

---

## 💡 Future Enhancements

- ✅ Real backend authentication (Firebase / Node.js)
- ✅ WebSockets for real-time chat
- ✅ Notifications for new messages
- ✅ Dark mode toggle

---

## 🤝 Contributing

1. **Fork** the repository.
2. Create a **feature branch** (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. **Push** to your branch (`git push origin feature-name`).
5. Open a **Pull Request**.

---

## 🛡️ License

This project is **open-source** and available under the **MIT License**.

---

### 📧 Need Help?

Feel free to reach out or open an issue. 🚀
