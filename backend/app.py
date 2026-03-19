import tornado.web
import tornado.ioloop


from handlers.user_handler import RegisterHandler
from handlers.auth_handler import LoginHandler
from handlers.match_handler import SearchHandler

def makeapp():
    return tornado.web.Application([
        (r'/register',RegisterHandler),
        (r'/login',LoginHandler),
        (r'/search',SearchHandler)
    ])

if __name__=="__main__":
    app=makeapp()
    app.listen(8888)
    print("Server running http://localhost:8888")
    tornado.ioloop.IOLoop.current().start()