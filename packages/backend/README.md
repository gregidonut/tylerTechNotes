# local supabase for dev

make sure proxy socket is running:

https://github.com/supabase/cli/issues/2588#issuecomment-3186001879

> 1. Running this first to create a proxy socket:
>
> ```sh
> sudo socat UNIX-LISTEN:/var/run/docker.sock,fork,user=$USER,group=docker,mode=660 UNIX-CONNECT:$HOME/.docker/desktop/docker.sock
> ```
>
> 2. Starting supabase using:
>
> ```sh
> DOCKER_HOST=unix:///var/run/docker.sock supabase start
> ```

run:

```sh
bun run shell src/sb start --stage dev
```

might need to setup a more robust pass through for to the actual supabase cli

args:

```ts
import("@/utils/envBuilder.ts").cmd;
```

delete volumes:

```sh
docker volume rm -f $(docker volume ls -q --filter label=com.supabase.cli.project=backend)
```
