import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session?.user?.email === 'hasaanahmad10023@gmail.com') {
    res.status(200).json({ authorized: true });
  } else {
    res.status(404).json({ authorized: false });
  }
}