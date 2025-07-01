import { loginWithGoogle, loginWithFacebook } from "@features/auth/authAPI";

export default function SocialLogin() {
  const handleGoogle = async () => {
    const response = await loginWithGoogle();
    if (!response.success) {
      alert(response.message);
    }
  };

  const handleFacebook = async () => {
    const response = await loginWithFacebook();
    if (!response.success) {
      alert(response.message);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 48 48">
          <g>
            <path
              fill="#4285F4"
              d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.18 0 24 0 14.82 0 6.68 5.48 2.69 13.44l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.64 7.02l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"
            />
            <path
              fill="#FBBC05"
              d="M10.67 28.65c-1.13-3.36-1.13-6.94 0-10.3l-7.98-6.2C.9 16.36 0 20.06 0 24c0 3.94.9 7.64 2.69 11.15l7.98-6.2z"
            />
            <path
              fill="#EA4335"
              d="M24 48c6.18 0 11.64-2.04 15.52-5.55l-7.19-5.6c-2.01 1.35-4.6 2.15-8.33 2.15-6.38 0-11.87-3.63-14.33-8.89l-7.98 6.2C6.68 42.52 14.82 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </g>
        </svg>
        Đăng nhập với Google
      </button>

      <button
        type="button"
        onClick={handleFacebook}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"
          />
        </svg>
        Đăng nhập với Facebook
      </button>
    </div>
  );
}
