# Coffee Express - Smart Coffee Machine Frontend

A modern React-based user interface for controlling a smart coffee machine. This frontend application provides an intuitive interface for users to select coffee types, sizes, and manage the coffee preparation process.

## 🚀 Features

- **Coffee Selection**: Choose from Americano, Tinto, or Café con leche
- **Size Options**: Select from Small (100ml), Medium (150ml), or Large (250ml)
- **Real-time Communication**: Integrates with coffee machine backend via API
- **Interactive UI**: Modern, responsive design with smooth animations
- **Order Management**: Complete order flow from selection to completion
- **Status Tracking**: Real-time updates on coffee preparation status

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.0
- **Styling**: Tailwind CSS 4.1.11
- **State Management**: TanStack React Query 5.81.5
- **Icons**: Lucide React 0.525.0
- **UI Components**: Custom components with Radix UI primitives
- **Development**: ESLint, TypeScript support

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cafe-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
cafe-frontend/
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── button.jsx          # Reusable button component
│   │   ├── hooks/
│   │   │   └── useCoffeeAPI.js         # API communication hook
│   │   │   └── utils.js                # Utility functions
│   │   └── App.jsx                     # Main application component
│   └── main.jsx                    # Application entry point
├── public/                         # Static assets
├── package.json                    # Dependencies and scripts
└── vite.config.js                  # Vite configuration
```

## 🔌 API Integration

The application communicates with a coffee machine backend through the `useCoffeeAPI` hook. The API endpoint is configured to send commands to control the coffee machine:

- **Variable Setting**: Sends boolean and integer variables to control machine operations
- **Coffee Types**: Maps coffee selections to numerical values (0: Americano, 1: Tinto, 2: Café)
- **Size Selection**: Maps size selections to numerical values (0: 100ml, 1: 150ml, 2: 250ml)

### API Endpoints

- `POST /set-variable` - Sets variables on the coffee machine
  - Parameters: `variable_name`, `variable_type`, `value`

## 🎨 UI Components

### Coffee Selection Interface
- Interactive buttons for coffee type selection
- Visual feedback with icons and descriptions
- Responsive grid layout

### Size Selection Interface
- Three size options with volume indicators
- Consistent styling with coffee selection

### Order Flow
1. **Selection Phase**: Choose coffee type and size
2. **Processing Phase**: Loading animation during preparation
3. **Completion Phase**: Success message with option to retrieve cup

## 🔧 Configuration

### Environment Variables
The API URL is currently hardcoded in `src/hooks/useCoffeeAPI.js`. For production, consider using environment variables:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://your-api-url.com/'
```

### Styling
The application uses Tailwind CSS for styling. Custom styles can be added in `src/index.css`.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Hosting
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of an academic project for automatic control systems. Please refer to your institution's guidelines for usage and distribution.

## 🆘 Support

For technical support or questions about the coffee machine integration, please contact the development team or refer to the backend API documentation.

---

**Note**: This frontend is designed to work with a specific coffee machine backend. Ensure the backend service is running and accessible before using this application.