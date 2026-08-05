/* eslint-disable */

import {
  ArrowLeftRight,
  Ban,
  BarChart,
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck,
  Car,
  CircleHelp,
  Coins,
  Contact2,
  CreditCard,
  Factory,
  FileSpreadsheet,
  FileText,
  Filter,
  Fingerprint,
  Gavel,
  Globe,
  Globe2,
  Handshake,
  HardDrive,
  History,
  Home,
  Hourglass,
  Info,
  Key,
  KeyRound,
  LayoutDashboard,
  ListTodo,
  LocateFixed,
  Map,
  MapPin,
  MapPinned,
  MessageSquareWarning,
  Network,
  Package,
  Percent,
  Radar,
  Route,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Ship,
  Star,
  Store,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  Truck,
  Undo2,
  UserPlus2,
  UserSquare2,
  Users,
  Users2,
  Wallet,
  Workflow,
  Wrench,
  XCircle,
  Zap,
  type LucideIcon,
} from "lucide-react";

import {
  getCaptainFilters,
  getOrderStatus,
  getOrderStatusCounts,
} from "@/app/[locale]/(main)/dashboard/3pl/order/_api/get-filters";
import { ordersTableData } from "@/app/[locale]/(main)/dashboard/3pl/order/_api/get-orders";
import {
  fetchCaptainData,
  fetchOrderReportsData,
  fetchOrderStatusData,
} from "@/app/[locale]/(main)/dashboard/client/order-report/_api/get-orders";
import { getOrderReportDefaultFilters } from "@/app/[locale]/(main)/dashboard/client/order-report/_hooks/use-order-report-params";
import {
  orderStatusData as clientOrderStatusData,
  orderShopData,
  orderStatusCardData,
  orderTabledatas,
  ordersShopData,
} from "@/app/[locale]/(main)/dashboard/client/orders/_api/get-orders";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
  permission?: string;
}

export interface PrefetchEntry {
  queryKey: unknown[];
  queryFn: () => Promise<unknown>;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
  permission?: string;
  /** Queries to prefetch when the user hovers over this link */
  prefetchKeys?: PrefetchEntry[];
  /** Queries to prefetch that depend on runtime context (e.g. the user's company id) */
  getPrefetchKeys?: (ctx: { companyId?: number }) => PrefetchEntry[];
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const ClientSidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "sidebar.client_home.label",
    items: [
      {
        title: "sidebar.home.home",
        url: "/dashboard/client/home",
        icon: Home,
      },
      {
        title: "sidebar.client_home.dashboard",
        url: "/dashboard/client/client-dashboard",
        icon: LayoutDashboard,
        permission: "view-client-dispatcher",
      },
      {
        title: "sidebar.client_home.orders",
        url: "/dashboard/client/orders",
        icon: Package,
        permission: "view-client-dispatcher",
        prefetchKeys: [
          // First page of orders with no filters — mirrors useOrdersLists default state
          {
            queryKey: ["order", {}, 1, 20],
            queryFn: () => orderTabledatas({ page: 1, pageSize: 20 }),
          },
          {
            queryKey: ["order-shops"],
            queryFn: orderShopData,
          },
          {
            queryKey: ["order-status"],
            queryFn: clientOrderStatusData,
          },
          {
            queryKey: ["shop-data"],
            queryFn: ordersShopData,
          },
          {
            queryKey: ["order-status-card"],
            queryFn: orderStatusCardData,
          },
        ],
      },
      {
        title: "sidebar.client_home.sales_report",
        url: "/dashboard/client/sales-report",
        icon: BarChart3,
        permission: "view-sales-report-client",
      },
      {
        title: "sidebar.client_home.transactions",
        url: "/dashboard/client/transactions",
        icon: ArrowLeftRight,
        permission: "view-client-transaction",
      },
      {
        title: "sidebar.client_home.config_access",
        url: "/dashboard/client/access-token",
        icon: ShieldAlert,
        permission: "view-access-token-client",
      },
      {
        title: "sidebar.client_home.order_report",
        url: "/dashboard/client/order-report",
        icon: FileText,
        permission: "view-report.high_level",
        prefetchKeys: [
          // Static dropdown data — captains & statuses lists
          {
            queryKey: ["order-report-captain"],
            queryFn: fetchCaptainData,
          },
          {
            queryKey: ["order-report-status"],
            queryFn: fetchOrderStatusData,
          },
          // First page of orders with default filters (last 6 days → tomorrow)
          // queryKey mirrors useOrdersLists so cache hits immediately on page load
          {
            queryKey: ["order-report", getOrderReportDefaultFilters(), 1, 10],
            queryFn: () => {
              const { from_date, to_date } = getOrderReportDefaultFilters();
              return fetchOrderReportsData({
                fromDate: from_date,
                toDate: to_date,
                page: 1,
                pageSize: 10,
              });
            },
          },
        ],
      },
    ],
  },
];

