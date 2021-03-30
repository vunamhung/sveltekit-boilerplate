import * as cookie from 'cookie';

export function getContext({ headers }) {
  const cookies = cookie.parse(headers.cookie || '');
  const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');

  return {
    user: jwt ? JSON.parse(jwt) : null,
  };
}

export function getSession({ context }) {
  return {
    user: context.user && {
      username: context.user.username,
      email: context.user.email,
      image: context.user.image,
      bio: context.user.bio,
    },
  };
}
