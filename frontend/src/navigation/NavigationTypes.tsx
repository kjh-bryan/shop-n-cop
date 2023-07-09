import { ShopNCopStackNavigation } from './NavigationConstants';

export type StackParams = {
  [ShopNCopStackNavigation.signIn]: {
    registeredEmail?: string;
    registeredPassword?: string;
  };
  [ShopNCopStackNavigation.register]: undefined;
  [ShopNCopStackNavigation.search]: {
    userId?: string;
  };
  [ShopNCopStackNavigation.results]: {
    data?: object;
    query?: string;
  };
  [ShopNCopStackNavigation.history]: undefined;
};
