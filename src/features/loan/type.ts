
export type Loan = {
  id: number;
  membre: number;
  montant: number;
  taux_interet: number;
  total_a_payer: number;
  balance: number;
  date: string;
};

export type CreateLoanPayload = {
  membre: number;
  montant_emprunt: number;
  taux_interet: number;
  devise: string;
  date: string;
};