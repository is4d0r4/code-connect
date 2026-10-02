# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**code-connect** is a pnpm monorepo workspace containing a full-stack application:
- **Frontend (web):** React 19 + Vite with Oxlint linting
- **Backend (api):** NestJS with TypeScript, Vitest for testing, and Oxlint with type-aware rules

The workspace is configured in [pnpm-workspace.yaml](pnpm-workspace.yaml) with individual apps in the `apps/` directory.

## Build, Dev & Test Commands

### Running the Full Stack

```bash
# Start both frontend and backend in parallel (with HMR)
pnpm dev

# Build both apps
pnpm build

# Run all tests
pnpm test
```

### Frontend (React + Vite)

Located in `apps/web/`, runs on port 5173 by default.

```bash
# Development server with HMR
pnpm web:dev

# Production build
pnpm web:build

# Preview production build locally
pnpm web:preview

# Lint with Oxlint
pnpm web:lint
```

### Backend (NestJS)

Located in `apps/api/`, runs on port 3000 by default.

```bash
# Development mode (watch mode)
pnpm api:dev

# Production build
pnpm api:build

# Run production server
pnpm api:start

# Unit tests (Vitest)
pnpm api:test

# Run single test file
pnpm --filter api test src/app.controller.spec.ts

# Watch mode
pnpm --filter api test:watch

# Test coverage
pnpm --filter api test:cov

# E2E tests
pnpm api:test:e2e

# Debug tests
pnpm --filter api test:debug

# Lint (type-aware)
pnpm --filter api lint

# Format code with Prettier
pnpm --filter api format
```

## Project Structure

```
code-connect/
├── pnpm-workspace.yaml         # Workspace config
├── package.json                # Root package with workspace scripts
├── .gitignore                  # Global git ignore
├── CLAUDE.md                   # This file - Claude Code guidance
├── apps/
│   ├── web/                    # React + Vite frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── atoms/      # Basic UI elements (Button, Input, etc.)
│   │   │   │   ├── molecules/  # Combinations of atoms
│   │   │   │   ├── organisms/  # Complex components
│   │   │   │   ├── templates/  # Page layouts
│   │   │   │   └── pages/      # Full pages
│   │   │   ├── styles/         # Global styles, Tailwind config
│   │   │   ├── main.jsx        # Vite entry point
│   │   │   ├── App.jsx         # Root component
│   │   │   ├── index.css       # Tailwind directives
│   │   │   └── App.css         # App styles
│   │   ├── vite.config.js      # Vite configuration
│   │   ├── tailwind.config.js  # Tailwind configuration
│   │   ├── postcss.config.js   # PostCSS for Tailwind
│   │   ├── oxlint.json         # Oxlint rules
│   │   ├── vitest.config.js    # Test configuration
│   │   ├── .gitignore          # Web-specific git ignore
│   │   └── package.json        # Web dependencies
│   │
│   └── api/                    # NestJS backend
│       ├── src/
│       │   ├── [feature]/      # Feature modules (users, posts, etc.)
│       │   │   ├── dto/        # Data Transfer Objects
│       │   │   ├── [feature].controller.ts
│       │   │   ├── [feature].controller.spec.ts
│       │   │   ├── [feature].service.ts
│       │   │   ├── [feature].service.spec.ts
│       │   │   └── [feature].module.ts
│       │   ├── app.module.ts   # Root module
│       │   ├── app.controller.ts
│       │   ├── app.service.ts
│       │   └── main.ts         # NestJS bootstrap
│       ├── test/               # E2E tests
│       ├── vitest.config.ts    # Unit test config
│       ├── vitest.config.e2e.ts # E2E test config
│       ├── tsconfig.json       # TypeScript config
│       ├── .prettierrc.json    # Prettier config
│       ├── oxlint.json         # Oxlint rules (type-aware)
│       ├── .gitignore          # API-specific git ignore
│       └── package.json        # API dependencies
```

