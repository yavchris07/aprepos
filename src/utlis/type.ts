import type { ReactNode } from "react";

export const ADMN = "";
export const CASHIER = "";

export interface router { path: string, element: ReactNode }

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
  status: string;
};

export type Kind = {
  id: number;
  nom: string;
  descriptin: string;
};

export type Adhesion = {
  id: number;
  membre: string;
  annee: string;
  montant: number;
  date: string;
};

export type Account = {
  id: number;
  membre: number;
  numero_compte: string;
  balance: number;
};

export type Transactions = {
  id: number;
  compte: number;
  type_transactions: string;
  montant: number;
  date: string;
  reference: string;
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
  membre: string;
  semaine: number;
  annee: string;
  montant: string;
  date: string;
};


