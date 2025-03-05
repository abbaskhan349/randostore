# RandoStore

RandoStore is a full-stack e-commerce application that allows users to browse items, add items to a cart, and manage their shopping experience.

## Features

- **Browse Items**: View all available items in the store
- **Shopping Cart**: Add items to cart with persistent storage using localStorage
- **Cart Management**: Update quantities, remove items, and clear cart
- **Add New Items**: Upload new products with images to the store
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Frontend**:
  - Next.js 14 (App Router)
  - React
  - TypeScript
  - Tailwind CSS
  - Lucide React (for icons)

- **Backend**:
  - Node.js REST API (provided)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/randostore.git
   cd randostore

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install

3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the following variables and replace placeholders with your actual values:

     ```env
     NEXT_PUBLIC_API_BASE_URL=http://localhost:3001 # Replace with your backend API URL
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
