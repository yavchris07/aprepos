export type CreateRatePayload = {
  taux_mensuel: string;
  duree_min_mois: number;
  duree_max_mois: number;
  description: string;
};

export type Rate = {
  id: number;
  taux_mensuel: string;
  duree_min_mois: number;
  duree_max_mois: number;
  description: string;
};

//  taux_interet: number,
//   membre: string,
//   est_solde: boolean,
//   duree_mois: string,
//   devise: string,
//   montant_emprunt: string,
//   date: string,
