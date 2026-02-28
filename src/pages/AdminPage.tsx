import { SimplifiedAdminPanel } from "../components/SimplifiedAdminPanel";

interface AdminPageProps {
  onNavigate: (page: string) => void;
  onPostsUpdated?: () => void;
  onLogout: () => void;
}

export function AdminPage({ onNavigate, onLogout }: AdminPageProps) {
  return <SimplifiedAdminPanel onLogout={onLogout} onNavigate={onNavigate} />;
}