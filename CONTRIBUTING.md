## Contribution guidelines

### Add new API
To adding a new api, for example TokenizationAPI
- Update Open API specification in `specs` folder to latest.
- Generate request, response models by run the script in `scripts/generate.sh`
- In the generated request files, find and replace `app_id`, `appId`, `payment_id`, `mac`, `sig` required fields to optional by using the `?` syntax. Because those fields are added in the service file. For example, from `app_id` to `app_id:?` .
- Add new service and related resources in `services` folder.
- Update `services/index.ts` to expose new service API to client.
- Add unit tests for new service in `__tests__` folder and verify by run `npm run test`.
- Check coding style by `npm run lint` and fix issues if having by `npm run lint:fix`.

### How to contribute step-by-step
1. Fork the [zalopay-oss/zalopay-nodejs](https://github.com/zalopay-oss/zalopay-nodejs) repository.
2. Create a new branch from main in your fork. This makes it easier for you to keep track of your changes.
3. Make the desired changes to the code.
   - If you are adding new functionality or fixing a bug, we recommend you add unit tests that cover it.
4. Push the changes to your fork.
5. Create a pull request to the [zalopay-oss/zalopay-nodejs](https://github.com/zalopay-oss/zalopay-nodejs) repository.
6. In your pull request, please describe in detail:
   - What problem you’re solving
   - Your approach to fixing the problem
   - Any tests you wrote
7. Check Allow edits from maintainers.
8. Create the pull request.
9. Ensure that all checks have passed.

