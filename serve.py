import http.server
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

http.server.test(HandlerClass=Handler, port=3456, bind="127.0.0.1")