## Architecture & Key Design Points

### Workspace Structure
- **pnpm workspaces** define the monorepo with `apps/*` packages
- Each app is independently installable and has its own `package.json`
- Root `package.json` contains aggregated scripts that filter to specific packages (`pnpm --filter web` or `pnpm --filter api`)

### Frontend (apps/web)
- Standard Vite React setup with HMR enabled
- Entry point: `src/main.jsx` renders the App component to `#root`
- Oxlint provides linting without TypeScript (template uses JSX, not TSX by default)
- No build-time environment variables configured; add to `vite.config.js` if needed
- **Atomic Design Pattern**: Components organized in 5 levels:
  - `atoms/`: Smallest, reusable components (Button, Input, Label, etc.)
  - `molecules/`: Combination of atoms (FormField, SearchBox, etc.)
  - `organisms/`: Complex components (Header, Sidebar, etc.)
  - `templates/`: Page layouts
  - `pages/`: Full pages
- **Styling**: Tailwind CSS for utility-first styling (setup required)
- **Component Testing**: Every component requires a test covering essential usage

### Backend (apps/api)
- NestJS modules pattern: `app.module.ts` orchestrates imports
- Controllers handle HTTP endpoints; `app.controller.ts` is the main entry point
- Services contain business logic; `app.service.ts` is an example
- **Testing**: Vitest for unit tests (`.spec.ts`) and E2E tests (`test/` folder with separate config)
- **Type safety**: oxlint runs with `--type-aware` for strict type checking
- **Code style**: Prettier formats TypeScript; configured in `.prettierrc.json`
- Reflect-metadata is imported in `main.ts` (required for NestJS decorators)
- RxJS is a direct dependency (used internally by NestJS)
- **REST Compliance**: All endpoints must follow REST principles:
  - **Resources**: Represent entities (users, posts, etc.) with noun-based URIs (`/users`, `/posts`)
  - **HTTP Methods**: Use correct verbs
    - `GET /resource` - Retrieve all resources
    - `GET /resource/:id` - Retrieve a specific resource
    - `POST /resource` - Create a new resource (201 Created response)
    - `PUT /resource/:id` - Replace entire resource
    - `PATCH /resource/:id` - Partial update
    - `DELETE /resource/:id` - Delete a resource (204 No Content)
  - **Status Codes**: Return appropriate HTTP status
    - `200 OK` - Success (GET, PUT, PATCH)
    - `201 Created` - Resource created (POST)
    - `204 No Content` - Success with no response body (DELETE, some PATCH)
    - `400 Bad Request` - Invalid input
    - `404 Not Found` - Resource doesn't exist
    - `500 Internal Server Error` - Server error
  - **Stateless**: Each request contains all info needed; no client-server state
  - **Consistent Response Format**: Use DTO (Data Transfer Objects) for structured responses
  - **Pagination**: Use query params for large collections (`?page=1&limit=10`)

### Linting Strategy
- **Frontend**: Oxlint (JSX/JS)
- **Backend**: Oxlint with `--type-aware` (TypeScript), stricter rules for server-side code
- Both use Oxlint's modern, fast Rust-based linter (replaces ESLint)

## Git & Commit Guidelines

### Conventional Commits

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, semicolons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding tests or updating existing tests
- `chore`: Changes to build system, dependencies, or tools
- `ci`: Changes to CI/CD configuration

**Scope (optional):** Indicates which part of the codebase:
- Frontend: `web`, `web(atoms)`, `web(organisms)`, etc.
- Backend: `api`, `api(users)`, `api(auth)`, etc.
- Root: `workspace`, `config`, etc.

**Examples:**

```bash
# New feature
git commit -m "feat(web): add dark mode toggle button"

# Bug fix
git commit -m "fix(api): handle null values in user service"

# Documentation
git commit -m "docs: update API endpoint documentation"

# Refactor
git commit -m "refactor(web): simplify Button component logic"

# Test
git commit -m "test(api): add tests for user controller"

# With body for more context
git commit -m "feat(api): implement pagination for posts endpoint

- Add offset and limit query parameters
- Return total count in response
- Add E2E tests for pagination"
```

