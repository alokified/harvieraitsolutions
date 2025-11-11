import {
  Cloud,
  Code,
  Database,
  Shield,
  Workflow,
  Users,
  Server,
  Smartphone,
  Briefcase,
  Heart,
  Building,
  ShoppingCart,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Code,
  Database,
  Shield,
  Workflow,
  Users,
  Server,
  Smartphone,
  Briefcase,
  Heart,
  Building,
  ShoppingCart,
  GraduationCap,
};

export function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName) return Code; // Default fallback
  return iconMap[iconName] || Code;
}
