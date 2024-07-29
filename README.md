### tl;dr

```bash
git clone https://github.com/dq-alhq/rilt-blog.git rilt
cd rilt
composer install
cp .env.example .env
php artisan key:generate
bun i && bun run build
php artisan serve
```

> Make sure you have at least `PHP 8.2` and `Nodejs 18`

### Laravel w/ Inertia React Typescript

By default, if we use package like Laravel breeze, it'll use regular javascript react by default. But this project is
for you who want to use inertia.js with typescript boilerplate.

This project has come with some features like:

- Authentication
- User Profile
- User Password
- User Delete
- Admin Dashboard
- Article Creation
- Project Creation

### About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and
creative experience to be truly fulfilling.

### About Inertia.js

Inertia.js lets you quickly build modern single-page React, Vue and Svelte apps using classic server-side routing and
controllers.

### About Typescript

Typescript is a strict syntactical superset of JavaScript and adds optional static typing to the language.

### Available scripts

Feel free to use someting like [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/). It just node package manager I
have, so make yours.

```bash
# Format with prettier
bun run format

# Start development
bun run dev

# Build the app
bun run build

# Testing for SSR
bun run preview
```

### Update profile information

Of course it is not just about authentication, but also about updating user profile information, password, and deleting
account.

### Dashboard Layout

This project has 3 layout:

1. Guest Layout
2. App Layout (Default)
3. User Layout

User layout will make a layout side by side, it has a sidebar. So this is will be useful when you need an admin panel or
something like that.

If you like making new features, feel free to make a [pull request](https://github.com/dq-alhq/rilt-blog/pulls). I'll
be happy to review it.

### Thanks to

- [Laravel](https://github.com/laravel/framework)
- [Inertia](https://github.com/inertiajs/inertia) with [React](https://github.com/facebook/react)
  and [Typescript](https://github.com/microsoft/TypeScript)
- [Vite](https://vitejs.dev/) with [Vite plugin](https://github.com/laravel/vite-plugin) and friends
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) and friends
- [parsinta.com](https://parsinta.com/)
- [irsyad.co](https://irsyad.co/)
- My Beloved Mentor [Irsyad A. Pandjaitan](https://github.com/irsyadadl)
