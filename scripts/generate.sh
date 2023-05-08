# Get latest OpenAPI specification
git clone https://gitlab.zalopay.vn/accounting/dojo/docusaurus-playground.git

# Generate models from specification
openapi-generator-cli generate \
		-i docusaurus-playground/specs/en/* \
		-g typescript-node \
		-t templates/typescript \
		-o build \
		--global-property models,supportingFiles \
		--additional-properties=serviceName=Tokenization \
		--additional-properties=modelPropertyNaming=original \
		--additional-properties=helperFunctions=./templates/helpers/camelCase.ts

cp build/model/* src/zalopay/models

# Clear
rm -r docusaurus-playground
rm -r build
