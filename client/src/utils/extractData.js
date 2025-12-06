export const extractData = (result) => {
  if (result.latestProperties) return result.latestProperties;
  if (result.properties) return result.properties;
  if (result.property) return result.property;
  if (result.user) return result.user;

  return result;
};
