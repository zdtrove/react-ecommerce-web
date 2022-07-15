import { Category } from './category';
import { Product } from './product';
import { Store } from './store';
import { User } from './user';
import { Event } from './event';

export type Dashboard = {
  products: Product[];
  users: User[];
  categories: Category[];
  events: Event[];
  stores: Store[];
};

export type DashboardState = {
  dashboards: Dashboard;
  loading: boolean;
};
