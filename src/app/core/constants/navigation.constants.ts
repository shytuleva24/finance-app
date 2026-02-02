import { NavItem } from '../models/nav-item.model';

/**
 * Navigation items for the main sidebar.
 */
export const SIDEBAR_NAV_ITEMS: readonly NavItem[] = [
  { label: 'Overview', icon: 'assets/images/icon-nav-overview.svg', route: '/overview' },
  {
    label: 'Transactions',
    icon: 'assets/images/icon-nav-transactions.svg',
    route: '/transactions',
  },
  { label: 'Budgets', icon: 'assets/images/icon-nav-budgets.svg', route: '/budgets' },
  { label: 'Pots', icon: 'assets/images/icon-nav-pots.svg', route: '/pots' },
  {
    label: 'Recurring Bills',
    icon: 'assets/images/icon-nav-recurring-bills.svg',
    route: '/recurring-bills',
  },
  { label: 'Settings', icon: 'assets/images/icon-ellipsis.svg', route: '/settings' },
];
