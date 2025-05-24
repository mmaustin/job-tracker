import { AreaChart, Layers, AppWindow, House } from 'lucide-react';

type NavLink = {
  href: string,
  label: string,
  icon: React.ReactNode
};

export const demoLinks: NavLink[] = [
  {
    href: '/demo-add-job',
    label: 'add job',
    icon: <Layers />,
  },
  {
    href: '/demo-jobs',
    label: 'jobs',
    icon: <AppWindow />,
  },
  {
    href: '/demo-stats',
    label: 'stats',
    icon: <AreaChart />,
  },
  {
    href: '/',
    label: 'stats',
    icon: <House />,
  }
];