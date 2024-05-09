import auth0 from 'auth0-js';

const handleSignUp = async () => {
  try {
    // OAuth 리디렉션 URL 생성
    const redirectUri = encodeURIComponent('http://localhost:8000/callback');
    const responseType = 'code';
    const clientId = 'WZzQTADDfw3w1TVuHUMmXdkI8jmLj1sP';
    const auth0Domain = 'dev-gnlnkgtwghmhwrvs.us.auth0.com';
    const scope = 'openid profile email';
    const state = Math.random().toString(36).substring(7); // 랜덤한 state 값 생성

    // state 값을 세션 스토리지에 저장
    sessionStorage.setItem('oauthState', state);

    // OAuth로 리디렉션
    const authUrl = `https://${auth0Domain}/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
    window.location.href = authUrl;
  } catch (error) {
    console.error('Error during sign-up:', error);
  }
};

export { handleSignUp };