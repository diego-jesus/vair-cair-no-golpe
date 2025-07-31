# Vai Cair no Golpe? - Game Development Guide

## Overview

This is a Brazilian Portuguese casual decision-making game where players judge whether simulated messages are scams ("golpes") or trustworthy ("confiável"). The game combines humor, social criticism, and light cybersecurity education in an engaging format.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

### Visual Improvements and Educational Library
- **Enhanced Visual Design**: Transformed the game interface with vibrant colors, Brazilian cultural elements, and engaging animations targeting 30+ users with lower income
- **New Educational Library**: Added comprehensive "Biblioteca Anti-Golpe" feature with detailed information about 6 major scam types including phishing, fake prizes, WhatsApp cloning, card cloning, fake technical support, and easy loan scams
- **Educational Content**: Each scam type includes detailed explanations of how it happens, red flags to watch for, protection measures, and real examples
- **User Experience**: Enhanced buttons with gradients, emojis, and hover effects to make the interface more attractive and accessible for the target demographic

### Legal and Licensing (January 31, 2025)
- **Apache 2.0 License**: Added complete Apache License 2.0 with Diego Oliveira as copyright holder for 2025
- **License Visibility**: Integrated license notice in website footer with specific text about visual identity protection
- **Open Source Initiative**: Project now properly licensed as educational and open source initiative
- **GitHub Ready**: Complete README.md and Vercel deployment configuration for repository `diego-jesus/vair-cair-no-golpe`
- **Production Deploy**: Configured automatic deployment to Vercel with custom domain support

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand with subscribeWithSelector middleware
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **3D Graphics**: React Three Fiber (@react-three/fiber) with Drei utilities
- **Animation**: Custom CSS animations and React Three postprocessing

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Structure**: RESTful API with `/api` prefix
- **Development**: Hot reload with Vite middleware integration
- **Production**: Bundled with esbuild for optimal performance

### Game Architecture
- **Game Loop**: State-driven with multiple phases (menu, playing, feedback, result)
- **Game Modes**: Four distinct modes (Clássico, Tiozão, Empresa, Aprendiz)
- **Message System**: JSON-based message database with categorization
- **Scoring**: Combo-based scoring with bonus multipliers
- **Timer**: Progressive difficulty with decreasing time limits

## Key Components

### Game State Management
- **useGameStore**: Central game state with Zustand
- **useAudio**: Audio management for sound effects and music
- **useGame**: Phase management for game lifecycle

The game uses a state-driven architecture where the main game loop transitions between:
1. Menu screen for mode selection
2. Playing screen with message presentation
3. Feedback screen showing correct/incorrect answers
4. Result screen with final scores and confidence levels

### Data Layer
- **Database**: Drizzle ORM configured for PostgreSQL with Neon Database
- **Schema**: User management system (currently minimal)
- **Storage**: In-memory storage implementation with interface for future database integration
- **Messages**: Static JSON data with rich message metadata including categories, types, and explanations

### UI System
- **Design Language**: WhatsApp-inspired styling with Brazilian cultural elements
- **Component Library**: Comprehensive shadcn/ui implementation
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## Data Flow

1. **Game Initialization**: User selects game mode from menu
2. **Message Selection**: System filters messages by selected mode and shuffles them
3. **Round Processing**: Timer starts, user makes choice, system calculates score
4. **Feedback Loop**: Immediate feedback with explanation and score update
5. **Progressive Difficulty**: Timer decreases every 2 rounds
6. **Game Completion**: Final scoring with confidence level assessment

### Message Processing
Messages are categorized by:
- **Type**: WhatsApp, email, SMS, website
- **Category**: Scam type (phishing, fake prizes, impersonation)
- **Mode Compatibility**: Which game modes can use the message
- **Difficulty Indicators**: Urgency flags and deception complexity

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **@tanstack/react-query**: Server state management
- **@react-three/fiber & @react-three/drei**: 3D graphics and utilities
- **class-variance-authority**: Type-safe component variants
- **date-fns**: Date manipulation utilities

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling
- **drizzle-kit**: Database migrations and schema management
- **vite-plugin-glsl**: GLSL shader support for 3D graphics

### UI and Styling
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **@fontsource/inter**: Web font integration
- **lucide-react**: Icon library

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with Express middleware
- **TypeScript**: Real-time compilation and type checking
- **Database**: Local development with Drizzle push for schema updates

### Production Build
1. **Frontend**: Vite builds static assets to `dist/public`
2. **Backend**: esbuild bundles server to `dist/index.js`
3. **Database**: Drizzle migrations handle schema deployment
4. **Static Assets**: Support for 3D models, audio files, and fonts

### Environment Configuration
- **DATABASE_URL**: Required for PostgreSQL connection
- **NODE_ENV**: Determines development vs production behavior
- **Asset Handling**: Large 3D models and audio files properly configured

The application is designed to be deployed on platforms supporting Node.js with PostgreSQL databases, with particular optimization for Neon Database serverless PostgreSQL.

### Performance Considerations
- **3D Assets**: Efficient loading of GLTF/GLB models
- **Audio**: Preloaded sound effects with mute functionality
- **Bundle Splitting**: Optimized chunks for better loading performance
- **Database**: Serverless-optimized queries with connection pooling

The game emphasizes educational value while maintaining high entertainment quality through polished UI, smooth animations, and culturally relevant content that resonates with Brazilian users.