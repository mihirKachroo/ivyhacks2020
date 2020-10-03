#Effectively a shortcut for quick running
all:
	@node server.js

httpposttest:
	g++ -o main httpserver.cpp -lpthread

db:
	@make -i dbi

dbi:
	@mv ivyhacks.db oldivyhacks.db
	@node createdatabase.js

sq:
	@sqlite3 ivyhacks.db

test:
	@node test.js
