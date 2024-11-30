export type CreateConnectedAccountResponse = {
  account: string;
  public_key: string;
};

export type CreateAccountSessionResponse = {
  client_secret: string;
};
export type CreateAccountSessionParams = {
  account: string;
};
