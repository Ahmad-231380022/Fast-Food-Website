const ROLES = Object.freeze({
  CUSTOMER: 'customer',
  CASHIER: 'cashier',
  MANAGER: 'manager',
  ADMIN: 'admin',
});

const ORDER_STATUS = Object.freeze({
  PENDING: 'pending',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
});

const PAYMENT_METHOD = Object.freeze({
  COD: 'cod',
  CARD: 'card',
});

module.exports = { ROLES, ORDER_STATUS, PAYMENT_METHOD };