**Benefits:**
- Automatic changelog generation
- Clear commit history
- Easier code review and blame tracking
- Better integration with CI/CD pipelines

## Common Development Workflows

### Adding a new NestJS endpoint (REST-compliant)

1. **Create a DTO (Data Transfer Object)** for request/response validation:
   ```typescript
   // apps/api/src/users/dto/create-user.dto.ts
   export class CreateUserDto {
     email: string;
     name: string;
     age?: number;
   }
   
   export class UserDto {
     id: string;
     email: string;
     name: string;
     createdAt: Date;
   }
   ```

2. **Create a service** for business logic:
   ```typescript
   // apps/api/src/users/users.service.ts
   import { Injectable } from '@nestjs/common';
   import { CreateUserDto } from './dto/create-user.dto';
   
   @Injectable()
   export class UsersService {
     private users = [];
     private idCounter = 1;
     
     create(dto: CreateUserDto) {
       const user = { id: String(this.idCounter++), ...dto, createdAt: new Date() };
       this.users.push(user);
       return user;
     }
     
     findAll() {
       return this.users;
     }
     
     findById(id: string) {
       return this.users.find(u => u.id === id);
     }
     
     update(id: string, dto: Partial<CreateUserDto>) {
       const user = this.findById(id);
       if (!user) return null;
       Object.assign(user, dto);
       return user;
     }
     
     delete(id: string) {
       const index = this.users.findIndex(u => u.id === id);
       if (index === -1) return false;
       this.users.splice(index, 1);
       return true;
     }
   }
   ```

3. **Create a controller** with REST-compliant routes:
   ```typescript
   // apps/api/src/users/users.controller.ts
   import {
     Controller,
     Get,
     Post,
     Patch,
     Delete,
     Param,
     Body,
     HttpCode,
     NotFoundException,
     BadRequestException,
   } from '@nestjs/common';
   import { UsersService } from './users.service';
   import { CreateUserDto, UserDto } from './dto/create-user.dto';
   
   @Controller('users')
   export class UsersController {
     constructor(private usersService: UsersService) {}
     
     // GET /users - Retrieve all users
     @Get()
     findAll(): UserDto[] {
       return this.usersService.findAll();
     }
     
     // POST /users - Create new user (201 Created)
     @Post()
     @HttpCode(201)
     create(@Body() dto: CreateUserDto): UserDto {
       if (!dto.email || !dto.name) {
         throw new BadRequestException('Email and name are required');
       }
       return this.usersService.create(dto);
     }
     
     // GET /users/:id - Retrieve specific user
     @Get(':id')
     findOne(@Param('id') id: string): UserDto {
       const user = this.usersService.findById(id);
       if (!user) {
         throw new NotFoundException(`User with id ${id} not found`);
       }
       return user;
     }
     
     // PATCH /users/:id - Partial update
     @Patch(':id')
     update(@Param('id') id: string, @Body() dto: Partial<CreateUserDto>): UserDto {
       const user = this.usersService.update(id, dto);
       if (!user) {
         throw new NotFoundException(`User with id ${id} not found`);
       }
       return user;
     }
     
     // DELETE /users/:id - Delete user (204 No Content)
     @Delete(':id')
     @HttpCode(204)
     delete(@Param('id') id: string): void {
       const deleted = this.usersService.delete(id);
       if (!deleted) {
         throw new NotFoundException(`User with id ${id} not found`);
       }
     }
   }
   ```

