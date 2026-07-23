// Real Email Dispatcher Client Service
export const sendOtpEmail = async (email, name, otp) => {
  try {
    const response = await fetch('http://localhost:5000/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, otp })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('[EMAIL SERVICE WARNING] Backend server unreachable, using client dispatch mode.', error);
    return {
      success: false,
      error: 'Could not connect to local email backend on port 5000.'
    };
  }
};
