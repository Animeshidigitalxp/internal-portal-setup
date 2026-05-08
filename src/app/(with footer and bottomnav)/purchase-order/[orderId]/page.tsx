import ResetFullPageLoader from '../../../components/FullPageLoader/ResetFullPageLoader';
import OrderDetailClient from './OrderDetailClient';

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return (
    <>
      <ResetFullPageLoader />
      <OrderDetailClient orderId={orderId} />
    </>
  );
}
