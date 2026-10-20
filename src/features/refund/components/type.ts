export type Refund = {
  id: number;
  emprumt: number;
  montant: number;
  date: string;
};

export type CreatRefundPayload = {
  emprumt: number;
  montant: number;
  date: string;
};