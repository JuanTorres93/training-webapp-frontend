export default function lastPaymentExpired(lastPayment, navigate = undefined) {
  // Check if the last payment.next_payment_date is less than the current date plus 1 day
  const currentDate = new Date();
  const nextPaymentDate = new Date(lastPayment.next_payment_date);
  const nextPaymentDatePlusOneDay = new Date(
    nextPaymentDate.getTime() + 24 * 60 * 60 * 1000
  );

  // If the next payment date is less than the current date plus 1 day
  if (nextPaymentDatePlusOneDay <= currentDate) {
    // If it is, navigate to the payment page
    if (navigate) {
      navigate("/app/subscriptions");
    }

    return true;
  }

  return false;
}
