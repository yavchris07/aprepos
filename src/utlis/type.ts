import type { ReactNode } from "react";

export const ADMN = "";
export const CASHIER = "";

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
  type_member_detail?: { id: number, nom: string, description: string }
};

export type Kind = {
  id: number;
  nom: string;
  description: string;
};

export type Adhesion = {
  id: number;
  membre: number;
  membre_nom?:string;
  annee: string;
  montant: number;
  devise : string,
  date: string;
};

export type Account = {
  id: number;
  membre: number;
  numero_compte: string;
  balance: number;
  membre_nom?: string,
};

export type Transaction = {
  id: number;
  compte: number;
  type_transaction: string;
  montant: number;
  date: string;
  reference: string;
  created_at?:string;
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
  membre_nom?:string;
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


