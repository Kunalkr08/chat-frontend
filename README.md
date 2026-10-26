# Connectify — Real-Time Chat App

## Screenshots

### Onboarding Screen
<img width="392" height="759" alt="Screenshot 2026-10-26 at 5 01 58 PM" src="https://github.com/user-attachments/assets/dc3e420b-b5ef-408c-9a77-724a5d485f3b" />

### Signup Screen
<img width="391" height="761" alt="Screenshot 2026-10-26 at 5 01 48 PM" src="https://github.com/user-attachments/assets/eed11fe6-da71-47ec-9887-2f3218ec38f6" />

### Login Screen
<img width="396" height="765" alt="Screenshot 2026-10-26 at 5 02 09 PM" src="https://github.com/user-attachments/assets/0d60a6b6-062d-4ec9-9059-ec2a1311f8d4" />

### Email Verification Screen
<img width="382" height="754" alt="Screenshot 2026-10-26 at 5 06 08 PM" src="https://github.com/user-attachments/assets/071038cc-08dc-4a71-abf4-634af9086ea6" />

### Chat Screen
<img width="391" height="762" alt="Screenshot 2026-10-26 at 5 08 20 PM" src="https://github.com/user-attachments/assets/cc86a6f9-6929-4e0e-af8e-aa79356263dc" />

### Conversations Screen
<img width="394" height="762" alt="Screenshot 2026-10-26 at 5 10 11 PM" src="https://github.com/user-attachments/assets/b53ff256-80aa-46da-8053-b34ce583a30c" />


**Connectify** is a mobile messaging application built with React Native and Expo. It provides a simple interface for users to register, verify their email, sign in, and communicate through real-time messaging.

The application connects to a NestJS backend for authentication, message storage, and real-time communication.

## Features

- **User Registration & Login:** Create an account and securely sign in.
- **Email Verification:** Verify your email address during the registration flow.
- **Chat Interface:** Access conversations through a mobile-friendly messaging interface.
- **Real-Time Messaging:** Send and receive messages through Socket.IO.
- **Message Read Receipts:** View read status updates for messages.
- **Authentication Flow:** Handle login state, authenticated screens, and logout.
- **Cross-Platform Development:** Build and test the application using Expo for supported platforms.

## Tech Stack

| Component | Technology |
|---|---|
| Mobile framework | React Native |
| Development platform | Expo |
| Language | TypeScript |
| Navigation | Expo Router |
| Backend integration | REST APIs |
| Real-time communication | Socket.IO Client |
| Authentication | JWT-based backend authentication |

## How It Works

```text
       User
        |
        v
  Connectify App
  React Native + Expo
        |
        +------ REST API requests
        |
        +------ Socket.IO connection
                       |
                       v
               NestJS Backend
                       |
                       v
                PostgreSQL
```

The frontend handles the user interface and application navigation. The backend validates requests, manages authentication, persists messages, and delivers real-time events.

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- Expo Go or a compatible development build
- A running Connectify backend

### 1. Clone the repository

```bash
git clone https://github.com/Kunalkr08/chat-frontend.git
cd chat-frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root and configure the backend URLs:

```env
EXPO_PUBLIC_API_URL=http://YOUR_BACKEND_HOST:3000
EXPO_PUBLIC_SOCKET_URL=http://YOUR_BACKEND_HOST:3000
```

Replace `YOUR_BACKEND_HOST` with the appropriate hostname or IP address for your environment. Use the actual port configured by your backend.

**Important:**
- For Android emulators, use the host address appropriate to your emulator configuration.
- For physical devices, use your computer's LAN IP if the backend is running locally.
- For production, use your deployed backend's HTTPS/WSS endpoint as appropriate.
- Only expose public configuration in `EXPO_PUBLIC_` variables. Never put private keys or backend secrets in the mobile app.

### 3. Start the application

```bash
npx expo start
```

Follow the terminal instructions to open the application in Expo Go, an Android emulator, an iOS simulator, or a compatible development build.

## Connecting to the Backend

The frontend requires the Connectify backend for authentication, email verification, and messaging functionality.

**Backend repository:** [github.com/Kunalkr08/chat-backend](https://github.com/Kunalkr08/chat-backend)

Ensure the backend is running, its database is configured, and its CORS and network settings allow connections from your development environment.

## Project Structure

The application uses Expo Router for file-based navigation and organizes its source code under `src/`.

```text
chat-frontend/
├── assets/          # Images and other static assets
├── src/             # Application source code
├── .env.example     # Example environment configuration
├── app.json         # Expo application configuration
├── package.json     # Dependencies and scripts
└── README.md        # Project documentation
```

## Future Improvements

Potential areas for further development include enhanced profile management, push notifications, and additional messaging capabilities.

## Related Repository

- **Backend API:** [chat-backend](https://github.com/Kunalkr08/chat-backend)

## License

See the repository's [MIT license](https://github.com/Kunalkr08/chat-frontend/blob/main/LICENSE).
