import RootLayout from "../components/root-layout";
import icon from "../assets/logo.png";
import {
  User,
  // Building2,
  Percent,
  Users,
  // ShieldCheck,
  // Bell,
  // Palette,
  // Database,
  ChevronRight,
  Plus,
  Pencil,
  // Lock,
  WalletCards,
  // FileText,
  // Settings2,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import CreateKind from "../features/kind/components/create-kind";
import { useKinds } from "../features/kind/hooks/use-kind";
import { getToken } from "../utlis/get-token";
import type { Kind } from "../utlis/type";
import DeleteKind from "../features/kind/components/delete-kind";
import EditKind from "../features/kind/components/edit-kind";

const SettingPage = () => {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedKind, setSelectedKind] = useState<Kind | null>(null);

  const handleDeleteKind = (kind: Kind) => {
    setSelectedKind(kind);
    setDeleteModal(true);
  };

  const handleEditKind = (kind: Kind) => {
    setSelectedKind(kind);
    setEditModal(true);
  };

  const token = getToken();
  const { data } = useKinds(token ?? "");

  const kinds: Kind[] = data?.kinds ?? [];

  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-50/60 pb-10">

        <div className="space-y-6">

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Tableau de bord</span>
              <span>/</span>
              <span className="text-gray-600">
                Paramètres
              </span>
            </div>

            <div className="mt-1">
              <h1 className="text-xl font-bold text-gray-900">
                Paramètres
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Configurez les paramètres généraux et le fonctionnement
                de votre plateforme.
              </p>
            </div>
          </div>

          {/* =====================================================
              PROFIL ADMIN
          ===================================================== */}

          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-green-50">
                  <img
                    src={icon}
                    alt="Logo"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-gray-900">
                      Administrateur
                    </h2>

                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
                      ADMIN
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    admin@ceparcrea.org
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Gestionnaire principal
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <User size={16} />
                Modifier le profil
              </button>

            </div>

          </div>

          {/* =====================================================
              ORGANISATION
          ===================================================== */}

          {/* <section>

            <div className="mb-3">
              <h2 className="text-sm font-semibold text-gray-900">
                Organisation
              </h2>

              <p className="text-xs text-gray-500">
                Informations générales de votre organisation.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Organisation 

              <SettingCard
                icon={<Building2 size={19} />}
                title="Informations de l'organisation"
                description="Nom, logo, adresse et coordonnées."
              />

              {/* Paramètres généraux 

              <SettingCard
                icon={<Settings2 size={19} />}
                title="Paramètres généraux"
                description="Configuration générale de la plateforme."
              />

            </div>

          </section> */}

          {/* =====================================================
              FINANCES
          ===================================================== */}

          <section>

            <div className="mb-3">
              <h2 className="text-sm font-semibold text-gray-900">
                Paramètres financiers
              </h2>

              <p className="text-xs text-gray-500">
                Configurez les règles financières utilisées par le système.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Taux */}

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                <div className="flex items-start justify-between">

                  <div className="flex gap-3">

                    <div className="rounded-lg bg-orange-50 p-2.5 text-orange-700">
                      <Percent size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Taux d'intérêt
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Taux utilisé pour les emprunts.
                      </p>
                    </div>

                  </div>

                  <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700">
                    <Pencil size={15} />
                  </button>

                </div>

                <div className="mt-5 flex items-end gap-2">

                  <span className="text-3xl font-bold text-gray-900">
                    4
                  </span>

                  <span className="mb-1 text-sm font-medium text-gray-500">
                    %
                  </span>

                </div>

                <p className="mt-1 text-xs text-gray-400">
                  Taux actuel
                </p>

              </div>

              {/* Devise */}

              <SettingCard
                icon={<WalletCards size={19} />}
                title="Devise"
                description="Devise principale utilisée pour les opérations."
                value="CDF — Franc congolais"
              />

            </div>

          </section>

          {/* =====================================================
              MEMBRES
          ===================================================== */}

          <section>

            <div className="mb-3 flex items-end justify-between">

              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Gestion des membres
                </h2>

                <p className="text-xs text-gray-500">
                  Gérez les catégories et règles liées aux membres.
                </p>
              </div>

            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-gray-100 p-4">

                <div className="flex items-center gap-3">

                  <div className="rounded-lg bg-green-50 p-2.5 text-green-700">
                    <Users size={19} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Types de membre
                    </h3>

                    <p className="text-xs text-gray-500">
                      Catégories disponibles pour les membres.
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setModal(true)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-green-700 px-3 text-xs font-medium text-white transition hover:bg-green-800"
                >
                  <Plus size={15} />
                  Ajouter
                </button>

              </div>

              <div className="divide-y divide-gray-100">

                {kinds.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <Users
                      size={28}
                      className="mx-auto text-gray-300"
                    />

                    <p className="mt-2 text-sm font-medium text-gray-600">
                      Aucun type de membre
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Ajoutez votre premier type de membre.
                    </p>
                  </div>
                ) : (
                  kinds.map((kind) => (
                    <div
                      key={kind.id}
                      className="flex items-center justify-between px-5 py-3.5 transition hover:bg-gray-50"
                    >

                      <div className="flex items-center gap-3">

                        <div className="h-2 w-2 rounded-full bg-green-600" />

                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {kind.nom}
                          </p>

                          <p className="text-[11px] text-gray-400">
                            Type de membre
                          </p>
                        </div>

                      </div>

                      <div className="flex items-center gap-1">

                        <button
                          type="button"
                          className="rounded-lg p-2 text-gray-400 transition  hover:bg-green-200 hover:text-green-700 cursor-pointer"
                          onClick={() => handleEditKind(kind)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-red-300 hover:text-red-700 cursor-pointer"
                          onClick={() => handleDeleteKind(kind)}
                        >
                          <Trash2 size={15} />
                        </button>

                      </div>

                    </div>
                  ))
                )}

              </div>

            </div>

          </section>

          {/* =====================================================
              ACCÈS & SÉCURITÉ
          ===================================================== */}

          {/* <section>

            <div className="mb-3">
              <h2 className="text-sm font-semibold text-gray-900">
                Accès et sécurité
              </h2>

              <p className="text-xs text-gray-500">
                Contrôlez la sécurité et les accès à la plateforme.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <SettingCard
                icon={<ShieldCheck size={19} />}
                title="Utilisateurs et rôles"
                description="Gérer les administrateurs, agents et permissions."
              />

              <SettingCard
                icon={<Lock size={19} />}
                title="Sécurité"
                description="Mot de passe, sessions et authentification."
              />

            </div>

          </section> */}

          {/* =====================================================
              NOTIFICATIONS
          ===================================================== */}

          {/* <section>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

              <button
                type="button"
                className="flex w-full items-center justify-between p-5 text-left transition hover:bg-gray-50"
              >

                <div className="flex items-center gap-3">

                  <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                    <Bell size={19} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Notifications
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Configurez les notifications et alertes du système.
                    </p>
                  </div>

                </div>

                <ChevronRight
                  size={18}
                  className="text-gray-400"
                />

              </button>

            </div>

          </section> */}

          {/* =====================================================
              APPARENCE
          ===================================================== */}
{/* 
          <section>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

              <button
                type="button"
                className="flex w-full items-center justify-between p-5 text-left transition hover:bg-gray-50"
              >

                <div className="flex items-center gap-3">

                  <div className="rounded-lg bg-purple-50 p-2.5 text-purple-600">
                    <Palette size={19} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Apparence
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Personnalisez l'apparence de votre espace de gestion.
                    </p>
                  </div>

                </div>

                <ChevronRight
                  size={18}
                  className="text-gray-400"
                />

              </button>

            </div>

          </section> */}

          {/* =====================================================
              DONNÉES
          ===================================================== */}

          {/* <section>

            <div className="mb-3">
              <h2 className="text-sm font-semibold text-gray-900">
                Données et système
              </h2>

              <p className="text-xs text-gray-500">
                Gestion des données et informations système.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <SettingCard
                icon={<Database size={19} />}
                title="Sauvegarde"
                description="Gérer les sauvegardes et la récupération des données."
              />

              <SettingCard
                icon={<FileText size={19} />}
                title="Journal d'activité"
                description="Consulter les opérations effectuées sur la plateforme."
              />

            </div>

          </section> */}

          {/* =====================================================
              VERSION
          ===================================================== */}

          <div className="flex flex-col items-center justify-center border-t border-gray-200 pt-6">

            <img
              src={icon}
              alt="CEPARCREA"
              className="h-8 w-8 rounded-lg object-cover opacity-70"
            />

            <p className="mt-2 text-xs font-medium text-gray-500">
              CEPARCREA
            </p>

            <p className="mt-1 text-[11px] text-gray-400">
              Plateforme de gestion — Version 1.0.0
            </p>

          </div>

        </div>
      </div>

      {/* =====================================================
          MODALE
      ===================================================== */}

      {modal && (
        <CreateKind
          onClose={() => setModal(false)}
          open={modal}
        />
      )}

      {deleteModal && selectedKind && (
        <DeleteKind
          kind={selectedKind}
          onClose={() => setDeleteModal(false)}
          open={deleteModal}
        />
      )}

      {editModal && selectedKind && (
        <EditKind
          kind={selectedKind}
          onClose={() => setEditModal(false)}
          open={editModal}
        />
      )}

    </RootLayout>
  );
};

/* =========================================================
   COMPOSANT CARTE PARAMÈTRE
========================================================= */

type SettingCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  value?: string;
};

const SettingCard = ({
  icon,
  title,
  description,
  value,
}: SettingCardProps) => {
  return (
    <button
      type="button"
      className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-gray-300 hover:shadow-md"
    >

      <div className="flex items-center gap-3">

        <div className="rounded-lg bg-gray-100 p-2.5 text-gray-600 transition group-hover:bg-green-50 group-hover:text-green-700">
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {title}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>

          {value && (
            <p className="mt-2 text-xs font-medium text-green-700">
              {value}
            </p>
          )}
        </div>

      </div>

      <ChevronRight
        size={18}
        className="shrink-0 text-gray-300 transition group-hover:text-gray-600"
      />

    </button>
  );
};

export default SettingPage;

