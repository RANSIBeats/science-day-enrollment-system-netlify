# Netlify Deployment Guide

This guide will help you deploy the Science Day Enrollment System to Netlify.

## 🚀 Quick Deployment

### 1. Connect to GitHub

1. Go to [Netlify](https://netlify.com) and sign up/log in
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and authorize Netlify
4. Select the repository: `science-day-enrollment-system-netlify`

### 2. Configure Build Settings

Netlify will automatically detect the settings, but verify:

```yaml
Build command: npm run build
Publish directory: out
Node version: 18
```

### 3. Deploy

Click "Deploy site" - Netlify will build and deploy your application automatically!

## ⚙️ Environment Variables

This version works with mock data, so no environment variables are required for basic functionality. However, if you want to connect to a real database in the future, you can add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 🎯 What You Get

### Student Registration Form
- Complete form with validation
- Real-time feedback
- Responsive design
- Mock submission with success/error states

### Admin Dashboard
- Registration management
- Status tracking (Pending, Approved, Rejected)
- Statistics overview
- Role-based access (simulated)

### Features
- ✅ Fully functional on Netlify
- ✅ No backend required
- ✅ Works entirely client-side
- ✅ Mobile responsive
- ✅ Modern UI with Tailwind CSS
- ✅ TypeScript for type safety

## 🌐 Access Your Site

After deployment, your site will be available at:
- `https://your-random-name.netlify.app`

You can:
1. **Custom Domain**: Add your own domain in Netlify settings
2. **Custom Forms**: Connect to real backend services
3. **Analytics**: Enable Netlify analytics
4. **A/B Testing**: Use Netlify split testing

## 🔧 Customization

### Change Colors/Styles
Edit `src/app/globals.css` and modify the CSS variables.

### Add New Features
- Pages: Add new files in `src/app/`
- Components: Create in `src/components/ui/`
- Styles: Use Tailwind CSS classes

### Connect to Real Database
1. Set up Supabase or similar service
2. Add environment variables in Netlify
3. Update the form submission logic to call real APIs

## 📱 Mobile Optimization

The site is fully responsive and works on:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile phones

## 🚀 Performance

- ⚡ Fast loading with Next.js static export
- 📦 Optimized assets
- 🌐 CDN delivery via Netlify
- 🔄 Automatic HTTPS

## 🐛 Troubleshooting

### Build Fails
- Make sure you're using Node.js 18+
- Run `npm run build` locally to test
- Check Netlify build logs for errors

### White Screen
- Check browser console for errors
- Verify all files are properly committed
- Ensure `next.config.js` has correct export settings

### Form Not Working
- The form uses mock data - submissions are simulated
- Check browser console for form submission logs
- All form validation works client-side

## 📞 Support

If you encounter issues:
1. Check Netlify build logs
2. Review browser console errors
3. Ensure all dependencies are properly installed
4. Verify the repository is correctly connected

---

**Your Science Day Enrollment System is now live on Netlify!** 🎉
