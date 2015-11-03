import Tkinter
import json
import sys
import threading

class WindowServer(object):
  def __init__(self):
    self.root = Tkinter.Tk()
    self.widgets = {}

  def run(self):
    t = threading.Thread(target=self.command_loop)
    t.setDaemon(True)
    t.start()
    self.root.mainloop()

  def command_loop(self):
    # CRUD interface for widgets
    # - creating a widget
    # - removing a widget
    # - configure() any widget

    # - listen for events, send them back

    while True:
      line = sys.stdin.readline()
      if line.strip() == '':
        continue
      message = json.loads(line)

      # Client -> Server
      # {"type": "create", "widgetType": "Label", "key": "xyz"}
      # {"type": "delete", "key": "xyz"}
      # {"type": "configure", "key": "xyz", "properties": {...}}
      # {"type": "grid", "key": "xyz", "properties": {...}}
      # {"type": "listen", "key": "xyz", "eventSelector": "<Button-1>"}

      # Server -> Client
      # {"type": "event", "key": "xyz", "eventSelector": "<Button-1>", "eventObject": {...}}

      message_type = message['type']
      widget_key = message['key']
      if message_type == 'create':
        widget_type = getattr(Tkinter, message['widgetType'])
        self.widgets[widget_key] = widget_type(self.root)
      elif message_type == 'delete':
        self.widgets[widget_key].destroy()
        del self.widgets[widget_key]
      elif message_type == 'configure':
        self.widgets[widget_key].configure(**message['properties'])
      elif message_type == 'grid':
        self.widgets[widget_key].grid(**message['properties'])
      elif message_type == 'listen':
        self.widgets[widget_key].bind(
          message['eventSelector'],
          lambda event: self.handle_event(widget_key, message['eventSelector'], event)
        )

  def handle_event(self, widget_key, event_selector, event):
    print json.dumps({
      "type": "event",
      "key": widget_key,
      "eventSelector": event_selector,
      "eventObject": self.serialize_event(event),
    })

  def serialize_event(self, event):
    # TODO
    return {}


if __name__ == '__main__':
  WindowServer().run()
