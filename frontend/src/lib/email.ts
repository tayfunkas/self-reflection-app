export async function sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  
    // send email with your provider here
    //env = NEXT_PUBLIC_APP_URL=http://localhost:3000
  }