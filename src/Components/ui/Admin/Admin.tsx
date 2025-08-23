import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  Component,
  ErrorInfo,
  ReactNode,
} from "react";
import {
  Home,
  ShoppingCart,
  Users,
  BarChart3,
  Package,
  Settings,
  CreditCard,
  MessageSquare,
  FileText,
  ChevronDown,
  ChevronRight,
  User,
  Search,
  Bell,
  Menu,
  Globe,
  Sun,
  Moon,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  X,
  AlertTriangle,
  RefreshCw,
  AlertCircle,
  Calendar,
  Download,
  Filter,
  Shirt,
  Crown,
  Star,
  Heart,
  Eye,
  Palette,
  Truck,
  Target,
  DollarSign,
  Award,
  UserCheck,
  Clock,
  MapPin,
  Zap,
} from "lucide-react";

// =============================================================================
// Types and Interfaces
// =============================================================================

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user" | "manager";
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
}

interface StatMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  subtitle: string;
  icon?: string;
  color?: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href?: string;
  children?: MenuItem[];
  badge?: string;
  active?: boolean;
}

interface DashboardState {
  user: User | null;
  notifications: Notification[];
  stats: StatMetric[];
  sidebarExpanded: boolean;
  darkMode: boolean;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  sales: number;
  revenue: string;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  image: string;
}

interface CustomerMetric {
  id: string;
  label: string;
  value: string;
  percentage: number;
  color: string;
  icon: React.ComponentType<any>;
}

interface Order {
  id: string;
  customer: string;
  items: number;
  total: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  priority: "low" | "medium" | "high";
}

// =============================================================================
// Utility Functions
// =============================================================================

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

// =============================================================================
// Custom Hooks
// =============================================================================

const useDashboard = () => {
  const [state, setState] = useState<DashboardState>({
    user: {
      id: "1",
      name: "Sophie Laurent",
      email: "sophie@dior.com",
      role: "admin",
    },
    notifications: [
      {
        id: "1",
        title: "New VIP Order",
        message: "High-value order from premium customer",
        timestamp: new Date(),
        type: "success",
        read: false,
      },
      {
        id: "2",
        title: "Low Stock Alert",
        message: "Lady Dior handbag running low on stock",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: "warning",
        read: false,
      },
    ],
    stats: [],
    sidebarExpanded: true,
    darkMode: false,
  });

  const toggleSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, sidebarExpanded: !prev.sidebarExpanded }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  }, []);

  return {
    ...state,
    toggleSidebar,
    toggleDarkMode,
  };
};

