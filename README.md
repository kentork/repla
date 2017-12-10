# repla

Repl on you local

# Development

```sh
# build
docker build -t repla .

# run server localhost:7070
docker run -it -p "7070:7070" -v "/var/run/docker.sock:/var/run/docker.sock" -v "${pwd}:/src" repla /bin/sh
```

# License

This project is licensed under the MIT License.

Copyright (c) 2017 kentork.