4. **Write comprehensive tests:**
   ```typescript
   // apps/api/src/users/users.controller.spec.ts
   import { Test, TestingModule } from '@nestjs/testing';
   import { NotFoundException, BadRequestException } from '@nestjs/common';
   import { UsersController } from './users.controller';
   import { UsersService } from './users.service';
   
   describe('UsersController', () => {
     let controller: UsersController;
     let service: UsersService;
     
     beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
         controllers: [UsersController],
         providers: [UsersService],
       }).compile();
       
       controller = module.get<UsersController>(UsersController);
       service = module.get<UsersService>(UsersService);
     });
     
     describe('POST /users', () => {
       it('should create a user with 201 status', () => {
         const dto = { email: 'test@example.com', name: 'John' };
         const result = controller.create(dto);
         expect(result.id).toBeDefined();
         expect(result.email).toBe(dto.email);
       });
       
       it('should throw BadRequestException if email missing', () => {
         expect(() => controller.create({ name: 'John' })).toThrow(BadRequestException);
       });
     });
     
     describe('GET /users', () => {
       it('should return all users', () => {
         controller.create({ email: 'test1@example.com', name: 'User 1' });
         controller.create({ email: 'test2@example.com', name: 'User 2' });
         const users = controller.findAll();
         expect(users).toHaveLength(2);
       });
     });
     
     describe('GET /users/:id', () => {
       it('should return a user by id', () => {
         const created = controller.create({ email: 'test@example.com', name: 'John' });
         const user = controller.findOne(created.id);
         expect(user.id).toBe(created.id);
       });
       
       it('should throw NotFoundException if user not found', () => {
         expect(() => controller.findOne('invalid-id')).toThrow(NotFoundException);
       });
     });
     
     describe('PATCH /users/:id', () => {
       it('should update a user partially', () => {
         const created = controller.create({ email: 'test@example.com', name: 'John' });
         const updated = controller.update(created.id, { name: 'Jane' });
         expect(updated.name).toBe('Jane');
         expect(updated.email).toBe('test@example.com');
       });
     });
     
     describe('DELETE /users/:id', () => {
       it('should delete a user', () => {
         const created = controller.create({ email: 'test@example.com', name: 'John' });
         controller.delete(created.id);
         expect(() => controller.findOne(created.id)).toThrow(NotFoundException);
       });
     });
   });
   ```

5. **REST compliance checklist:**
   - ✓ Use correct HTTP methods (GET, POST, PATCH, DELETE)
   - ✓ Return appropriate status codes (201 for creation, 204 for deletion)
   - ✓ Use DTOs for request/response structure
   - ✓ Throw proper HTTP exceptions (NotFoundException, BadRequestException)
   - ✓ Keep endpoints stateless
   - ✓ Use noun-based URIs for resources

### Adding a new React component (Atomic Design)

1. **Determine the component level:**
   - **Atom**: Single, reusable UI element (Button, Input, Badge)
   - **Molecule**: Combination of atoms (FormField, SearchBox)
   - **Organism**: Complex component (Header, UserCard)
   - **Template**: Page layout structure
   - **Page**: Full page component

2. **Create the component file:**
   ```jsx
   // apps/web/src/components/atoms/Button.jsx
   export function Button({ children, variant = 'primary', ...props }) {
     const baseStyles = 'px-4 py-2 rounded font-semibold transition-colors';
     const variants = {
       primary: 'bg-blue-600 text-white hover:bg-blue-700',
       secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
     };
     
     return (
       <button className={`${baseStyles} ${variants[variant]}`} {...props}>
         {children}
       </button>
     );
   }
   ```

3. **Create a corresponding test file:**
   ```jsx
   // apps/web/src/components/atoms/Button.test.jsx
   import { render, screen } from '@testing-library/react';
   import { Button } from './Button';
   
   describe('Button', () => {
     it('renders with default text', () => {
       render(<Button>Click me</Button>);
       expect(screen.getByText('Click me')).toBeInTheDocument();
     });
     
     it('applies primary variant styles', () => {
       render(<Button variant="primary">Submit</Button>);
       const button = screen.getByText('Submit');
       expect(button).toHaveClass('bg-blue-600');
     });
     
     it('handles click events', () => {
       const handleClick = vi.fn();
       render(<Button onClick={handleClick}>Click</Button>);
       screen.getByText('Click').click();
       expect(handleClick).toHaveBeenCalled();
     });
   });
   ```

