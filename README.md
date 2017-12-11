# repla

Repl on you local

# Development

```sh
# build
docker build -t repla .

# attach container
docker run -it -p "7070:7070" -v "/var/run/docker.sock:/var/run/docker.sock" -v "${pwd}:/src" repla /bin/sh

# run server localhost:7070
docker run -d -p "7070:7070" -v "/var/run/docker.sock:/var/run/docker.sock" -v "${pwd}:/src" repla /bin/sh -c "node index.js"
```

# License

This project is licensed under the MIT License.

Copyright (c) 2017 kentork.
