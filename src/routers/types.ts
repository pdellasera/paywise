export interface NavigationItem {
  name: string;
  path: string;
  icon: string;
  badge?: number;
}

export interface BreadcrumbItem {
  name: string;
  path?: string;
  current: boolean;
}