"use client";
import { getToken } from "@/utils/get-token";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/customer-toast";
import { useCreateUser } from "../hooks/use-create-user";
import { Role } from "@/utils/types";

type createUserProps = {
  open: boolean;
  onClose: () => void;
  roleItems: Role[];
};

const CreateUser = ({ open, onClose, roleItems }: createUserProps) => {
  const token = getToken();
  const { create, fail, pending } = useCreateUser(token ?? "");

  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    passcode: "",
    role: "",
    adress: "",
    matricul: "",
    nin: "",
    email: "",
    is_active: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create(formData);
      showToast("Création reussie !", "success");
      onClose();
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        showToast(fail, "error");
      } else {
        console.log("error");
        showToast(fail, "error");
      }
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, role: event.target.value });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-50 p-4 rounded w-112.5 shadow-sm">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-black font-semibold">Création utilisateur</h2>
          <span onClick={onClose} className="text-gray-600 cursor-pointer">
            x
          </span>
        </div>
        <p className="text-gray-500 text-xs font-medium my-3">
          Ajouter un utilisateur et assigne lui un role correspondant a son
          space de travail.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Nom complet
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nom"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Matricule
            </label>
            <input
              type="text"
              value={formData.matricul}
              onChange={(e) =>
                setFormData({ ...formData, matricul: e.target.value })
              }
              placeholder="Matricule"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Numéro ID
            </label>
            <input
              type="text"
              value={formData.nin}
              onChange={(e) =>
                setFormData({ ...formData, nin: e.target.value })
              }
              placeholder="Numéro ID"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">
              Numéro de téléphone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Numéro de téléphone"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
          <div className="w-full my-2">
            <label className="text-gray-900 text-xs font-semibold">
              Mot de passe
            </label>
            <input
              type="password"
              value={formData.passcode}
              onChange={(e) =>
                setFormData({ ...formData, passcode: e.target.value })
              }
              placeholder="••••••••"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
          <div className="w-full my-2">
            <label className="text-gray-900 text-xs font-semibold">
              Adresse
            </label>
            <input
              type="text"
              value={formData.adress}
              onChange={(e) =>
                setFormData({ ...formData, adress: e.target.value })
              }
              placeholder="Adresse"
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            />
          </div>
          <div className="w-full my-1">
            <label className="text-gray-900 text-xs font-semibold">Role</label>
            <select
              className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
              onChange={handleRoleChange}
            >
              <option value="">-- Choix role --</option>
              {roleItems.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 my-2">
            <span
              className="hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs py-2 px-6 rounded font-semibold cursor-pointer"
              onClick={onClose}
            >
              Annuler
            </span>
            <button
              type="submit"
              className="bg-amber-500 text-black text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
              disabled={pending}
            >
              {pending ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                "Créer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;





// 

import { useToast } from "@/components/customer-toast";
import Modal from "@/components/modal";

import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { getToken } from "@/utils/get-token";
import { User } from "@/utils/types";
import { useDeleteUser } from "../hooks/use-delete-user";

type modalProps = {
  open: string;
  onClose: () => void;
  user: User;
};

const DeleteUser = ({ user, open, onClose }: modalProps) => {
  const token = getToken();
  const { deleteUser, fail, pending } = useDeleteUser(token ?? "");
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ id: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteUser(user.id);
      showToast("Suppression utilisateur reussie !", "success");
      onClose();
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        showToast(fail, "error");
      } else {
        console.log("error");
        showToast(fail, "error");
      }
    }
  };

  if (open === null) return null;

  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Suppression utilisateur</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <p className="text-gray-500 text-sm">
          Voullez-vous vraiment supprimer{" "}
          <strong className="text-black">{user.name}</strong> matricule : {" "}
          <strong className="text-black">
            {user.matricul}
          </strong>{" "}
          qui est <strong className="text-black">{user.role}</strong>{" "} ?
        </p>

        <input
          type="text"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          placeholder="id"
        />

        <div className="flex justify-end gap-2 my-2">
          <span
            className="hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs py-2 px-6 rounded font-semibold cursor-pointer"
            onClick={onClose}
          >
            Annuler
          </span>
          <button
            type="submit"
            className="bg-red-700 text-white text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
            disabled={pending}
          >
            {pending ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              "Supprimer"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteUser;




import { useToast } from "@/components/customer-toast";
import Modal from "@/components/modal";
import { getToken } from "@/utils/get-token";
import { User } from "@/utils/types";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useUpdateUser } from "../hooks/use-update-user";

type modalProps = {
  open: string;
  onClose: () => void;
  user: User;
  choice: { id: string; name: string }[];
};

