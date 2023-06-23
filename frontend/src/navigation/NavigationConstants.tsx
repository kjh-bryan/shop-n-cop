const StackNavigationPrefix = "ShopNCop-";

export const ShopNCopStackNavigation = {
  signIn: `${StackNavigationPrefix}SignIn`,
  register: `${StackNavigationPrefix}Register`,
  search: `${StackNavigationPrefix}Search`,
  results: `${StackNavigationPrefix}Results`,
  history: `${StackNavigationPrefix}History`,
} as const;
