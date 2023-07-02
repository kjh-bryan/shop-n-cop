import { ShopNCopStackNavigation } from './NavigationConstants';

export type StackParams = {
  [ShopNCopStackNavigation.signIn]: undefined;
  [ShopNCopStackNavigation.register]: undefined;
  [ShopNCopStackNavigation.search]: {
    userId?: string;
  };
  [ShopNCopStackNavigation.results]: {
    data?: object;
  };
  [ShopNCopStackNavigation.history]: undefined;
};
