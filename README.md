# Client-Side Application

This repository contains the frontend code for the **GTA Garage Deals** application, a platform to create, manage, and browse garage sales in the Greater Toronto Area.

## Features

- **Interactive Map**: View active garage sales on a map using Google Maps.
- **Search Functionality**: Search for items across different garage sales.
- **User Authentication**: Login and registration for users.
- **Garage Sale Management**: Create, edit, and delete garage sales.
- **Item Management**: Add, edit, and delete items within a garage sale.

## Technology Stack

- **React**: Framework for building the user interface.
- **CSS Modules**: Scoped styling for components.
- **Axios**: API calls to the backend.
- **Google Maps API**: Map integration for viewing garage sales.
- **React Router**: For navigation between pages.

## Prerequisites

- Node.js (v14 or above)
- npm or yarn

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/client-repo.git
   cd client-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add the following variables:

   ```env
   REACT_APP_API_URL=https://your-backend.onrender.com
   REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

   Replace `https://your-backend.onrender.com` with the URL of your backend and `your-google-maps-api-key` with your Google Maps API key.

### Running the Application

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
src/
├── components/       # Reusable React components
├── pages/            # Page-level components
├── services/         # API service configurations
├── styles/           # Global and modular CSS files
├── App.js            # Main application component
└── index.js          # Entry point
```

## Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy the contents of the `build/` folder to your hosting platform.

## Available Scripts

- `npm start`: Runs the app in development mode.


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
