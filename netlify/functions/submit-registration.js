const { createClient } = require('@supabase/supabase-js')

const handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'school', 'grade', 'projectTitle', 'projectDescription', 'category'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Missing required field: ${field}` })
        };
      }
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Insert student data
    const { data: student, error: studentError } = await supabase
      .from('students')
      .insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          school_id: data.school,
          grade: parseInt(data.grade),
          project_title: data.projectTitle,
          project_description: data.projectDescription,
          category: data.category
        }
      ])
      .select()
      .single();

    if (studentError) {
      console.error('Error inserting student:', studentError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to save student data' })
      };
    }

    // Create registration record
    const { data: registration, error: registrationError } = await supabase
      .from('registrations')
      .insert([
        {
          student_id: student.id,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (registrationError) {
      console.error('Error creating registration:', registrationError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to create registration' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Registration submitted successfully',
        registrationId: registration.id,
        studentId: student.id
      })
    };

  } catch (error) {
    console.error('Error processing registration:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

module.exports = { handler };
