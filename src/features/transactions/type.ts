
type DetailAccount = {
id: number,
membre: number,
membre_nom: string,
numero_compte: string,
balance: string,
devise: string,
}

export type Transaction = {
  id: number;
  compte: number;
  type_transaction: string;
  compte_details:DetailAccount
  montant: number;
  reference: string;
  created_at: string;
};

export type CreateTransactionPayload = {
  compte: number;
  type_transaction: string;
  montant: number;
  reference: string;
  created_at: string;
};





