#Effectively a shortcut for quick running
all:
	@node server.js

db:
	@make -i dbi

dbi:
	@mv ivyhacks.db oldivyhacks.db
	@node createdatabase.js

sq:
	@sqlite3 ivyhacks.db
