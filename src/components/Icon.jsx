import {
  BookOpen,
  Globe,
  AlertTriangle,
  Cross,
  Heart,
  Sprout,
  Crown,
  Flame,
  Wind,
  Users,
  Map,
  Route,
  ClipboardList,
  HandHeart,
  Shield,
  Footprints,
  Award,
  Star,
  Zap,
  Sun,
  GraduationCap,
} from "lucide-react";

const MAP = {
  book: BookOpen,
  globe: Globe,
  alert: AlertTriangle,
  cross: Cross,
  heart: Heart,
  sprout: Sprout,
  crown: Crown,
  flame: Flame,
  wind: Wind,
  users: Users,
  map: Map,
  path: Route,
  clipboard: ClipboardList,
  hand: HandHeart,
  shield: Shield,
  footprints: Footprints,
  award: Award,
  star: Star,
  zap: Zap,
  sun: Sun,
  graduation: GraduationCap,
};

export function Icon({ name, size = 24, className = "" }) {
  const Cmp = MAP[name] || BookOpen;
  return <Cmp size={size} className={className} aria-hidden="true" />;
}
