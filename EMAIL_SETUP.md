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

## Step 3: Verify Your Domain (Optional but Recommended)

For production, you should verify your domain:
1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain
3. Follow the DNS verification steps

For testing, you can use the default `onboarding@resend.dev` sender.

## Step 4: Add Environment Variables

Add these to your `.env.local` file:

```env
# Resend API Key (required)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

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

- **Email not sending?** Check that `RESEND_API_KEY` is set correctly
- **Using default sender?** Make sure `RESEND_FROM_EMAIL` is set to a verified email
- **Not receiving emails?** Check spam folder and verify `CONTACT_NOTIFICATION_EMAIL` is correct

## Free Tier Limits

Resend's free tier includes:
- 3,000 emails/month
- 100 emails/day
- Perfect for portfolio contact forms!

