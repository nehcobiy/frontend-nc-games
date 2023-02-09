export function matchUserImgs(userImgs) {
  const userAvatarsReference = {};
  userImgs.forEach(({ username, avatar_url }) => {
    userAvatarsReference[username] = avatar_url;
  });
  return userAvatarsReference;
}
