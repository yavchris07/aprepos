export type RefundCantinePayload = {
  montant: number;
  devise: string;
  date: string;
  credit_cantine: number;
};

export type RefundCantine  = {
  id: number;
  montant: string;
  devise: string;
  date: string;
  credit_cantine: number;
};
