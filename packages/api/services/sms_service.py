import os
from twilio.rest import Client

TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.environ.get("TWILIO_PHONE_NUMBER")

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN) if TWILIO_ACCOUNT_SID else None

def send_failure_alert(phone: str, vehicle_plate: str, component: str, days_to_failure: int):
    if not client:
        print("Twilio client not initialized.")
        return
    
    message = f"URGENT: Nerve AI Alert. Vehicle {vehicle_plate} shows impending failure in {component} within {days_to_failure} days. Please schedule maintenance."
    try:
        msg = client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=phone
        )
        return msg.sid
    except Exception as e:
        print(f"Error sending SMS: {e}")
        return None
