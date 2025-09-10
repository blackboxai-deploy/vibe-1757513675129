'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getStockAlerts } from '@/lib/calculations';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: '📊',
    description: 'Panel principal'
  },
  {
    title: 'Ventas',
    href: '/ventas',
    icon: '💰',
    description: 'Gestión de ventas'
  },
  {
    title: 'Stock',
    href: '/stock',
    icon: '📦',
    description: 'Control de inventario'
  },
  {
    title: 'Egresos',
    href: '/egresos',
    icon: '📋',
    description: 'Gastos operativos'
  },
  {
    title: 'Reportes',
    href: '/reportes',
    icon: '📈',
    description: 'Análisis y estadísticas'
  },
  {
    title: 'Cierre de Caja',
    href: '/cierre',
    icon: '💳',
    description: 'Balance diario'
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const { state } = useLocalStorage();
  
  // Obtener alertas de stock
  const stockAlerts = getStockAlerts(state.supplies);
  const criticalAlerts = stockAlerts.filter(alert => alert.severity === 'critical').length;
  const lowStockAlerts = stockAlerts.filter(alert => alert.severity === 'low').length;

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P&C</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Print & Co</h1>
            <p className="text-sm text-gray-500">Gestión Integral</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const showStockBadge = item.href === '/stock' && (criticalAlerts > 0 || lowStockAlerts > 0);
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-left p-4 h-auto relative",
                  isActive 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center space-x-3 w-full">
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{item.title}</span>
                      {showStockBadge && (
                        <div className="flex space-x-1">
                          {criticalAlerts > 0 && (
                            <Badge 
                              variant="destructive" 
                              className="text-xs px-1.5 py-0.5 h-5 min-w-5"
                            >
                              {criticalAlerts}
                            </Badge>
                          )}
                          {lowStockAlerts > 0 && (
                            <Badge 
                              variant="secondary" 
                              className="text-xs px-1.5 py-0.5 h-5 min-w-5 bg-yellow-100 text-yellow-800"
                            >
                              {lowStockAlerts}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm truncate mt-0.5",
                      isActive ? "text-blue-100" : "text-gray-500"
                    )}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500">Versión 1.0</p>
          <p className="text-xs text-gray-400 mt-1">© 2024 Print & Co</p>
        </div>
      </div>
    </div>
  );
}