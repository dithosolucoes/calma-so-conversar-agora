
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  ShoppingBag, 
  Palette, 
  Settings,
  LogOut,
  PenTool
} from 'lucide-react';
import { useWriterAuth } from '@/contexts/WriterAuthContext';
import { cn } from '@/lib/utils';

const menuItems = [
  { title: 'Dashboard', url: '/escritor/dashboard', icon: LayoutDashboard },
  { title: 'Biblioteca', url: '/escritor/biblioteca', icon: BookOpen },
  { title: 'Templates', url: '/escritor/templates', icon: Palette },
  { title: 'Produtos', url: '/escritor/produtos', icon: ShoppingBag },
  { title: 'Configurações', url: '/escritor/configuracoes', icon: Settings },
];

export const WriterSidebar = () => {
  const { writer, logout } = useWriterAuth();
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
            <PenTool size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-semibold gradient-text">Escritor</h2>
            <p className="text-sm text-muted-foreground">{writer?.nome}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )
            }
          >
            <item.icon size={20} />
            {item.title}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors w-full"
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </div>
  );
};
