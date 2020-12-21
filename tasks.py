import os
from invoke import task

code_dir = os.getenv("CODE_DIR", "/Users/cesar/code")


@task
def build_protobuf(c):
    # Build the JS for the macondo proto.
    c.run(
        "protoc "
        '--plugin="protoc-gen-ts=liwords-ui/node_modules/.bin/protoc-gen-ts" '
        "--ts_out=liwords-ui/src/gen "
        "--js_out=import_style=commonjs,binary:liwords-ui/src/gen "
        f"--proto_path={code_dir} macondo/api/proto/macondo/macondo.proto"
    )
    # Build the liwords proto files.
    twirp_apis = [
        "user_service",
        "game_service",
        "config_service",
        "tournament_service",
    ]
    for tapi in twirp_apis:
        c.run(
            "protoc "
            f"--twirp_out=rpc --go_out=rpc "
            f"--proto_path={code_dir}/ --proto_path={code_dir}/liwords "
            "--go_opt=paths=source_relative "
            "--twirp_opt=paths=source_relative "
            f"api/proto/{tapi}/{tapi}.proto"
        )
    # create some typescript proto files.
    ts_apis = ["game_service", "user_service"]
    for tapi in ts_apis:
        c.run(
            "protoc "
            '--plugin="protoc-gen-ts=liwords-ui/node_modules/.bin/protoc-gen-ts" '
            "--js_out=import_style=commonjs,binary:liwords-ui/src/gen "
            f"--ts_out=liwords-ui/src/gen --proto_path={code_dir}/ "
            f"--proto_path={code_dir}/liwords "
            f"api/proto/{tapi}/{tapi}.proto"
        )

    c.run(
        "protoc "
        f"--go_out=rpc "
        f"--proto_path={code_dir}/liwords "
        "--go_opt=paths=source_relative "
        "api/proto/realtime/ipc.proto"
    )
    c.run(
        "protoc "
        '--plugin="protoc-gen-ts=liwords-ui/node_modules/.bin/protoc-gen-ts" '
        f"--go_out=rpc "
        "--js_out=import_style=commonjs,binary:liwords-ui/src/gen "
        f"--ts_out=liwords-ui/src/gen --proto_path={code_dir}/ "
        f"--proto_path={code_dir}/liwords "
        "--go_opt=paths=source_relative "
        "api/proto/realtime/realtime.proto"
    )

    # Prepend line to disable eslint to generated files. It doesn't work
    # if I put them in the .eslintignore file for some reason.
    for gen_filename in (
        "liwords-ui/src/gen/macondo/api/proto/macondo/macondo_pb.js",
        "liwords-ui/src/gen/api/proto/realtime/realtime_pb.js",
        "liwords-ui/src/gen/api/proto/user_service/user_service_pb.js",
        "liwords-ui/src/gen/api/proto/game_service/game_service_pb.js",
    ):
        tmp = c.run("mktemp").stdout.strip()
        c.run(r'printf "/* eslint-disable */\n" > ' + tmp)
        c.run(f"cat {gen_filename} >> " + tmp)
        c.run(f"mv {tmp} {gen_filename}")
