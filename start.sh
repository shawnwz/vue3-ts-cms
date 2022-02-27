# determine the directory of this script
DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi

# set up environmental variable files
STACK_ENV_FILE=$DIR/../mofa-localstack/.env
LOCAL_ENV_FILE=$DIR/.env

# declare network
NETWORK=mofa-network

# set container name
CONTAINER_NAME=$(cd -P -- "$(dirname -- "$0")" && printf '%s\n' "$(pwd -P)/$(basename -- "$0")")
CONTAINER_NAME=$(basename "${CONTAINER_NAME%/*}")

# remove a legacy Docker image
docker rm --force $CONTAINER_NAME

# build a new Docker image named after the directory
DOCKER_BUILDKIT=1 docker build --no-cache --tag $CONTAINER_NAME:dev .

# start a container with the image
docker run \
	--rm \
	--detach \
	--name $CONTAINER_NAME \
	--network=$NETWORK \
	-p 8209:80 \
	--env-file $STACK_ENV_FILE \
	--env-file $LOCAL_ENV_FILE \
	$CONTAINER_NAME:dev

