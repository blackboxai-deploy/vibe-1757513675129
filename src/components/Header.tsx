'use client';

import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/format-utils';
import { formatDate, formatDisplayDate } from '@/lib/date-utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  showDate?: boolean;
  stats?: Array<{
    label: string;
    value: string | number;
    trend?: 'up' | 'down' | 'stable';
    badge?: boolean;
  }>;
}

export function Header({ 
  title, 
  subtitle, 
  actions, 
  showDate = true,
  stats 
}: HeaderProps) {
  const today = new Date();
  
  return (
    <div className="bg-white border-b border-gray-200 mb-6 -mx-6 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
              )}
              {showDate && (
                <p className="text-sm text-gray-500 mt-1">
                  {formatDisplayDate(formatDate(today))}
                </p>
              )}
            </div>
            
            {stats && stats.length > 0 && (
              <div className="hidden md:flex items-center space-x-4 ml-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{stat.label}</span>
                      {stat.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {typeof stat.value === 'number' ? stat.value : stat.value}
                        </Badge>
                      )}
                    </div>
                    {!stat.badge && (
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="font-semibold text-lg text-gray-900">
                          {typeof stat.value === 'number' 
                            ? formatCurrency(stat.value) 
                            : stat.value
                          }
                        </span>
                        {stat.trend && (
                          <span className={`text-xs ${
                            stat.trend === 'up' 
                              ? 'text-green-600' 
                              : stat.trend === 'down' 
                                ? 'text-red-600' 
                                : 'text-gray-500'
                          }`}>
                            {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {actions && (
          <div className="flex items-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

interface QuickStatsProps {
  stats: Array<{
    label: string;
    value: number;
    icon: string;
    change?: {
      value: number;
      trend: 'up' | 'down' | 'stable';
    };
  }>;
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(stat.value)}
              </p>
              {stat.change && (
                <div className="flex items-center mt-1">
                  <span className={`text-sm ${
                    stat.change.trend === 'up' 
                      ? 'text-green-600' 
                      : stat.change.trend === 'down' 
                        ? 'text-red-600' 
                        : 'text-gray-500'
                  }`}>
                    {stat.change.trend === 'up' ? '↗' : stat.change.trend === 'down' ? '↘' : '→'}
                    {' '}{Math.abs(stat.change.value)}%
                  </span>
                </div>
              )}
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}