<<<<<<< HEAD
# Music App Sprint 2

A music discovery application that helps users find new music based on their preferences and discover small artists from YouTube and Spotify.


- Shazia Sultani (22160878) - Developer
-

## Project Description

This application provides personalized music recommendations and helps users discover new artists, particularly focusing on smaller, undiscovered talent. The app tracks user listening history and preferences to improve recommendations over time.

### Key Features

- **Personalized Recommendations**: The app remembers user listening history and preferences
- **Small Artist Discovery**: Find amazing undiscovered talent on YouTube and Spotify
- **User Profile**: View listening history and manage preferences
- **Cross-Platform Discovery**: Integrates both YouTube and Spotify data

## Technologies Used

- **Frontend**: React.js
- **Testing**: Jest, React Testing Library
- **Version Control**: Git, GitHub
- **Project Management**: Trello
- **Development Methodology**: Scrum/Agile

## Installation

### Prerequisites
- Node.js
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shaz12-gif/music-app-sprint2.git
   cd music-app-sprint2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **The application will be available at:**
   ```
   Local: http://localhost:3000
   On Your Network: http://172.29.78.185:3000
   ```

## Usage

### Getting Started
1. Launch the application
2. Start listening to music to build your preference profile
3. Explore the "Small Artist Discovery" section to find new talent
4. View your listening history in your profile

### Key User Stories Implemented

#### Sprint 1
- **Listening History & Preferences**: As a returning user, the app remembers your listening history and preferences to improve your experience over time.

#### Sprint 2
- **Small Artist Discovery**: Discover small artists with low subscriber counts on YouTube and low monthly listeners on Spotify.

## Development

### Running Tests
```bash
npm test
```

**Test Results:**
- ✅ Small Artist Discovery Feature
  - ✅ shows low subscriber YouTube artists (205 ms)
  - ✅ shows low Spotify monthly listener artists (37 ms)
  - ✅ renders small artist discovery component (49 ms)
- ✅ Compiled successfully!

### Running Specific Tests
```bash
npm test src/tests/smallArtists.test.js
```

## Testing

This project uses Test-Driven Development (TDD) methodology. Tests are written using Jest and React Testing Library.

### Test Coverage
- ✅ Small Artist Discovery Component (All tests passing)
  - Shows low subscriber YouTube artists (2,500 and 1,800 subscribers)
  - Shows low Spotify monthly listener artists (4,500 and 2,100 monthly listeners)
  - Renders discovery component with loading states
  - Handles empty artist lists gracefully

### Building for Production
```bash
npm run build
```

**Note:** The development build is not optimized. To create a production build, use `npm run build`.

## API Integration

The application integrates with:
- **YouTube API**: For discovering small YouTube artists
- **Spotify API**: For accessing artist data and monthly listeners

## Development Process

This project was developed using Scrum methodology across multiple sprints:
- **Sprint 0**: Project setup and initial planning
- **Sprint 1**: Core functionality implementation
- **Sprint 2**: Feature expansion and quality improvements

## Contributing

### Development Workflow
1. Create a feature branch from `main`
2. Implement features using TDD approach
3. Write comprehensive tests
4. Submit pull request for code review
5. Merge to `Release` branch for final deployment

### Code Review Process
All code changes go through peer review before merging.

## Project Management

- **Trello Board**: [Link to your Trello board]
- **GitHub Repository**: [Link to your GitHub repo]

## Known Issues

- [List any pending issues or bugs]
- [Features planned for future development]

## License

This project is for educational purposes as part of COMP602 Software Development Practice course.

## Acknowledgments

- Course instructors and teaching assistants
- Team members for their collaboration and support
- APIs and libraries used in development

---

**Last Updated**: June 2025  
**Course**: COMP602 - Software Development Practice  
**Institution**: Auckland University of Technology
=======
<h1>Projet setup</h1>
<details>
<summary><span>Install</span></summary>
Windows:

```bash
winget install --id=OpenJS.NodeJS -v "22.10.0" -e
powershell -c "irm bun.sh/install.ps1|iex"
```

Mac:

```bash
brew install node@22 oven-sh/bun/bun
```

if `brew` not found install with command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install angular cli

```bash
bun add -g @angular/cli @ionic/cli
```

</details>

open projet in terminal run `bun i` and copy [environment.prod.ts](src/environments/environment.prod.ts) as [environment.ts](src/environments/environment.ts) and change value `domain` to your test server domain ex: http://localhost:8000
>>>>>>> a4e9ecfcfd1708944678e861531d1b37f7d6a7bd
