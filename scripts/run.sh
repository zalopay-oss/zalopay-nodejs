openapi-generator-cli generate \
		-i ./spec/zlp.yaml \
		-g typescript-node \
		-t ./templates/typescript \
		-o build \
		--global-property models,supportingFiles \
		--additional-properties=serviceName=Tokenization \
		--additional-properties=modelPropertyNaming=original \
		--additional-properties=helperFunctions=./templates/helpers/camelCase.ts

cp build/model/* src/zalopay/typings
rm -r build
