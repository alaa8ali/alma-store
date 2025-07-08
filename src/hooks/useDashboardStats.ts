import { useMemo } from 'react';
import { Order, Product, DashboardStats } from '../types';

export const useDashboardStats = (orders: Order[], products: Product[]): DashboardStats => {
  return useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Today's orders and revenue
    const todayOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    });

    const todayRevenue = todayOrders
      .filter(order => order.status === 'delivered')
      .reduce((sum, order) => sum + order.total, 0);

    // Total stats
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter(order => order.status === 'delivered')
      .reduce((sum, order) => sum + order.total, 0);

    // Top products by sales
    const productSales = new Map<string, { count: number; revenue: number }>();
    
    orders.forEach(order => {
      if (order.status === 'delivered') {
        order.items.forEach(item => {
          const current = productSales.get(item.id) || { count: 0, revenue: 0 };
          productSales.set(item.id, {
            count: current.count + item.quantity,
            revenue: current.revenue + (item.price * item.quantity)
          });
        });
      }
    });

    const topProducts = Array.from(productSales.entries())
      .map(([productId, sales]) => {
        const product = products.find(p => p.id === productId);
        return product ? {
          product,
          salesCount: sales.count,
          revenue: sales.revenue
        } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b!.salesCount - a!.salesCount)
      .slice(0, 5) as DashboardStats['topProducts'];

    // Low stock products (less than 10 items)
    const lowStockProducts = products.filter(product => 
      (product.stockQuantity || 0) < 10 && product.inStock
    );

    // Recent orders (last 10)
    const recentOrders = [...orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    // Orders by status
    const ordersByStatus = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<Order['status'], number>);

    // Monthly revenue (last 6 months)
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= monthStart && orderDate <= monthEnd && order.status === 'delivered';
      });

      monthlyRevenue.push({
        month: date.toLocaleDateString('ar-SA', { month: 'long' }),
        revenue: monthOrders.reduce((sum, order) => sum + order.total, 0),
        orders: monthOrders.length
      });
    }

    return {
      todayOrders: todayOrders.length,
      todayRevenue,
      totalOrders,
      totalRevenue,
      topProducts,
      lowStockProducts,
      recentOrders,
      ordersByStatus,
      monthlyRevenue
    };
  }, [orders, products]);
}; 
