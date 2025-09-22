import api from './api';

// Products API endpoints
export const productsAPI = {
  // Get all products with optional filters
  getAll: (params = {}) => {
    return api.get('/products', { params });
  },

  // Get single product by ID
  getById: (id) => {
    return api.get(`/products/${id}`);
  },

  // Create new product
  create: (productData) => {
    return api.post('/products', productData);
  },

  // Update existing product
  update: (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },

  // Delete product
  delete: (id) => {
    return api.delete(`/products/${id}`);
  },

  // Get low stock products
  getLowStock: () => {
    return api.get('/products/low-stock');
  },

  // Update product stock
  updateStock: (id, stockData) => {
    return api.patch(`/products/${id}/stock`, stockData);
  },

  // Search products
  search: (query) => {
    return api.get(`/products/search?q=${encodeURIComponent(query)}`);
  },
};

// Categories API endpoints
export const categoriesAPI = {
  getAll: () => {
    return api.get('/categories');
  },

  getById: (id) => {
    return api.get(`/categories/${id}`);
  },

  create: (categoryData) => {
    return api.post('/categories', categoryData);
  },

  update: (id, categoryData) => {
    return api.put(`/categories/${id}`, categoryData);
  },

  delete: (id) => {
    return api.delete(`/categories/${id}`);
  },
};

// Dashboard/Stats API endpoints
export const dashboardAPI = {
  getStats: () => {
    return api.get('/dashboard/stats');
  },

  getRecentProducts: () => {
    return api.get('/dashboard/recent-products');
  },

  getLowStockAlerts: () => {
    return api.get('/dashboard/low-stock-alerts');
  },

  getRecentTransactions: () => {
    return api.get('/dashboard/recent-transactions');
  },
};

// Suppliers API endpoints
export const suppliersAPI = {
  getAll: () => {
    return api.get('/suppliers');
  },

  getById: (id) => {
    return api.get(`/suppliers/${id}`);
  },

  create: (supplierData) => {
    return api.post('/suppliers', supplierData);
  },

  update: (id, supplierData) => {
    return api.put(`/suppliers/${id}`, supplierData);
  },

  delete: (id) => {
    return api.delete(`/suppliers/${id}`);
  },
};

// Inventory transactions API endpoints
export const transactionsAPI = {
  getAll: (params = {}) => {
    return api.get('/transactions', { params });
  },

  getById: (id) => {
    return api.get(`/transactions/${id}`);
  },

  create: (transactionData) => {
    return api.post('/transactions', transactionData);
  },

  // Stock in/out operations
  stockIn: (productId, quantity, notes = '') => {
    return api.post('/transactions/stock-in', {
      product_id: productId,
      quantity,
      notes,
    });
  },

  stockOut: (productId, quantity, notes = '') => {
    return api.post('/transactions/stock-out', {
      product_id: productId,
      quantity,
      notes,
    });
  },
};

// Reports API endpoints
export const reportsAPI = {
  getInventoryReport: (params = {}) => {
    return api.get('/reports/inventory', { params });
  },

  getStockMovementReport: (params = {}) => {
    return api.get('/reports/stock-movement', { params });
  },

  getLowStockReport: () => {
    return api.get('/reports/low-stock');
  },

  getValueReport: () => {
    return api.get('/reports/inventory-value');
  },

  exportInventory: (format = 'csv') => {
    return api.get(`/reports/export/inventory?format=${format}`, {
      responseType: 'blob',
    });
  },
};

// Authentication API endpoints
export const authAPI = {
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },

  logout: () => {
    return api.post('/auth/logout');
  },

  register: (userData) => {
    return api.post('/auth/register', userData);
  },

  getProfile: () => {
    return api.get('/auth/profile');
  },

  updateProfile: (profileData) => {
    return api.put('/auth/profile', profileData);
  },

  changePassword: (passwordData) => {
    return api.put('/auth/change-password', passwordData);
  },
};