
export type Loan = {
  id: number;
  membre: number;
  membre_nom: string,
  devise: string;
  taux_interet: number;
  total_a_payer: number;
  balance: number;
  date: string;
  montant_emprunt:string,
  duree_mois:number,
  est_solde:boolean,
};

export type CreateLoanPayload = {
  membre: number;
  montant_emprunt: number;
  taux_interet: number;
  devise: string;
  date: string;
  duree_mois:number,
  est_solde:boolean
};



//  "montant_emprunt": "8125047",
//   "devise": "cdf",
//   "": 4294967295,
//   "date": "2026-10-21",
//   "": true,
//   "membre": 0,
//   "taux_interet": 0