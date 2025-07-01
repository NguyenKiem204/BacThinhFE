# BacThinhFE

A modern React application built with Vite, Tailwind CSS, and the latest technologies.

## 🚀 Tech Stack

- **React 19** - Latest React with new features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Zustand** - Lightweight state management
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Yup** - Schema validation
- **Lucide React** - Beautiful icons
- **ESLint** - Code quality

## 📁 Project Structure

```
src/
├── components/     # Shared components
├── features/       # Feature modules
├── pages/         # Page components
├── layouts/       # Layout components
├── hooks/         # Custom hooks
├── services/      # API services
├── store/         # State management
├── utils/         # Utility functions
├── routes/        # Route definitions
└── providers/     # Context providers
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd BacThinhFE
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features

- **Modern Architecture** - Feature-based folder structure
- **Type Safety** - Full TypeScript support
- **Responsive Design** - Mobile-first approach with Tailwind
- **State Management** - Zustand for global state
- **Data Fetching** - React Query for server state
- **Form Handling** - React Hook Form with validation
- **Routing** - React Router with nested routes
- **Code Quality** - ESLint configuration

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=BacThinhFE
```

### Vite Configuration

The project includes:

- Path aliases for clean imports
- PostCSS with Tailwind CSS
- Development server configuration

## 📚 Usage Examples

### Using Components

```jsx
import Button from "@components/Button";

function MyComponent() {
  return (
    <Button variant="primary" size="lg">
      Click me
    </Button>
  );
}
```

### Using Hooks

```jsx
import { useLocalStorage } from "@hooks/useLocalStorage";

function MyComponent() {
  const [value, setValue] = useLocalStorage("my-key", "default");

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue("new value")}>Update</button>
    </div>
  );
}
```

### Using State Management

```jsx
import useAuthStore from "@store/useAuthStore";

function LoginForm() {
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (credentials) => {
    const result = await login(credentials);
    if (result.success) {
      // Redirect or show success message
    }
  };
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
