# Email Notification Setup

This guide will help you set up email notifications for contact form submissions.

## Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your API Key

1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Portfolio Contact Form")
4. Copy the API key (you'll only see it once!)

## Step 3: Domain Verification (Optional - NOT Required!)

**Good News:** You can use Resend WITHOUT any DNS changes! 

The code is already configured to use `onboarding@resend.dev` as the sender, which works immediately without domain verification. This is perfect for:
- ✅ Testing
- ✅ Production (if you don't mind using Resend's default sender)
- ✅ Free domains that don't support custom DNS

**When to verify your domain:**
- Only if you want to send from your own email address (e.g., `noreply@yourdomain.com`)
- This requires DNS access and adding SPF/DKIM records
- Not necessary for receiving contact form submissions!

**Current Setup (No DNS Required):**
- Sender: `onboarding@resend.dev` (works immediately)
- Recipient: Your email (set in `CONTACT_NOTIFICATION_EMAIL`)

## Step 4: Add Environment Variables

Add these to your `.env.local` file:

```env
# Resend API Key (required)
RESEND_API_KEY=re_b3uZbWuX_JRjpGYBBn7ZZhC8Lk5dXqacr

# Email to receive notifications (defaults to diarhyseni4@gmail.com if not set)
CONTACT_NOTIFICATION_EMAIL=diarhyseni4@gmail.com

# From email address (optional, defaults to onboarding@resend.dev)
# For production, use a verified domain email like: noreply@yourdomain.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

## Step 5: Test

1. Submit a contact form on your website
2. Check your email inbox for the notification
3. Check the console logs for any errors

## Troubleshooting

- **Email not sending?** 
  - Check that `RESEND_API_KEY` is set correctly in `.env.local`
  - Make sure you've restarted your dev server after adding the API key
  - Check the terminal/console for error messages
  
- **Not receiving emails?** 
  - Check spam/junk folder (emails from `onboarding@resend.dev` might go there initially)
  - Verify `CONTACT_NOTIFICATION_EMAIL` is set to your correct email address
  - Check Resend dashboard for email logs: https://resend.com/emails
  
- **Using free domain?** 
  - No problem! The default `onboarding@resend.dev` sender works perfectly
  - No DNS changes needed
  - You'll receive emails at the address set in `CONTACT_NOTIFICATION_EMAIL`

## Free Tier Limits

Resend's free tier includes:
- 3,000 emails/month
- 100 emails/day
- Perfect for portfolio contact forms!