export const ThirdPartySidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "sidebar.home.label",
    items: [
      {
        title: "sidebar.third_party.home",
        url: "/dashboard/3pl/home",
        icon: Package,
        //  permission: "view-dashboard",
      },
      {
        title: "sidebar.third_party.dashboard",
        url: "/dashboard/3pl/dashboard",
        icon: LayoutDashboard,
        // permission: "view-dashboard",
      },
      {
        title: "sidebar.third_party.orders",
        url: "/dashboard/3pl/order",
        icon: Timer,
        //permission: "view-dashboard",
        prefetchKeys: [
          // Company-independent filter list
          {
            queryKey: ["filter-regions"],
            queryFn: getOrderStatus,
          },
        ],
        // Company-scoped queries — companyId is only known at runtime (from the user store)
        getPrefetchKeys: ({ companyId }) => {
          if (!companyId) return [];
          return [
            {
              queryKey: ["orders", {}, 1, 20, companyId],
              queryFn: () =>
                ordersTableData({
                  page: 1,
                  per_page: 20,
                  company_id_3pl: companyId,
                }),
            },
            {
              queryKey: ["filter-captains", companyId],
              queryFn: () => getCaptainFilters(),
            },
            {
              queryKey: ["order-status-counts", companyId],
              queryFn: () => getOrderStatusCounts(companyId),
            },
          ];
        },
      },
      {
        title: "sidebar.third_party.employees",
        url: "/dashboard/3pl/employee",
        icon: Users,
        //permission: "view-dashboard",
      },
      {
        title: "sidebar.third_party.captain",
        url: "/dashboard/3pl/captain",
        icon: UserSquare2,
        //permission: "view-dashboard",
      },
      {
        title: "sidebar.third_party.vehicle",
        url: "/dashboard/3pl/vehicle",
        icon: Truck,
        //permission: "view-dashboard",
      },
      {
        title: "sidebar.third_party.accounts.accounts",
        url: "",
        icon: Coins,
        //permission: "view-dashboard",
        subItems: [
          {
            title: "sidebar.third_party.accounts.captains_commission",
            icon: LocateFixed,
            url: "/dashboard/3pl/accounts/captain-commission",
            // permission: "view-captains-commission",
          },
          {
            title: "sidebar.third_party.accounts.company_earning",
            icon: LocateFixed,
            url: "/dashboard/3pl/accounts/company-earning",
            // permission: "view-company-earning",
          },
          {
            title: "sidebar.third_party.accounts.reconciliation",
            icon: LocateFixed,
            url: "/dashboard/3pl/accounts/reconciliation",
            // permission: "view-reconciliation",
          },
        ],
      },
      {
        title: "sidebar.third_party.reports",
        url: "",
        icon: FileText, //permission: "view-dashboard",
        subItems: [
          {
            title: "sidebar.kpi_reports.captain_performance",
            icon: FileText,
            url: "/dashboard/3pl/reports/performance", // permission: "view-captains-commission",
          },
          {
            title: "sidebar.kpi_reports.captain_working_days",
            icon: FileText,
            url: "/dashboard/3pl/reports/working-days", // permission: "view-company-earning",
          },
          // {
          //   title: "sidebar.third_party.com_reports",
          //   icon: Receipt,
          //   url: "/dashboard/3pl/accounts/commission-reports",
          // },
        ],
      },
    ],
  },
];

