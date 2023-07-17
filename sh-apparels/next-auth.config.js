import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: '127753896569-052r4j8c8602limhcmb0um094ug98c8p.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
});