4. **Component requirements:**
   - Every component MUST have a test covering essential usage
   - Use Tailwind CSS classes for styling (no inline styles unless necessary)
   - Export component as named export
   - Add JSDoc comments for prop documentation

5. **Run tests before committing:**
   ```bash
   pnpm web:test
   pnpm web:lint
   ```

6. **Use the component:**
   ```jsx
   import { Button } from './components/atoms/Button';
   
   export function App() {
     return <Button variant="secondary">Cancel</Button>;
   }
   ```

### Debugging
- Frontend: Use browser DevTools (Vite provides source maps in dev)
- Backend: `pnpm --filter api test:debug` opens Node inspector, connect via `chrome://inspect`

### Running both apps together
```bash
# Terminal 1: Frontend
pnpm web:dev

# Terminal 2: Backend
pnpm api:dev

# Or in one terminal:
pnpm dev  # Runs both in parallel with --parallel flag
```

## Dependencies & Versioning

- **React**: ^19.2.8 (latest major version, modern features)
- **NestJS**: ^12.0.1 (latest major)
- **TypeScript**: ^6.0.2 (latest major)
- **Vitest**: ^4.1.2 (modern alternative to Jest, much faster)
- **Vite**: ^8.3.0 (frontend build tool with HMR)
- **Oxlint**: Recent versions (1.58+ for API with tsgolint, 1.81+ for web)

All packages use caret ranges (`^`) to allow patch/minor updates.

## Frontend Setup: Tailwind CSS

### Installation & Configuration

1. **Install Tailwind CSS dependencies** (if not already installed):
   ```bash
   cd apps/web
   pnpm add -D tailwindcss postcss autoprefixer
   pnpm exec tailwindcss init -p
   ```

2. **Configure `tailwind.config.js`:**
   ```js
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,jsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

3. **Add Tailwind directives to `src/index.css`:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### Using Tailwind in Components

- Use utility classes directly in JSX: `className="px-4 py-2 bg-blue-600 text-white rounded"`
- Create component variants using conditional classes
- Avoid inline styles; use Tailwind classes exclusively
- Use the `clsx` or `classnames` library for complex conditional classes:
  ```jsx
  import clsx from 'clsx';
  
  export function Button({ variant = 'primary', disabled, ...props }) {
    return (
      <button
        className={clsx(
          'px-4 py-2 rounded font-semibold transition-colors',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
            'opacity-50 cursor-not-allowed': disabled,
          }
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
  ```

## Testing Strategy

### Frontend (React)
- Use **Vitest** + **React Testing Library**
- Test behavior, not implementation
- Every component must have at least one test covering essential usage
- Run tests before each commit: `pnpm web:test`

### Backend (NestJS)
- Use **Vitest** for unit tests
- Test services, controllers, and business logic
- Provide mocked dependencies using NestJS's `Test.createTestingModule()`
- Cover happy path and error cases
- Run tests before each commit: `pnpm api:test`

## Notes for Future Contributors

- This is a fresh setup; core modules are minimal but extensible
- **Frontend**: Atomic Design structure ensures component reusability and consistency
- **Frontend**: Tailwind CSS provides utility-first styling with no need for custom CSS files
- **Frontend**: All components require corresponding tests
- **Backend**: REST compliance is mandatory for all endpoints
- **Backend**: Use DTOs for strict type validation on requests/responses
- **Git**: All commits must follow Conventional Commits format for clean history
- NestJS is configured for Express (default); can be swapped to Fastify for performance
- No database configured; add ORM/database package to `apps/api` when needed
- Tests use Vitest (not Jest) for faster feedback loops