const EditUser = ({ open, onClose, user, choice }: modalProps) => {
  const token = getToken();
  const { updateUser, fail, pending } = useUpdateUser(token ?? "");
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    phone: user.phone,
    passcode: user.passcode,
    role: user.role,
    adress: user.adress,
    matricul: user.matricul,
    nin: user.nin,
    email: user.email,
    is_active: user.is_active,
  });

  const states = [
    { id: 1, name: "Actif" },
    { id: 0, name: "Désactivé" },
  ];

  console.log("rrr == : ", choice);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("XX==XX :", formData);
      await updateUser(formData);
      showToast("Mise a jour reussie !", "success");
      onClose();
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        showToast(fail, "error");
      } else {
        console.log("error");
        showToast(fail, "error");
      }
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, role: event.target.value });
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, is_active: parseInt(event.target.value) });
  };

  if (!open) return null;
  return (
    <Modal>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-black font-semibold">Editer utilisateur</h2>
        <span onClick={onClose} className="text-gray-600 cursor-pointer">
          x
        </span>
      </div>
      <p className="text-gray-500 text-xs font-medium my-3">
        Editer utilisateur, modifier comme bon vous semble.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Nom complet
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nom"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Matricule
          </label>
          <input
            type="text"
            value={formData.matricul}
            onChange={(e) =>
              setFormData({ ...formData, matricul: e.target.value })
            }
            placeholder="Matricule"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Numéro ID
          </label>
          <input
            type="text"
            value={formData.nin}
            onChange={(e) => setFormData({ ...formData, nin: e.target.value })}
            placeholder="Numéro ID"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">
            Numéro de téléphone
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Numéro de téléphone"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-2">
          <label className="text-gray-900 text-xs font-semibold">Adresse</label>
          <input
            type="text"
            value={formData.adress}
            onChange={(e) =>
              setFormData({ ...formData, adress: e.target.value })
            }
            placeholder="Adresse"
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
          />
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Etat</label>
          <select
          value={formData.is_active}
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            onChange={handleStateChange}
          >
            {states.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full my-1">
          <label className="text-gray-900 text-xs font-semibold">Role</label>
          <select
            value={formData.role}
            className="border border-gray-400 text-black py-2 pl-2 rounded text-sm w-full"
            onChange={handleRoleChange}
          >
            {choice.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 my-2">
          <span
            className="hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs py-2 px-6 rounded font-semibold cursor-pointer"
            onClick={onClose}
          >
            Annuler
          </span>
          <button
            type="submit"
            className="bg-amber-500 text-black text-xs py-2 px-6 rounded cursor-pointer font-semibold flex justify-center"
            disabled={pending}
          >
            {pending ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              "Editer"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUser;



// 

import Loading from "@/components/loading";
import { User } from "@/utils/types";
// import { User } from "@/utils/type";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface userProps {
  users: User[];
  loading: boolean;
  onDelete: (user: User) => void;
  onEdit: (user: User) => void;
  onView: (user: User) => void;
}

const UsersList = ({ users, loading, onDelete, onEdit, onView }: userProps) => {
  if (loading) return <Loading />;
  return (
    <div className="w-full bg-gray-100 my-2">
      <table className="text-black w-full">
        <thead className="bg-gray-50 text-xs font-bold tracking-wider text-gray-700 text-start">
          <tr>
            <th scope="col" className="px-6 py-4 text-left">
              Matricule
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Nom complet
            </th>
            <th scope="col" className="px-6 py-4 text-left">
              Numéro ID
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Numéro de téléphone
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Adresse physique
            </th>
             <th
              scope="col"
              className="px-6 py-4 max-w-xs text-left md:max-w-md"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-4 max-w-xs text-center md:max-w-md"
            >
              Etat
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600 text-xs">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{user.matricul}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  {/* <User2 className="h-4 w-4 text-gray-700 shrink-0" /> */}
                  <span>{user.name}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{user.nin}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{user.phone}</span>
              </td>

              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{user.email}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{user.adress}</span>
              </td>
               <td className="whitespace-nowrap px-6 py-2">
                <span className="font-medium">{user.role}</span>
              </td>

              {/* Column 3: Comment (Truncated safely) */}
              <td className="px-6 py-3 max-w-xs md:max-w-md">
                <p
                  className={`truncate font-semibold py-1 px-1 rounded-2xl text-center ${user.is_active === 1 ? "text-green-700" : "text-red-700"}`}
                >
                  {user.is_active === 1 ? "Actif" : "Désactivé"}
                </p>
              </td>
              <td className="whitespace-nowrap px-6 py-2 font-medium flex gap-2 justify-center">
                {/* onView={} onEdit={} onDelete={} */}
                <button
                  onClick={() => onView(user)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onEdit(user)}
                  className=" hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(user)}
                  className=" text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
