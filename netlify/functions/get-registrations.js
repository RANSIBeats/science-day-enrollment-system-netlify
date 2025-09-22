const { createClient } = require('@supabase/supabase-js')

const handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get user from Netlify Identity
    const user = context.clientContext?.user
    
    if (!user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    let query = supabase
      .from('registrations')
      .select(`
        *,
        student (
          first_name,
          last_name,
          email,
          project_title,
          category,
          school (
            name
          )
        )
      `)
      .order('created_at', { ascending: false });

    // Filter by user role
    const roles = user.app_metadata?.roles || [];
    if (roles.includes('school_official')) {
      // School officials can only see registrations from their school
      // This would require storing the school_id in user metadata
      // For now, we'll return all registrations
    } else if (!roles.includes('admin')) {
      // Regular users can only see their own registrations
      query = query.eq('student.email', user.email);
    }

    const { data: registrations, error } = await query;

    if (error) {
      console.error('Error fetching registrations:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to fetch registrations' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(registrations || [])
    };

  } catch (error) {
    console.error('Error fetching registrations:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

module.exports = { handler };
