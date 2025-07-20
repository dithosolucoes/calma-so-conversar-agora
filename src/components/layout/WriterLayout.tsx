
import { WriterSidebar } from './WriterSidebar';

interface WriterLayoutProps {
  children: React.ReactNode;
}

export const WriterLayout = ({ children }: WriterLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <WriterSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};
