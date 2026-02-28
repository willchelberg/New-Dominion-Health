/**
 * SETUP INSTRUCTIONS FOR CREATING YOUR FIRST ADMIN USER
 * 
 * Since we're using Supabase Authentication, you need to create your admin account
 * through the Supabase Dashboard. Here's how:
 * 
 * METHOD 1: Using Supabase Dashboard (Recommended)
 * -----------------------------------------------
 * 1. Go to your Supabase project dashboard: https://supabase.com/dashboard
 * 2. Click on "Authentication" in the left sidebar
 * 3. Click on "Users" tab
 * 4. Click "Add user" button (top right)
 * 5. Choose "Create new user"
 * 6. Enter your email and password
 * 7. Check "Auto Confirm User" (important - since email isn't configured)
 * 8. Click "Create user"
 * 
 * Now you can log in with that email/password at your site's login page!
 * 
 * 
 * METHOD 2: Using SQL Editor (Alternative)
 * ----------------------------------------
 * 1. Go to your Supabase project dashboard
 * 2. Click "SQL Editor" in the left sidebar
 * 3. Click "New query"
 * 4. Paste this SQL (replace with your email/password):
 * 
 * SELECT extensions.create_user(
 *   'your-email@example.com',
 *   'your-secure-password'
 * );
 * 
 * 5. Click "Run"
 * 
 * 
 * IMPORTANT SECURITY NOTES:
 * ------------------------
 * - Use a strong, unique password
 * - Never share your admin credentials
 * - Consider enabling 2FA in Supabase dashboard for extra security
 * - You can create multiple admin users if needed
 * 
 * 
 * TROUBLESHOOTING:
 * ---------------
 * If you can't log in after creating a user:
 * - Make sure "Auto Confirm User" was checked
 * - Verify the email/password are correct
 * - Check that your Supabase project is running (not paused)
 * - Look at the browser console for error messages
 */

export const ADMIN_SETUP_INSTRUCTIONS = `
To create your first admin account:

1. Visit: https://supabase.com/dashboard
2. Select your project
3. Go to Authentication > Users
4. Click "Add user"
5. Enter your email/password
6. Check "Auto Confirm User"
7. Click "Create user"

Then you can log in at your website!
`;
