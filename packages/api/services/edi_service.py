from datetime import datetime

def generate_edi_850(order_id: str, items: list):
    """Simulate EDI 850 Purchase Order"""
    return {
        "transaction_set": "850",
        "order_id": order_id,
        "items": items,
        "timestamp": datetime.utcnow().isoformat(),
        "status": "SENT_TO_SUPPLIER"
    }

def generate_edi_855(order_id: str):
    """Simulate EDI 855 Purchase Order Acknowledgment"""
    return {
        "transaction_set": "855",
        "order_id": order_id,
        "acknowledgment": "ACCEPTED",
        "timestamp": datetime.utcnow().isoformat()
    }
