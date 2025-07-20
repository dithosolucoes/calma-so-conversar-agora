
import { useState } from 'react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { HojeTela } from '@/components/telas/HojeTela';
import { CrescimentoTela } from '@/components/telas/CrescimentoTela';
import { PerfilTela } from '@/components/telas/PerfilTela';

export const AppDevocional = () => {
  const [activeTab, setActiveTab] = useState<'hoje' | 'crescimento' | 'perfil'>('hoje');

  const renderTela = () => {
    switch (activeTab) {
      case 'hoje':
        return <HojeTela />;
      case 'crescimento':
        return <CrescimentoTela />;
      case 'perfil':
        return <PerfilTela />;
      default:
        return <HojeTela />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Conteúdo Principal */}
      <div className="min-h-screen">
        {renderTela()}
      </div>

      {/* Navegação Inferior Fixa */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
};
