import type { LucideProps } from "lucide-react";
import type { ReactNode } from "react";

// export const ADMN = "";
// export const CASHIER = "";

export interface router {
  path: string;
  element: ReactNode;
}

// types
export type User = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  telephone: string;
  is_active: boolean;
  role: string;
};

export type Member = {
  id: number;
  nom_complet: string;
  phone: string;
  adresse: string;
  type_member?: number;
  status: string;
  type_member_detail?: { id: number; nom: string; description: string };
  type_member_nom?: string;
};

export type Kind = {
  id: number;
  nom: string;
  description: string;
};

export type Adhesion = {
  id: number;
  membre: number;
  membre_nom?: string;
  annee: string;
  montant: number;
  devise: string;
  date: string;
};

export type Account = {
  id: number;
  membre: number;
  numero_compte: string;
  balance: number;
  membre_nom?: string;
};

export type Transaction = {
  id: number;
  compte: number;
  type_transaction: string;
  montant: number;
  reference: string;
  created_at: string;
};

export type Loan = {
  id: number;
  membre: number;
  montant: number;
  taux_interet: number;
  total_a_payer: number;
  balance: number;
  date: string;
};

export type Refund = {
  id: number;
  emprumt: number;
  montant: number;
  date: string;
};

export type Social = {
  id: number;
  membre: number;
  membre_nom?: string;
  semaine: number;
  annee: string;
  montant: number;
  date: string;
};

export type Pagination = {
  count: number;
  next: null;
  previous: null;
};

export type LoginData = { username: string; password: string };

export type Operation = {
  title: string;
  description: string;
  value: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  iconBg: string;
  iconColor: string;
};

export interface Stats {
  somme_totale_compte_epargne: number;
  somme_totale_social: number;
  somme_totale_emprunt: number;
  somme_totale_remboursement: number;
  somme_totale_adhesion: number;
}

// CANTINE
export type Product = {
  id: number;
  nom: string;
  prix_unitaire: number;
  devise: string;
  stock: number;
};

export type CreateProductPayload = {
  nom: string;
  prix_unitaire: number;
  devise: string;
  stock: number;
};

export type EditProductPayload = {
  id: number;
  nom: string;
  prix_unitaire: number;
  devise: string;
  stock: number;
};


// credit
// /api/cantine/panier/
export type CreateCreditPayload = {
  membre: number;
  acompte_initial: string;
  devise: string;
  date: string;
}

export type EditCreditPayload = {
  id: number;
  membre: number;
  acompte_initial: string;
  devise: string;
  date: string;
}

export interface LigneCreditCantine {
  id: number;
  credit_cantine: number;
  produit: number;
  nom_produit: string;
  quantite: number;
  prix_unitaire_applique: string;
  sous_total: string;
}

export interface RemboursementCantine {
  id: number;
  montant: string;
  devise: string;
  date: string;
  credit_cantine: number;
}

export interface CreditCantine {
  id: number;
  membre: number;
  nom_membre: string;
  acompte_initial: string;
  montant_total_panier: string;
  balance: string;
  devise: string;
  date: string;
  lignes: LigneCreditCantine[];
  remboursements_cantine: RemboursementCantine[];
}
 
// Line credit 



// Type du payload à envoyer au Backend pour chaque ligne
export interface CantineLinePayload {
  credit_cantine: number;
  produit: number;
  quantite: number;
}

// Élément local pour la gestion du panier avec détails d'affichage
export interface CartItem {
  produit: Product;
  quantite: number;
}
 