// =============================================================================
// Common Components
// =============================================================================

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`inline-block ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-200 border-t-black`}
      />
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "luxury";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-black text-white hover:bg-gray-800 focus:ring-gray-500 tracking-wide",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400 tracking-wide",
    outline:
      "border border-black bg-white text-black hover:bg-black hover:text-white focus:ring-gray-500 tracking-wide",
    ghost: "text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
    luxury:
      "bg-gradient-to-r from-yellow-600 to-yellow-500 text-white hover:from-yellow-700 hover:to-yellow-600 focus:ring-yellow-400 tracking-wider font-semibold",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  return (
    <button
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${fullWidth ? "w-full" : ""} 
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <LoadingSpinner size="sm" className="mr-2" />
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}

      {children}

      {rightIcon && !loading && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

// =============================================================================
// Sidebar Component
// =============================================================================

interface SidebarProps {
  className?: string;
  expanded: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    active: true,
  },
  {
    id: "collections",
    label: "Collections",
    icon: Crown,
    children: [
      {
        id: "haute-couture",
        label: "Haute Couture",
        icon: Star,
        href: "/haute-couture",
      },
      {
        id: "ready-to-wear",
        label: "Ready-to-Wear",
        icon: Shirt,
        href: "/ready-to-wear",
      },
      {
        id: "accessories",
        label: "Accessories",
        icon: Heart,
        href: "/accessories",
      },
      {
        id: "fragrances",
        label: "Fragrances",
        icon: Palette,
        href: "/fragrances",
      },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Package,
    children: [
      { id: "products", label: "Products", icon: Shirt, href: "/products" },
      { id: "stock", label: "Stock Management", icon: Package, href: "/stock" },
      { id: "suppliers", label: "Suppliers", icon: Truck, href: "/suppliers" },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    href: "/orders",
    badge: "24",
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    children: [
      {
        id: "all-customers",
        label: "All Customers",
        icon: Users,
        href: "/customers",
      },
      {
        id: "vip-clients",
        label: "VIP Clients",
        icon: Crown,
        href: "/vip-clients",
      },
      {
        id: "loyalty",
        label: "Loyalty Program",
        icon: Award,
        href: "/loyalty",
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    children: [
      {
        id: "sales-analytics",
        label: "Sales Analytics",
        icon: TrendingUp,
        href: "/sales-analytics",
      },
      {
        id: "customer-insights",
        label: "Customer Insights",
        icon: Eye,
        href: "/customer-insights",
      },
      {
        id: "product-performance",
        label: "Product Performance",
        icon: Target,
        href: "/product-performance",
      },
      {
        id: "market-trends",
        label: "Market Trends",
        icon: Zap,
        href: "/market-trends",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Zap,
    children: [
      { id: "campaigns", label: "Campaigns", icon: Target, href: "/campaigns" },
      {
        id: "influencers",
        label: "Influencer Partnerships",
        icon: Star,
        href: "/influencers",
      },
      {
        id: "social-media",
        label: "Social Media",
        icon: Heart,
        href: "/social-media",
      },
    ],
  },
  { id: "payments", label: "Payments", icon: CreditCard, href: "/payments" },
  { id: "messages", label: "Messages", icon: MessageSquare, href: "/messages" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ className = "", expanded }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "collections",
    "analytics",
  ]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const Icon = item.icon;

    return (
      <div key={item.id}>
        <div
          className={`
            flex items-center px-6 py-3 text-gray-300 hover:bg-gray-900 hover:text-white 
            cursor-pointer transition-all duration-200 group border-l-2 border-transparent
            hover:border-l-2 hover:border-yellow-500
            ${level > 0 ? "pl-12 bg-gray-850" : ""}
            ${
              item.active
                ? "bg-gray-900 text-white border-l-2 border-yellow-500"
                : ""
            }
          `}
          onClick={() => (hasChildren ? toggleExpanded(item.id) : undefined)}
        >
          <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
          {expanded && (
            <>
              <span className="flex-1 text-sm font-medium tracking-wide">
                {item.label}
              </span>
              {item.badge && (
                <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <div className="ml-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {hasChildren && isExpanded && expanded && (
          <div className="bg-gray-850">
            {item.children!.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 ${
        expanded ? "w-72" : "w-20"
      } bg-black transition-all duration-300 ${className} border-r border-gray-800`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20 px-6 bg-black border-b border-gray-800">
        {expanded ? (
          <div className="text-center">
            <h1
              className="text-2xl font-bold text-white tracking-widest"
              style={{ fontFamily: "serif" }}
            >
              DIOR
            </h1>
            <p className="text-xs text-gray-400 tracking-widest mt-1">
              ADMIN PORTAL
            </p>
          </div>
        ) : (
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span
              className="text-black font-bold text-lg"
              style={{ fontFamily: "serif" }}
            >
              D
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1 overflow-y-auto scrollbar-hide">
        {expanded && (
          <div className="px-6 mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Navigation
            </p>
          </div>
        )}
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>

      {/* User Profile */}
      {expanded && (
        <div className="absolute bottom-0 w-full p-6 bg-gray-900 border-t border-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white tracking-wide">
                Sophie Laurent
              </p>
              <p className="text-xs text-gray-400">Creative Director</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// Header Component
// =============================================================================

interface HeaderProps {
  className?: string;
  onToggleSidebar: () => void;
  sidebarExpanded: boolean;
}

const Header: React.FC<HeaderProps> = ({
  className = "",
  onToggleSidebar,
  sidebarExpanded,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header
      className={`bg-white shadow-sm border-b border-gray-100 ${className}`}
    >
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left side */}
        <div className="flex items-center flex-1">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-gray-500 hover:text-black transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:block relative ml-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search collections, products, orders..."
              className="block w-80 pl-12 pr-4 py-3 border border-gray-200 rounded-none leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-black focus:ring-0 text-sm tracking-wide"
            />
          </div>
        </div>

        {/* Center - Page Title */}
        <div className="hidden lg:block">
          <h1
            className="text-xl font-semibold text-black tracking-wide"
            style={{ fontFamily: "serif" }}
          >
            Maison Dashboard
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Language selector */}
          <button className="p-2 text-gray-500 hover:text-black transition-colors">
            <Globe className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-500 hover:text-black transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 bg-yellow-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-none shadow-2xl border border-gray-100 z-50">
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-black tracking-wide mb-4">
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-black">
                          New VIP Order
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          High-value order from premium customer
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          2 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-black">
                          Low Stock Alert
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Lady Dior handbag running low
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          15 minutes ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <button className="p-2 text-gray-500 hover:text-black transition-colors relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1 right-1 block h-2 w-2 bg-green-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-500 hover:text-black transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 text-gray-700 hover:text-black transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium tracking-wide">
                Sophie
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-none shadow-2xl border border-gray-100 z-50">
                <div className="py-2">
                  <a
                    href="#"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 tracking-wide"
                  >
                    Profile Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 tracking-wide"
                  >
                    Account Preferences
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 tracking-wide"
                  >
                    Security Settings
                  </a>
                  <hr className="my-2 border-gray-100" />
                  <a
                    href="#"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 tracking-wide"
                  >
                    Sign Out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// =============================================================================
// Stats Cards Component
// =============================================================================

interface StatCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  subtitle: string;
  icon: React.ComponentType<any>;
  gradient: string;
}

const statsData: StatCardData[] = [
  {
    id: "revenue",
    title: "Monthly Revenue",
    value: "€2.4M",
    change: "12.5%",
    trend: "up",
    subtitle: "vs last month",
    icon: DollarSign,
    gradient: "from-yellow-500 to-yellow-600",
  },
  {
    id: "orders",
    title: "Total Orders",
    value: "3,847",
    change: "8.2%",
    trend: "up",
    subtitle: "vs last month",
    icon: ShoppingCart,
    gradient: "from-black to-gray-800",
  },
  {
    id: "customers",
    title: "Active Customers",
    value: "12,459",
    change: "15.3%",
    trend: "up",
    subtitle: "vs last month",
    icon: UserCheck,
    gradient: "from-gray-600 to-gray-700",
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    value: "3.24%",
    change: "2.1%",
    trend: "up",
    subtitle: "vs last month",
    icon: Target,
    gradient: "from-yellow-600 to-yellow-700",
  },
];

interface StatCardProps {
  data: StatCardData;
}

const StatCard: React.FC<StatCardProps> = ({ data }) => {
  const TrendIcon = data.trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = data.trend === "up" ? "text-green-600" : "text-red-600";
  const trendBg = data.trend === "up" ? "bg-green-50" : "bg-red-50";
  const Icon = data.icon;

  return (
    <div className="bg-white rounded-none shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2 tracking-wide uppercase">
            {data.title}
          </p>
          <p
            className="text-3xl font-bold text-black mb-3 tracking-tight"
            style={{ fontFamily: "serif" }}
          >
            {data.value}
          </p>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${trendBg} ${trendColor}`}
          >
            <TrendIcon className="w-3 h-3 mr-1" />
            {data.change} {data.subtitle}
          </div>
        </div>
        <div
          className={`w-14 h-14 bg-gradient-to-r ${data.gradient} rounded-full flex items-center justify-center ml-6 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
};

interface StatsCardsProps {
  className?: string;
}

const StatsCards: React.FC<StatsCardsProps> = ({ className = "" }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${className}`}
    >
      {statsData.map((stat) => (
        <StatCard key={stat.id} data={stat} />
      ))}
    </div>
  );
};

// =============================================================================
// Top Collections Component
// =============================================================================

const topCollections: Product[] = [
  {
    id: "1",
    name: "Lady Dior Handbag",
    category: "Handbags",
    price: "€4,500",
    sales: 145,
    revenue: "€652,500",
    stock: 12,
    status: "low-stock",
    image: "👜",
  },
  {
    id: "2",
    name: "J'adore Fragrance",
    category: "Fragrances",
    price: "€95",
    sales: 892,
    revenue: "€84,740",
    stock: 234,
    status: "in-stock",
    image: "🌸",
  },
  {
    id: "3",
    name: "Dior Oblique Scarf",
    category: "Accessories",
    price: "€590",
    sales: 67,
    revenue: "€39,530",
    stock: 0,
    status: "out-of-stock",
    image: "🧣",
  },
  {
    id: "4",
    name: "Saddle Bag",
    category: "Handbags",
    price: "€3,200",
    sales: 89,
    revenue: "€284,800",
    stock: 28,
    status: "in-stock",
    image: "👜",
  },
];

interface TopCollectionsProps {
  className?: string;
}

const TopCollections: React.FC<TopCollectionsProps> = ({ className = "" }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "low-stock":
        return "bg-yellow-100 text-yellow-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in-stock":
        return "In Stock";
      case "low-stock":
        return "Low Stock";
      case "out-of-stock":
        return "Out of Stock";
      default:
        return "Unknown";
    }
  };

  return (
    <div
      className={`bg-white rounded-none shadow-sm border border-gray-100 p-8 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3
          className="text-xl font-semibold text-black tracking-wide"
          style={{ fontFamily: "serif" }}
        >
          Top Collections
        </h3>
        <button className="p-2 text-gray-400 hover:text-black transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Products List */}
      <div className="space-y-6">
        {topCollections.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center space-x-6 p-4 hover:bg-gray-50 rounded-none transition-colors border-l-2 border-transparent hover:border-l-2 hover:border-yellow-500"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xl">{product.image}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-black tracking-wide">
                {product.name}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                {product.category}
              </p>
              <div className="mt-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    product.status
                  )}`}
                >
                  {getStatusText(product.status)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p
                className="text-lg font-bold text-black"
                style={{ fontFamily: "serif" }}
              >
                {product.revenue}
              </p>
              <p className="text-xs text-gray-500">{product.sales} sold</p>
              <p className="text-xs text-gray-400 mt-1">
                Stock: {product.stock}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <Button variant="outline" className="w-full">
          View All Collections
        </Button>
      </div>
    </div>
  );
};

// =============================================================================
// Customer Analytics Component
// =============================================================================

const customerMetrics: CustomerMetric[] = [
  {
    id: "new",
    label: "New Customers",
    value: "1,247",
    percentage: 85,
    color: "bg-yellow-500",
    icon: UserCheck,
  },
  {
    id: "returning",
    label: "Returning Customers",
    value: "3,892",
    percentage: 92,
    color: "bg-black",
    icon: Users,
  },
  {
    id: "vip",
    label: "VIP Members",
    value: "156",
    percentage: 68,
    color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    icon: Crown,
  },
];

interface CustomerAnalyticsProps {
  className?: string;
}

const CustomerAnalytics: React.FC<CustomerAnalyticsProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-none shadow-sm border border-gray-100 p-8 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3
          className="text-xl font-semibold text-black tracking-wide"
          style={{ fontFamily: "serif" }}
        >
          Customer Analytics
        </h3>
        <button className="p-2 text-gray-400 hover:text-black transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Customer Stats */}
      <div className="space-y-8">
        {customerMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 ${metric.color} rounded-full flex items-center justify-center`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-black tracking-wide">
                    {metric.label}
                  </span>
                </div>
                <span
                  className="text-lg font-bold text-black"
                  style={{ fontFamily: "serif" }}
                >
                  {metric.value}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${metric.color} transition-all duration-500`}
                  style={{ width: `${metric.percentage}%` }}
                ></div>
              </div>
              <div className="mt-1 text-right">
                <span className="text-xs text-gray-500">
                  {metric.percentage}% of target
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-10 pt-8 border-t border-gray-100">
        <div className="text-center">
          <p
            className="text-3xl font-bold text-black"
            style={{ fontFamily: "serif" }}
          >
            5,295
          </p>
          <p className="text-sm text-gray-600 tracking-wide uppercase">
            Total Active Customers
          </p>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// Revenue Chart Component
// =============================================================================

interface RevenueData {
  period: string;
  amount: string;
  rawAmount: number;
  color: string;
}

const revenueData: RevenueData[] = [
  {
    period: "Current Quarter",
    amount: "€7.2M",
    rawAmount: 7200000,
    color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
  },
  {
    period: "Previous Quarter",
    amount: "€6.8M",
    rawAmount: 6800000,
    color: "bg-black",
  },
  {
    period: "Target",
    amount: "€8.0M",
    rawAmount: 8000000,
    color: "bg-gray-400",
  },
];

interface RevenueChartProps {
  className?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ className = "" }) => {
  const maxAmount = Math.max(...revenueData.map((d) => d.rawAmount));

  return (
    <div
      className={`bg-white rounded-none shadow-sm border border-gray-100 p-8 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3
          className="text-xl font-semibold text-black tracking-wide"
          style={{ fontFamily: "serif" }}
        >
          Quarterly Revenue
        </h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-black transition-colors">
            <Calendar className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-black transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-black transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Revenue Bars */}
      <div className="space-y-6">
        {revenueData.map((item, index) => (
          <div key={item.period} className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-black tracking-wide">
                {item.period}
              </span>
              <span
                className="text-lg font-bold text-black"
                style={{ fontFamily: "serif" }}
              >
                {item.amount}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-none h-4">
              <div
                className={`h-4 rounded-none ${item.color} transition-all duration-700`}
                style={{
                  width: `${(item.rawAmount / maxAmount) * 100}%`,
                  animationDelay: `${index * 300}ms`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Revenue Summary */}
      <div className="mt-10 pt-8 border-t border-gray-100 text-center">
        <p
          className="text-4xl font-bold text-black mb-2"
          style={{ fontFamily: "serif" }}
        >
          €22.0M
        </p>
        <p className="text-sm text-gray-600 tracking-wide uppercase">
          Annual Revenue Target
        </p>
      </div>
    </div>
  );
};

// =============================================================================
// Recent Orders Component
// =============================================================================

const recentOrders: Order[] = [
  {
    id: "ORD-2024-001",
    customer: "Isabella Rodriguez",
    items: 3,
    total: "€8,750",
    status: "delivered",
    date: "2024-01-15",
    priority: "high",
  },
  {
    id: "ORD-2024-002",
    customer: "Charlotte Chen",
    items: 1,
    total: "€4,500",
    status: "shipped",
    date: "2024-01-14",
    priority: "medium",
  },
  {
    id: "ORD-2024-003",
    customer: "Sophia Williams",
    items: 2,
    total: "€2,850",
    status: "processing",
    date: "2024-01-14",
    priority: "low",
  },
  {
    id: "ORD-2024-004",
    customer: "Emma Thompson",
    items: 5,
    total: "€12,300",
    status: "pending",
    date: "2024-01-13",
    priority: "high",
  },
];

interface RecentOrdersProps {
  className?: string;
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ className = "" }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`bg-white rounded-none shadow-sm border border-gray-100 p-8 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3
          className="text-xl font-semibold text-black tracking-wide"
          style={{ fontFamily: "serif" }}
        >
          Recent Orders
        </h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-black transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-black transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-none transition-colors border-l-2 border-transparent hover:border-l-2 hover:border-yellow-500"
          >
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-black tracking-wide">
                  {order.id}
                </span>
                <span className="text-xs text-gray-500">{order.customer}</span>
              </div>
              <div className="flex space-x-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                    order.priority
                  )}`}
                >
                  {order.priority}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p
                className="text-sm font-bold text-black"
                style={{ fontFamily: "serif" }}
              >
                {order.total}
              </p>
              <p className="text-xs text-gray-500">{order.items} items</p>
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <Button variant="outline" className="w-full">
          View All Orders
        </Button>
      </div>
    </div>
  );
};

// =============================================================================
// Market Insights Component
// =============================================================================

interface MarketInsight {
  id: string;
  title: string;
  description: string;
  trend: "up" | "down" | "stable";
  value: string;
  category: string;
  timestamp: string;
}

const marketInsights: MarketInsight[] = [
  {
    id: "1",
    title: "Luxury Handbag Demand",
    description:
      "Significant increase in premium handbag sales across all demographics",
    trend: "up",
    value: "+24%",
    category: "Product Category",
    timestamp: "2h ago",
  },
  {
    id: "2",
    title: "Fragrance Market Growth",
    description: "J'adore fragrance line showing exceptional performance",
    trend: "up",
    value: "+18%",
    category: "Product Performance",
    timestamp: "4h ago",
  },
  {
    id: "3",
    title: "Seasonal Accessories",
    description: "Winter collection accessories experiencing seasonal peak",
    trend: "stable",
    value: "0%",
    category: "Seasonal Trends",
    timestamp: "6h ago",
  },
];

interface MarketInsightsProps {
  className?: string;
}

const MarketInsights: React.FC<MarketInsightsProps> = ({ className = "" }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      className={`bg-white rounded-none shadow-sm border border-gray-100 p-8 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3
          className="text-xl font-semibold text-black tracking-wide"
          style={{ fontFamily: "serif" }}
        >
          Market Insights
        </h3>
        <button className="p-2 text-gray-400 hover:text-black transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Insights List */}
      <div className="space-y-6">
        {marketInsights.map((insight) => (
          <div
            key={insight.id}
            className="p-6 border border-gray-100 hover:border-yellow-500 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getTrendIcon(insight.trend)}
                  <h4 className="text-sm font-semibold text-black tracking-wide">
                    {insight.title}
                  </h4>
                  <span
                    className={`text-sm font-bold ${getTrendColor(
                      insight.trend
                    )}`}
                  >
                    {insight.value}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {insight.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    {insight.category}
                  </span>
                  <span>{insight.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <Button variant="outline" className="w-full">
          View Detailed Analytics
        </Button>
      </div>
    </div>
  );
};

// =============================================================================
// Main Dashboard Component
// =============================================================================

const Dashboard: React.FC = () => {
  const {
    user,
    notifications,
    sidebarExpanded,
    toggleSidebar,
    toggleDarkMode,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar expanded={sidebarExpanded} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarExpanded ? "ml-72" : "ml-20"
        }`}
      >
        {/* Header */}
        <Header
          onToggleSidebar={toggleSidebar}
          sidebarExpanded={sidebarExpanded}
        />

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Page Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className="text-4xl font-bold text-black mb-2 tracking-wide"
                  style={{ fontFamily: "serif" }}
                >
                  Maison Dashboard
                </h1>
                <p className="text-gray-600 text-lg tracking-wide">
                  Welcome back, Sophie. Here's your luxury brand performance
                  overview.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Export Report
                </Button>
                <Button
                  variant="luxury"
                  leftIcon={<RefreshCw className="w-4 h-4" />}
                >
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards className="mb-12" />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Customer Analytics - Takes 1 column */}
            <div className="lg:col-span-1">
              <CustomerAnalytics />
            </div>

            {/* Revenue Chart - Takes 2 columns */}
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
          </div>

          {/* Secondary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {/* Top Collections */}
            <div className="xl:col-span-1">
              <TopCollections />
            </div>

            {/* Recent Orders */}
            <div className="xl:col-span-1">
              <RecentOrders />
            </div>

            {/* Market Insights */}
            <div className="xl:col-span-1">
              <MarketInsights />
            </div>
          </div>

          {/* Bottom Section - Additional Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions Panel */}
            <div className="bg-white rounded-none shadow-sm border border-gray-100 p-8">
              <h3
                className="text-xl font-semibold text-black mb-6 tracking-wide"
                style={{ fontFamily: "serif" }}
              >
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-16 flex-col">
                  <Package className="w-5 h-5 mb-1" />
                  <span className="text-xs">Add Product</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <Users className="w-5 h-5 mb-1" />
                  <span className="text-xs">Manage Customers</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <BarChart3 className="w-5 h-5 mb-1" />
                  <span className="text-xs">View Reports</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <Settings className="w-5 h-5 mb-1" />
                  <span className="text-xs">Settings</span>
                </Button>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-none shadow-sm p-8">
              <h3
                className="text-xl font-semibold mb-6 tracking-wide"
                style={{ fontFamily: "serif" }}
              >
                Performance Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 tracking-wide">
                    Sales Target Achievement
                  </span>
                  <span className="text-yellow-500 font-bold">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 tracking-wide">
                    Customer Satisfaction
                  </span>
                  <span className="text-green-400 font-bold">96%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 tracking-wide">
                    Inventory Turnover
                  </span>
                  <span className="text-blue-400 font-bold">4.2x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 tracking-wide">
                    Brand Recognition
                  </span>
                  <span className="text-yellow-500 font-bold">Excellent</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-700">
                <Button
                  variant="outline"
                  className="w-full text-white border-white hover:bg-white hover:text-black"
                >
                  View Detailed Performance
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
