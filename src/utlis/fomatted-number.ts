export const formatAccountNumber = (account: string) => {
  return account
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};
