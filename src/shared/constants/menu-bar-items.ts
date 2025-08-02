import {MenuItem} from 'primeng/api';
import {IMenuItem} from '../interfaces/iMenu-item';

export const MENU_ITEMS: IMenuItem[] = [
  {
    label: 'MAIN',
    iconPath: 'assets/svg/sidebarIcons/main.svg',
    hoverIconPath: 'assets/svg/sidebarIcons/main-hover.svg',
    navPath: '/main',
    expanded: false,
    uiNames: ['RN_CORE_DASHBOARD_ALL', 'RN_CORE_DASHBOARD_DOMAIN_ADMIN'],
  },
  {
    label: 'CONTRACTORS',
    iconPath: 'assets/svg/sidebarIcons/portfolio.svg',
    hoverIconPath: 'assets/svg/sidebarIcons/portfolio-hover.svg',
    expanded: false,
    children: [
      {
        label: 'CONTRACTORS',
        navPath: '/contractors/contractors_list',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS', 'RN_CORE_DASHBOARD_DOMAIN_ADMIN'],
      },
      {
        label: 'CONTRACTORS_PRODUCTS',
        navPath: '/contractors/contractor_products',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS', 'RN_CORE_DASHBOARD_DOMAIN_ADMIN'],
      },
    ],
  },
  {
    label: 'PROVIDERS',
    iconPath: 'assets/svg/sidebarIcons/archive.svg',
    hoverIconPath: 'assets/svg/sidebarIcons/archive-hover.svg',
    expanded: false,
    children: [
      {
        label: 'PROVIDERS',
        navPath: '/main/reset_password',
        expanded: false,
        uiNames: ['RN_CORE_DASHBOARD_ALL', 'RN_CORE_DASHBOARD_DOMAIN_ADMIN'],
      },
    ],
  },
  {
    label: 'STATISTICS',
    iconPath: 'assets/svg/sidebarIcons/statistic.svg',
    hoverIconPath: 'assets/svg/sidebarIcons/statistic-hover.svg',
    expanded: false,
    uiNames: ['RN_CORE_DASHBOARD_ALL', 'RN_CORE_DASHBOARD_DOMAIN_ADMIN'],
  },
  {
    label: 'ACCOUNTING',
    iconPath: 'assets/svg/sidebarIcons/calculator.svg',
    hoverIconPath: 'assets/svg/sidebarIcons/calculator-hover.svg',
    expanded: false,
    uiNames: ['RN_CORE_DASHBOARD_ALL', 'RN_CORE_DASHBOARD_DOMAIN_ADMIN'],
  },
  {
    label: 'LOGS_MENU',
    iconPath: 'assets/svg/sidebarIcons/clipboard.svg',
    hoverIconPath: 'assets/svg/sidebarIcons/clipboard-hover.svg',
    expanded: false,
    children: [
      {
        label: 'SYNC_LOGS_MENU',
        navPath: 'logs/kafka_events_log',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
      {
        label: 'HISTORY_BY_CONTRACTORS',
        navPath: 'logs/contractor_history_log',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS', 'RN_CORE_DASHBOARD_DOMAIN_ADMIN'],
      },
    ],
  },
  {
    label: 'COMMON',
    iconPath: 'assets/svg/sidebarIcons/archive-stack.svg',
    hoverIconPath: 'assets/svg/sidebarIcons/archive-stack-hover.svg',
    expanded: false,
    children: [
      {
        label: 'ORGANIZATIONS',
        navPath: 'common/organizations',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
    ],
  },
  {
    label: 'PROVIDERS',
    iconPath: 'assets/svg/sidebarIcons/server-line.svg',
    expanded: false,
    children: [
      {
        label: 'PROVIDERS',
        navPath: 'providers/providers-list',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
    ],
  },
  {
    label: 'NETWORK',
    iconPath: 'assets/svg/sidebarIcons/network.svg',
    expanded: false,
    children: [
      {
        label: 'COUNTRIES',
        navPath: 'network/routing-countries',
        expanded: false,
        uiNames: ['BSS_CORE_ROUTING_COUNTRIES_GET'],
      },
      {
        label: 'REGIONS',
        navPath: 'network/regions',
        expanded: false,
        uiNames: ['BSS_CORE_REGIONS_GET'],
      },
      {
        label: 'PREFIXES',
        navPath: 'network/prefixes',
        expanded: false,
        uiNames: ['BSS_CORE_REGIONS_GET'],
      },
      {
        label: 'NETWORKS',
        navPath: 'network/networks',
        expanded: false,
        uiNames: ['BSS_CORE_NETWORKS_GET'],
      },
    ],
  },
  {
    label: 'SETTINGS',
    iconPath: 'assets/svg/sidebarIcons/settings.svg',
    hoverIconPath: 'assets/svg/sidebarIcons/settings-hover.svg',
    expanded: false,
    children: [
      {
        label: 'ACCESS_RIGHTS',
        navPath: 'settings/access_rights/access_points',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
      {
        label: 'LOCALIZATION',
        navPath: 'settings/localization',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
      {
        label: 'AUDIT_LOGS',
        navPath: 'settings/audit_logs',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
      {
        label: 'CURRENCIES',
        navPath: 'settings/currencies',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
      {
        label: 'DOMAINS',
        navPath: 'settings/domains',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
      {
        label: 'CUSTOMER_TYPES',
        navPath: 'settings/customer_types',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
      {
        label: 'TAX_REGIMES',
        navPath: 'settings/tax_regimes',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
      {
        label: 'PRODUCT_TYPES',
        navPath: 'settings/product-types',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
      {
        label: 'PROVIDER_TYPES',
        navPath: 'settings/provider-types',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
      {
        label: 'BILLING_TYPES',
        navPath: 'settings/billing-types',
        expanded: false,
        uiNames: ['BSS_CORE_PERMISSIONS'],
      },
    ],
  },
];
