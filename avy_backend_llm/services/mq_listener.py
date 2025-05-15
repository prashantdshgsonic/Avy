import stomp
import json

class MQListener(stomp.ConnectionListener):
    def __init__(self, process_callback):
        self.process_callback = process_callback

    def on_message(self, frame):
            try:
                message = json.loads(frame.body)
                self.process_callback(message)
            except json.JSONDecodeError as e:
                 print(f"Invalid message format: {e}")

def start_listener(ACTIVE_MQ_URL, queue, process_callback):
    conn = stomp.Connection12([(ACTIVE_MQ_URL,61613)])
    conn.set_listener("", MQListener(process_callback))
    conn.connect(wait=True)
    conn.subscribe(destination=queue, id=1, ack="auto")
    return conn

def send_message(conn,queue,message):
    conn.send(destination=queue, body=json.dumps(message))