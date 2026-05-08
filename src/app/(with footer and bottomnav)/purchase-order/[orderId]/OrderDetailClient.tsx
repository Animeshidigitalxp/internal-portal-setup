'use client';

import { getOrderDetail } from '../data/purchaseOrderData';
import OrderDetailHeader from './Components/OrderDetailHeader/OrderDetailHeader';
import OrderStatsBar from './Components/OrderStatsBar/OrderStatsBar';
import AlertBanner from './Components/AlertBanner/AlertBanner';
import OrderTimeline from './Components/OrderTimeline/OrderTimeline';
import BusinessSummary from './Components/BusinessSummary/BusinessSummary';
import DeviceSKU from './Components/DeviceSKU/DeviceSKU';
import ActivityLog from './Components/ActivityLog/ActivityLog';
import styles from './OrderDetailClient.module.sass';

export default function OrderDetailClient({ orderId }: { orderId: string }) {
  const order = getOrderDetail(orderId);

  if (!order) {
    return (
      <div style={{ padding: '2rem 1.5rem', color: '#6b7280' }}>
        Order <strong>{orderId}</strong> not found.
      </div>
    );
  }

  const vendorCost = order.Qty * order.UnitPrice;

  return (
    <div className={styles.wrapper}>
      <OrderDetailHeader
        customer={order.Customer}
        poNumber={order.Order}
        deviceName={order.DeviceName}
        vendor={order.Vendor}
        orderStatus={order.OrderStatus}
        riskStatus={order.RiskStatus}
        haloSO={order.HaloSO}
      />

      <OrderStatsBar
        timeSince={order.TimeSince}
        expected={order.Expected}
        totalValue={vendorCost}
        margin={order.Margin}
      />

      {order.AlertMessage && (
        <AlertBanner
          message={order.AlertMessage}
          subText={order.AlertSubText}
          type={order.AlertType!}
        />
      )}

      <div className={styles.mainGrid}>
        <OrderTimeline steps={order.Timeline} updatedAt={order.TimeSince} />
        <BusinessSummary
          qty={order.Qty}
          unitPrice={order.UnitPrice}
          margin={order.Margin}
        />
      </div>

      <DeviceSKU
        deviceName={order.DeviceName}
        sku={order.SKU}
        model={order.Model}
        qty={order.Qty}
        unitPrice={order.UnitPrice}
      />

      <ActivityLog items={order.Activity} />
    </div>
  );
}
