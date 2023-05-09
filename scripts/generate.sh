
# Generate models from specification
# Make sure Open API specification in specs folder is latest
openapi-generator-cli generate \
		-i specs/* \
		-g typescript-node \
		-t templates/typescript \
		-o build \
		--global-property models,supportingFiles \
		--additional-properties=serviceName=Tokenization \
		--additional-properties=modelPropertyNaming=original \
		--additional-properties=helperFunctions=./templates/helpers/camelCase.ts

rm src/zalopay/models/*
cp build/model/* src/zalopay/models
rm -r build
