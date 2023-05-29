type QueryString = ConstructorParameters<typeof URLSearchParams>[0];

export type RequestOptions = {
  params?: QueryString;
};
