const { createClient } = require('@supabase/supabase-js')

const handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'PUT, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'PUT') {
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

    // Check if user has permission to update registrations
    const roles = user.app_metadata?.roles || [];
    if (!roles.includes('admin') && !roles.includes('school_official')) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'Insufficient permissions' })
      };
    }

    const { registrationId, status } = JSON.parse(event.body);

    if (!registrationId || !status) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid status' })
      };
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Update registration status
    const { data: registration, error } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', registrationId)
      .select()
      .single();

    if (error) {
      console.error('Error updating registration:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to update registration' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Registration updated successfully',
        registration
      })
    };

  } catch (error) {
    console.error('Error updating registration:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

module.exports = { handler };
