# Emoji Diary: Your Daily Emotion Tracker

Emoji Diary is a React web application that allows users to track their daily emotions and write diary entries. The application provides a simple and intuitive interface for recording your mood and thoughts each day.

## Features

- **Daily Entries**: Log your mood and write notes for each day
- **Dashboard View**: View all your past entries in a scrollable list
- **Calendar View**: See your emotions at a glance in a monthly calendar format
- **Stats**: (Coming soon!) Analytics about your mood patterns
- **Dark/Light Mode**: Toggle between dark and light themes based on your preference
- **Responsive Design**: Works on desktop and mobile devices

## Technical Details

The application is built using modern web technologies:

- **React**: Frontend library for building the user interface
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling and responsive design
- **React Router**: For navigation between different views
- **Red-Black Tree**: For efficient storage and retrieval of diary entries
- **LocalStorage**: For persisting data between sessions

## Project Structure
```
src/
├── common/          # Common UI components
├── components/      # Main components
│   ├── status/     # Monthly Status view
│   ├── dashboard/   # Dashboard view
│   ├── entry/       # Entry creation and viewing
├── context/         # React context providers
├── icons/           # SVG icons as React components
├── interface/       # TypeScript interfaces
├── lib/             # Utility libraries
│   ├── tree/        # Red-black tree implementation
│   └── utils/       # Helper functions
└── router/          # Routing configuration
```

## Installation and Usage

### Prerequisites
- Node.js (v14 or higher recommended)
- npm (v6 or higher recommended)

### Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open http://localhost:3000 in your browser

### Building for Production
To create an optimized production build:
```bash
npm run build
```
This will create a `build` folder with the production-ready application.

## Development

### Available Scripts

- **`npm start`**: Runs the development server
- **`npm test`**: Launches the test runner
- **`npm run build`**: Creates a production build
- **`npm run eject`**: Ejects from Create React App configuration

## Usage

1. **Dashboard**: View all your entries chronologically
2. **Add Entry**: Click the "Add New Entry" button to create a new diary entry
    - Select an emoji that represents your mood
    - Write your thoughts in the note field
    - Save your entry
3. **Calendar**: Navigate to the Calendar tab to see your entries in a calendar format
    - Click on any day with an entry to view the full details
4. **Entry Details**: Click on any entry to view its full content

## Future Enhancements

- "More" Statistics and mood trends analysis
- Export/import functionality for diary data (or you can also manually update the local storage to perform this)
- Custom emoji support

## License

This project is licensed under the MIT License.