export const generalSidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "sidebar.home.label",
    items: [
      {
        title: "sidebar.home.home",
        url: "/dashboard/general/home",
        icon: Home,
      },
      // 1. DASHBOARD
      {
        title: "sidebar.dashboards.dashboard",
        url: "",
        icon: LayoutDashboard,
        subItems: [
          {
            title: "sidebar.dashboards.dashboard",
            url: "/dashboard/general/dashboard",
            icon: LayoutDashboard,
            permission: "view-dashboard",
          },
          {
            title: "sidebar.dashboards.overall",
            url: "/dashboard/general/overall-dashboard",
            icon: BarChart3,
            permission: "view-dashboard-overall",
          },
          {
            title: "sidebar.dashboards.clients",
            url: "/dashboard/general/client-overview",
            icon: Users,
            permission: "view-dashboard-client",
          },
          {
            title: "Top Management",
            url: "/dashboard/general/top-management",
            icon: ShieldCheck,
            permission: "view-dashboard-management",
          },
          {
            title: "sidebar.dashboards.operational_performance",
            url: "/dashboard/general/operational-performance",
            icon: Zap,
            permission: "view-dashboard-operational-performance",
          },
          {
            title: "sidebar.dashboards.sales",
            url: "/dashboard/general/sales-dashboard",
            icon: TrendingUp,
            permission: "view-dashboard-sales-performance",
          },
        ],
      },
      // 2. ORDERS
      {
        title: "sidebar.orders.label",
        url: "",
        icon: Package,
        subItems: [
          {
            title: "sidebar.orders.dispatcher",
            url: "/dashboard/general/orders/dispatcher",
            permission: "view-dispatcher",
          },
          {
            title: "sidebar.orders.scheduled_orders",
            url: "/dashboard/general/orders/scheduled",
            permission: "view-scheduled-orders",
          },
          {
            title: "sidebar.orders.consolidated_orders",
            url: "/dashboard/general/orders/consolidated",
            permission: "view-consolidated-orders",
          },
          {
            title: "sidebar.orders.dispatcher_live",
            url: "/dashboard/general/orders/dispatcher-live",
            permission: "view-live-dispatcher",
          },
        ],
      },
      // 3. COMPLAINTS
      {
        title: "sidebar.complaints.label",
        url: "",
        icon: MessageSquareWarning,
        subItems: [
          {
            title: "sidebar.complaints.tickets",
            icon: MessageSquareWarning,
            url: "/dashboard/general/complaints/tickets",
            permission: "view-tickets",
          },
          {
            title: "sidebar.complaints.ticket_report",
            icon: FileText,
            url: "/dashboard/general/complaints/ticket-report",
            permission: "report-tickets",
          },
          {
            title: "sidebar.complaints.pending_orders",
            icon: CircleHelp,
            url: "/dashboard/general/complaints/pending-orders",
            permission: "view-pending-orders",
          },
        ],
      },
      // 4. CAPTAIN REPORTS
      {
        title: "sidebar.captain_reports.label",
        url: "",
        icon: Truck,
        subItems: [
          {
            title: "sidebar.captain_reports.delivery_report",
            icon: Truck,
            url: "/dashboard/general/captain-reports/delivery-report",
            permission: "view-delivery-report",
          },
          {
            title: "sidebar.captain_reports.commission_report",
            icon: Coins,
            url: "/dashboard/general/captain-reports/commission-report",
            permission: "view-commissions",
          },
          {
            title: "sidebar.captain_reports.commission_payments",
            icon: CreditCard,
            url: "/dashboard/general/captain-reports/commission-payments",
            permission: "view-commissions",
          },
          {
            title: "sidebar.captain_reports.shift_report",
            icon: History,
            url: "/dashboard/general/captain-reports/shift-report",
            permission: "view-shift-report",
          },
          {
            title: "sidebar.captain_reports.kpi_report",
            icon: History,
            url: "/dashboard/general/captain-reports/kpi-commission-reports",
            permission: "view-commissions",
          },
          {
            title: "sidebar.captain_reports.salary_payments",
            icon: CreditCard,
            url: "/dashboard/general/captain-reports/salary-payments",
            permission: "view-commissions",
          },
        ],
      },
      // 5. CLIENT REPORTS
      {
        title: "sidebar.client_reports.label",
        url: "",
        icon: BarChart,
        subItems: [
          {
            title: "sidebar.client_reports.sales_report",
            icon: BarChart,
            url: "/dashboard/general/client-reports/sales-report",
            permission: "view-salesreport",
          },
          {
            title: "sidebar.client_reports.client_transactions",
            icon: Settings2,
            url: "/dashboard/general/client-reports/client-transactions",
            permission: "view-transactions",
          },
          {
            title: "sidebar.client_reports.cancellation_report",
            icon: XCircle,
            url: "/dashboard/general/client-reports/cancellation-report",
            permission: "view-cancellation-report",
          },
          {
            title: "sidebar.client_reports.client_level_report",
            icon: BarChart,
            url: "/dashboard/general/client-reports/client-level",
            permission: "view-client-level-report",
          },
          {
            title: "sidebar.client_reports.client_sales_report",
            icon: BarChart,
            url: "/dashboard/general/client-reports/client-sales",
            permission: "view-client-salesreport",
          },
        ],
      },
      // 6. 3PL REPORTS
      {
        title: "sidebar.general.3pl_commission_reports",
        url: "",
        icon: Ship,
        subItems: [
          {
            title: "sidebar.3pl_reports.com_report",
            icon: Route,
            url: "/dashboard/general/3pl/commission-reports",
            permission: "view-3pl-reports",
          },
          {
            title: "sidebar.3pl_reports.captain_com_report",
            icon: ShieldCheck,
            url: "/dashboard/general/3pl/captain-commission-reports",
            permission: "view-3pl-reports",
          },
        ],
      },
      // 7. KPI REPORTS
      {
        title: "sidebar.kpi_reports.label",
        url: "",
        icon: BarChart3,
        subItems: [
          {
            title: "sidebar.kpi_reports.high_level",
            icon: Trophy,
            url: "/dashboard/general/kpi-reports/high-level",
            permission: "view-report.high_level",
          },
          {
            title: "sidebar.kpi_reports.driver_level",
            icon: UserSquare2,
            url: "/dashboard/general/kpi-reports/driver-level",
            permission: "view-report.driver_level",
          },
          {
            title: "sidebar.kpi_reports.captain_performance",
            icon: Star,
            url: "/dashboard/general/kpi-reports/captain-performance",
            permission: "view-captain-performance",
          },
          {
            title: "sidebar.kpi_reports.vendor_level",
            icon: Store,
            url: "/dashboard/general/kpi-reports/vendor-level",
            permission: "view-report.vendor_level",
          },
          {
            title: "sidebar.kpi_reports.geographical_level",
            icon: Globe,
            url: "/dashboard/general/kpi-reports/geographical-level",
            permission: "view-report.geographical_level",
          },
          {
            title: "sidebar.kpi_reports.zone_detailed",
            icon: MapPin,
            url: "/dashboard/general/kpi-reports/zone-detailed",
            permission: "view-report.zone_detailed_report",
          },
          {
            title: "sidebar.kpi_reports.area_based",
            icon: MapPin,
            url: "/dashboard/general/kpi-reports/area-based",
            permission: "view-report.area_based_report",
          },
          {
            title: "sidebar.kpi_reports.region_based",
            icon: MapPin,
            url: "/dashboard/general/kpi-reports/region-based",
            permission: "view-report.region_based_report",
          },
          {
            title: "sidebar.kpi_reports.zone_based",
            icon: MapPin,
            url: "/dashboard/general/kpi-reports/zone-based",
            permission: "view-report.zone_based_report",
          },
          {
            title: "sidebar.kpi_reports.order_timeline",
            icon: Package,
            url: "/dashboard/general/kpi-reports/order-time-line",
            permission: "view-order-time-line",
          },
        ],
      },
      // 8. REPORTS
      {
        title: "sidebar.reports.label",
        url: "",
        icon: FileSpreadsheet,
        subItems: [
          {
            title: "sidebar.reports.expense_report",
            icon: Wallet,
            url: "/dashboard/general/reports/expense-report",
            permission: "view-expensereport",
          },
          {
            title: "sidebar.reports.captain_transactions",
            icon: FileSpreadsheet,
            url: "/dashboard/general/reports/captain-transactions",
            permission: "view-captain-transaction",
          },
        ],
      },
      // 9. VEHICLE
      {
        title: "sidebar.vehicle.label",
        url: "",
        icon: Car,
        subItems: [
          {
            title: "sidebar.vehicle.all_vehicle",
            icon: Car,
            url: "/dashboard/general/vehicles",
            permission: "view-vehicles",
          },
          {
            title: "sidebar.vehicle.rented_vehicles",
            icon: Key,
            url: "/dashboard/general/rented-vehicles",
            permission: "manage-rent",
          },
        ],
      },
      // 10. EMPLOYEES
      {
        title: "sidebar.employees.label",
        url: "",
        icon: Users,
        subItems: [
          {
            title: "sidebar.employees.employees",
            icon: Users2,
            url: "/dashboard/general/employees/employees",
            permission: "view-admin",
          },
          {
            title: "sidebar.employees.captains",
            icon: Contact2,
            url: "/dashboard/general/employees/captains",
            permission: "view-captains",
          },
          {
            title: "sidebar.employees.reg_requests",
            icon: UserPlus2,
            url: "/dashboard/general/employees/registration-requests",
            permission: "view-captain-requests",
          },
          {
            title: "sidebar.employees.operations",
            icon: Wrench,
            url: "/dashboard/general/employees/operations",
            permission: "view-operations",
          },
        ],
      },
      // 11. OPERATION REPORTS
      {
        title: "sidebar.operation_reports.label",
        url: "",
        icon: CalendarCheck,
        subItems: [
          {
            title: "sidebar.operation_reports.daily_shift_reports",
            url: "/dashboard/general/operation-reports/daily-shift-reports",
            icon: CalendarCheck,
            permission: "operations-daily-report",
          },
          {
            title: "sidebar.operation_reports.timesheet_reports",
            url: "/dashboard/general/operation-reports/timesheet-reports",
            icon: Timer,
            permission: "operations-timesheet-report",
          },
        ],
      },
      // 12. CRM
      {
        title: "sidebar.crm.label",
        url: "",
        icon: Bell,
        subItems: [
          {
            title: "sidebar.crm.notifications",
            icon: Bell,
            url: "/dashboard/general/crm/notifications",
            permission: "view-sendable",
          },
        ],
      },
      // 13. SALES MANAGEMENT
      {
        title: "sidebar.sales_management.label",
        url: "",
        icon: Briefcase,
        subItems: [
          {
            title: "sidebar.sales_management.roles",
            icon: Fingerprint,
            url: "/dashboard/general/sales_management/roles",
            permission: "manage-roles",
          },
          {
            title: "sidebar.sales_management.team_management",
            icon: Network,
            url: "/dashboard/general/sales_management/team-management",
            permission: "manage-teams",
          },
          {
            title: "sidebar.sales_management.sales_leads",
            icon: Filter,
            url: "/dashboard/general/sales_management/sales-leads",
            permission: "manage-leads",
          },
          {
            title: "sidebar.sales_management.clients",
            icon: Package,
            url: "/dashboard/general/sales_management/clients",
            permission: "view-clients",
          },
        ],
      },
      // 14. MAP VIEWS
      {
        title: "sidebar.map_views.label",
        url: "",
        icon: Map,
        subItems: [
          {
            title: "sidebar.map_views.store_view",
            url: "/dashboard/general/map-views/store-view",
            icon: Building2,
            permission: "map-view-shops",
          },
          {
            title: "sidebar.map_views.order_view",
            url: "/dashboard/general/map-views/order-view",
            icon: MapPinned,
            permission: "map-view-order",
          },
          {
            title: "sidebar.map_views.store_order_view",
            url: "/dashboard/general/map-views/store-order-view",
            icon: LocateFixed,
            permission: "map-view-order",
          },
        ],
      },
      // 15. DELIVERY RULES
      {
        title: "sidebar.delivery_rules.label",
        url: "",
        icon: Gavel,
        subItems: [
          {
            title: "sidebar.delivery_rules.price_rule_master",
            url: "/dashboard/general/delivery-rules/price-rule",
            icon: Gavel,
            permission: "manage-delivery-charge-rule",
          },
          {
            title: "sidebar.delivery_rules.cancellation_charge",
            url: "/dashboard/general/delivery-rules/cancellation-charge",
            icon: Ban,
            permission: "manage-delivery-charge-rule",
          },
          {
            title: "sidebar.delivery_rules.return_to_client_charge",
            url: "/dashboard/general/delivery-rules/return-charge",
            icon: Undo2,
            permission: "manage-delivery-charge-rule",
          },
        ],
      },
      // 16. SYSTEM SETTINGS
      {
        title: "sidebar.system_settings.label",
        url: "",
        icon: Settings2,
        subItems: [
          {
            title: "sidebar.system_settings.shift_rules",
            url: "/dashboard/general/system-settings/shift-rules",
            icon: Settings2,
            permission: "manage-shift-rules",
          },
          {
            title: "sidebar.system_settings.dispatch_rules",
            url: "/dashboard/general/system-settings/dispatch-rules",
            icon: Workflow,
            permission: "manage-dispatch-rule",
          },
          {
            title: "sidebar.system_settings.commission_rules",
            url: "/dashboard/general/system-settings/commission-rule",
            icon: Percent,
            permission: "manage-commission-rule",
          },
          {
            title: "sidebar.system_settings.role_and_permission",
            url: "/dashboard/general/system-settings/role-permission",
            icon: UserPlus2,
            permission: "manage-role-permissions",
          },
          {
            title: "sidebar.system_settings.vat_master",
            url: "/dashboard/general/system-settings/vat",
            icon: Calculator,
            permission: "manage-vat",
          },
          {
            title: "sidebar.system_settings.industry_types",
            url: "/dashboard/general/system-settings/industry-types",
            icon: Factory,
            permission: "manage-industries",
          },
          {
            title: "sidebar.system_settings.api_token",
            url: "/dashboard/general/system-settings/api-token",
            icon: KeyRound,
            permission: "manage-api-tokens",
          },
        ],
      },
      // 17. GEO SETTINGS
      {
        title: "sidebar.geo_settings.label",
        url: "",
        icon: Globe2,
        subItems: [
          {
            title: "sidebar.geo_settings.regions",
            icon: MapPin,
            url: "/dashboard/general/geo-settings/region",
            permission: "view-quadrants",
          },
          {
            title: "sidebar.geo_settings.areas",
            icon: MapPin,
            url: "/dashboard/general/geo-settings/area",
            permission: "view-regions",
          },
          {
            title: "sidebar.geo_settings.zones",
            icon: MapPin,
            url: "/dashboard/general/geo-settings/zone",
            permission: "view-zones",
          },
        ],
      },
      // 18. LOGS & EXPIRES
      {
        title: "sidebar.logs_and_expires.label",
        url: "",
        icon: Hourglass,
        subItems: [
          {
            title: "sidebar.logs_and_expires.logs",
            url: "/dashboard/general/logs_expires/logs",
            icon: ListTodo,
            permission: "manage-logs",
          },
          {
            title: "sidebar.logs_and_expires.expires",
            url: "/dashboard/general/logs_expires/expires",
            icon: Hourglass,
            permission: "manage-expires",
          },
        ],
      },
      // 19. GENERAL
      {
        title: "sidebar.general.label",
        url: "",
        icon: Info,
        subItems: [
          {
            title: "sidebar.general.partner",
            url: "/dashboard/general/partner",
            icon: Handshake,
            permission: "view-partner",
          },
          {
            title: "sidebar.general.company_info",
            url: "/dashboard/general/company-info",
            icon: Info,
            permission: "manage-company",
          },
          {
            title: "sidebar.general.accounts",
            url: "/dashboard/general/accounts",
            icon: CreditCard,
            permission: "manage-accounts",
          },
          {
            title: "sidebar.general.asset",
            url: "/dashboard/general/asset",
            icon: HardDrive,
            permission: "view-assets",
          },
        ],
      },
      // 20. SALES AND OPERATIONS
      {
        title: "sidebar.sales_and_operations.label",
        url: "",
        icon: TrendingUp,
        subItems: [
          {
            title: "sidebar.sales_and_operations.active_clients_map",
            url: "/dashboard/general/sales-operation/active-client-map",
            icon: Radar,
            permission: "marketing-active-clients",
          },
          {
            title: "sidebar.sales_and_operations.potential_client",
            url: "/dashboard/general/sales-operation/potential-clients",
            icon: Target,
            permission: "marketing-potential-clients",
          },
          {
            title: "sidebar.sales_and_operations.client_scrapper",
            url: "/dashboard/general/sales-operation/client-scrapper",
            icon: Globe2,
            permission: "marketing-scrapper",
          },
        ],
      },
    ],
  },
];
