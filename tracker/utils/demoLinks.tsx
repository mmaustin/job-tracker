import { AreaChart, Layers, AppWindow, House} from 'lucide-react';
// import { FaHome } from 'react-icons/fa';

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
    label: 'home',
    icon: <House />,
  }
];