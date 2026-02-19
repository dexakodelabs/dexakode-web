
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://isepaobrhjnqcdnyhfgo.supabase.co';
// Note: In production, these should be environment variables.
// Using a placeholder for the anon key which is required for the Supabase JS client.
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzZXBhb2JyaGpucWNkbnloZmdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjA3MTEsImV4cCI6MjA4NzA5NjcxMX0.FodKhI1h90XxeJWkTSXeEe7wi25EW7ieEqRSDTw8CNw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface ContactSubmission {
  firstName: string;
  company: string;
  email: string;
  message: string;
}

export const submitContactForm = async (data: ContactSubmission) => {
  const errors: string[] = [];

  // 1. Send to Supabase (Database)
  try {
    const { error: dbError } = await supabase
      .from('submissions')
      .insert([
        { 
          first_name: data.firstName, 
          company: data.company, 
          email: data.email, 
          message: data.message,
          created_at: new Date().toISOString()
        }
      ]);
    
    if (dbError) {
      console.warn('Supabase Insert Warning:', dbError.message);
      // We don't throw here to allow the email to still send even if DB is misconfigured
    }
  } catch (e) {
    console.error('Database connection failed:', e);
  }

  // 2. Send to Formspree (Email Notification)
  try {
    const response = await fetch('https://formspree.io/f/mwvnnpgn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        _subject: `New Agency Inquiry from ${data.firstName} (${data.company})`
      })
    });

    if (!response.ok) {
      throw new Error('Email service returned an error');
    }
  } catch (e) {
    console.error('Email service failed:', e);
    errors.push('Notification delivery failed, but data was logged.');
  }

  return {
    success: errors.length === 0,
    errors
  };
};
