module.exports = {
  // NOTE: previously tried pinning `turbopack.root` here to silence the
  // "multiple lockfiles" warning, but it broke PostCSS's Tailwind
  // resolution in dev. Leaving unset — the warning is cosmetic; killing
  // the stray ~/package-lock.json is the real fix (user-side cleanup).
  rewrites: async () => {
    return [
      {
        source: '/auth',
        destination: '/auth/signin'
      }
    ];
  }
};
