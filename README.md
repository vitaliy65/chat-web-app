# Chat Web App

A real-time chat application built with Next.js, Tailwind CSS, MongoDB (Mongoose), and additional libraries.

## Roadmap

### Phase 1: Project Setup

- [x] Initialize Next.js project (`npx create-next-app@latest chat-web-app`)
- [x] Install dependencies:
  - Tailwind CSS (`npm install -D tailwindcss postcss autoprefixer`)
  - MongoDB & Mongoose (`npm install mongoose`)
  - Authentication (e.g., NextAuth.js) (`npm install next-auth`)
  - Real-time updates (e.g., Socket.io or Pusher) (`npm install socket.io` or `npm install @pusher/pusher`)
- [x] Configure Tailwind (`npx tailwindcss init -p`)

### Phase 2: Database & API

- [x] Set up MongoDB connection with Mongoose
- [x] Define Mongoose schemas/models for users and messages
- [x] Create API routes for authentication, sending messages, and fetching chat history

### Phase 3: Frontend Development

- [x] Design UI with Tailwind CSS
- [x] Implement chat interface with real-time message updates
- [x] Add authentication using NextAuth.js

### Phase 4: Real-time Messaging

- [x] Integrate WebSockets (Socket.io)
- [x] Display live messages in the chat window
- [x] Show online/offline status of users

### Phase 5: Additional Features

- [ ] Implement user profiles and avatars
- [ ] Add message reactions and typing indicators
- [ ] Enable file and image sharing

### Phase 6: Deployment

- [ ] Set up environment variables for production
- [ ] Deploy to Vercel or another hosting provider
- [ ] Connect to a remote MongoDB database (e.g., MongoDB Atlas)

## Installation

```sh
# Clone the repository
git clone https://github.com/your-username/chat-web-app.git
cd chat-web-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

## License

MIT
