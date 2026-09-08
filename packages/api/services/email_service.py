import os
import resend

RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
resend.api_key = RESEND_API_KEY

def send_order_confirmation(email: str, order_id: str, amount: float, hardware_qty: int):
    try:
        r = resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": email,
            "subject": f"Nerve AI Order Confirmation - {order_id}",
            "html": f"<h1>Thank you for your order!</h1><p>Order ID: {order_id}</p><p>Hardware Quantity: {hardware_qty}</p><p>Total Amount: ${amount}</p>"
        })
        return r
    except Exception as e:
        print(f"Error sending email: {e}")
        return None

def send_failure_alert_email(email: str, vehicle_plate: str, component: str, days_to_failure: int):
    try:
        r = resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": email,
            "subject": f"Nerve AI Alert: Maintenance Required for {vehicle_plate}",
            "html": f"<h2>Maintenance Alert</h2><p>Vehicle {vehicle_plate} has an impending failure in <strong>{component}</strong> within {days_to_failure} days.</p>"
        })
        return r
    except Exception as e:
        print(f"Error sending email: {e}")
        return None
