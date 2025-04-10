# Recorded demonstration: https://www.youtube.com/watch?v=eKocL9oxPrc

# Flowers & Saints Design Implementation

This project implements a "Flowers & Saints" design theme for a Next.js application, integrating modern UI design with existing user authentication features.

## Features

- Responsive design optimized for all device sizes
- Light/dark mode with theme support
- Animated components using Framer Motion
- Modern UI with Tailwind CSS
- Preserved user authentication functionality

## Project Structure

The implementation follows a component-based architecture:

- `src/app/page.js` - Main landing page
- `src/app/components/flowers/` - Contains all design components:
  - `Header.js` - Navigation header with mobile menu
  - `Hero.js` - Main hero section
  - `Services.js` - Services showcase
  - `Work.js` - Portfolio/work display with filtering
  - `Testimonials.js` - Client testimonials carousel
  - `Contact.js` - Contact form and information
  - `Footer.js` - Site footer with links and info

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Design Adaptations

The implementation adapts the "Flowers & Saints" design concept to create a floral design studio website with:

- Black and white color scheme with subtle accents
- Clean typography using the Inter font family
- Subtle animations for enhanced user experience
- Responsive grid layouts for all screen sizes

## Authentication Integration

The existing authentication functionality from the original application has been preserved and integrated into the new design:

- Login/Logout functionality in the Header component
- Protected routes maintained
- User session state preserved

## Technologies Used

- Next.js 14
- React
- Tailwind CSS
- Framer Motion
- next-themes
- NextAuth.js

## Customization

To customize the design further:

1. Modify Tailwind theme in `tailwind.config.js`
2. Update component styling in individual component files
3. Change images in the `public` directory
4. Modify content in component files
