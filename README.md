# Science Day Enrollment System - Netlify Edition

A modern, responsive student enrollment system for Science Day events, built with Next.js and optimized for Netlify deployment.

## 🚀 Features

### Student Registration
- **Responsive Form**: Mobile-friendly registration form
- **Real-time Validation**: Instant feedback on form inputs
- **Project Categories**: Support for various science categories
- **School Selection**: Dynamic school dropdown
- **Grade Level Tracking**: Support for grades 9-12

### Dashboard & Management
- **Role-based Access**: Admin, School Official, and Student roles
- **Registration Management**: Approve/reject student registrations
- **Real-time Updates**: Live status updates for registrations
- **Search & Filter**: Find registrations quickly

### Technical Features
- **Netlify Optimized**: Built specifically for Netlify deployment
- **Serverless Functions**: API endpoints as Netlify functions
- **Static Export**: Fast loading with Next.js static export
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, professional interface with Tailwind CSS

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Backend**: Netlify Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Netlify Identity
- **Deployment**: Netlify

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Netlify account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/science-day-enrollment-system-netlify.git
   cd science-day-enrollment-system-netlify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup

1. **Create a Supabase project**
   - Go to [Supabase](https://supabase.com) and create a new project
   - Copy your project URL and service role key

2. **Set up database tables**
   Run the following SQL in your Supabase SQL editor:

   ```sql
   -- Schools table
   CREATE TABLE schools (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     address TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Students table
   CREATE TABLE students (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     email TEXT NOT NULL UNIQUE,
     phone TEXT NOT NULL,
     school_id UUID REFERENCES schools(id),
     grade INTEGER NOT NULL,
     project_title TEXT NOT NULL,
     project_description TEXT NOT NULL,
     category TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Registrations table
   CREATE TABLE registrations (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     student_id UUID REFERENCES students(id),
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Insert sample schools
   INSERT INTO schools (name, address) VALUES
     ('Lincoln High School', '123 Main St, Lincoln, NE'),
     ('Washington Academy', '456 Oak Ave, Washington, DC'),
     ('Roosevelt Institute', '789 Pine Rd, Roosevelt, NY'),
     ('Jefferson Preparatory', '321 Elm St, Jefferson, MO'),
     ('Madison Science Magnet', '654 Maple Dr, Madison, WI');

   -- Create indexes for better performance
   CREATE INDEX idx_students_email ON students(email);
   CREATE INDEX idx_students_school_id ON students(school_id);
   CREATE INDEX idx_registrations_student_id ON registrations(student_id);
   CREATE INDEX idx_registrations_status ON registrations(status);
   ```

## 🚀 Deployment

### Netlify Deployment

1. **Connect to GitHub**
   - Go to your Netlify dashboard
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure build settings**
   ```yaml
   Build command: npm run build
   Publish directory: out
   Node version: 18
   ```

3. **Set environment variables**
   In your Netlify site settings, add the environment variables from `.env.example`

4. **Deploy**
   - Netlify will automatically build and deploy your site
   - Your site will be available at a random Netlify URL

### Custom Domain

1. **Configure domain**
   - In Netlify site settings, go to "Domain management"
   - Add your custom domain
   - Follow the DNS instructions provided by Netlify

2. **SSL Certificate**
   - Netlify automatically provisions SSL certificates for custom domains

## 🎯 API Endpoints

### Serverless Functions

All API endpoints are deployed as Netlify serverless functions:

#### POST `/.netlify/functions/submit-registration`
Submit a new student registration

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "school": "school-id",
  "grade": "10",
  "projectTitle": "Solar Panel Efficiency",
  "projectDescription": "A study on solar panel efficiency in different weather conditions",
  "category": "engineering"
}
```

**Response:**
```json
{
  "message": "Registration submitted successfully",
  "registrationId": "uuid",
  "studentId": "uuid"
}
```

#### GET `/.netlify/functions/get-schools`
Get all available schools

**Response:**
```json
[
  {
    "id": "school-id",
    "name": "Lincoln High School",
    "address": "123 Main St, Lincoln, NE"
  }
]
```

#### GET `/.netlify/functions/get-registrations`
Get registrations (requires authentication)

**Response:**
```json
[
  {
    "id": "registration-id",
    "status": "pending",
    "created_at": "2024-01-15T10:00:00Z",
    "student": {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "project_title": "Solar Panel Efficiency",
      "category": "engineering",
      "school": {
        "name": "Lincoln High School"
      }
    }
  }
]
```

#### PUT `/.netlify/functions/update-registration`
Update registration status (requires authentication)

**Request Body:**
```json
{
  "registrationId": "registration-id",
  "status": "approved"
}
```

**Response:**
```json
{
  "message": "Registration updated successfully",
  "registration": {
    "id": "registration-id",
    "status": "approved"
  }
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `EMAIL_FROM` | Sender email for notifications | No |
| `EMAIL_HOST` | SMTP server host | No |
| `EMAIL_PORT` | SMTP server port | No |
| `EMAIL_USER` | SMTP username | No |
| `EMAIL_PASS` | SMTP password | No |

### User Roles

- **Admin**: Full access to all registrations and schools
- **School Official**: Access to registrations from their school
- **Student**: Access to their own registrations

## 🎨 Customization

### Styling

The project uses Tailwind CSS with a custom design system. You can customize colors and styles in:

- `src/app/globals.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration
- `src/components/ui/` - Reusable UI components

### Adding New Features

1. **New API Endpoints**: Add new serverless functions in `netlify/functions/`
2. **New Pages**: Create new pages in `src/app/`
3. **New Components**: Add reusable components in `src/components/`
4. **Database Changes**: Update your Supabase schema and update TypeScript types

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Netlify](https://netlify.com/) - Hosting platform
- [Supabase](https://supabase.com/) - Backend as a service
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library

## 📞 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the [Netlify documentation](https://docs.netlify.com/)
- Review the [Supabase documentation](https://supabase.com/docs)

---

Built with ❤️ for Science Day events
