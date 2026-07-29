import RootLayout from "../components/root-layout";
import icon from "../assets/logo.png";
import { Dot, Eye, Plus } from "lucide-react";
import { useState } from "react";
import CreateKind from "../features/kind/components/create-kind";
import { useKinds } from "../features/kind/hooks/use-kind";
import { getToken } from "../utlis/get-token";
import type { Kind } from "../utlis/type";

const SettingPage = () => {
  const [modal, setModal] = useState<"delete" | "open" | "edit">(null);
  const token = getToken();
  const { data } = useKinds(token);

  const kinds: Kind[] = data?.kinds ?? [];
  const pagination = data?.pagination;
  console.log("YY : ", pagination);

  return (
    <RootLayout>
      <div className="flex justify-between">
        <p>Paramètres général</p>
      </div>

      <div className="my-5 flex justify-between items-center rounded px-2">
        <div className="w-30 h-30 rounded-full bg-green-200 flex items-center justify-center text-green-700">
          <img src={icon} alt="logo-site" className="w-full h-full" />
        </div>
        <div className="">
          <h1 className="text-orange-800 font-semibold">Admin</h1>
          <span className="text-orange-800">admin@ceparcrea.org</span>
        </div>
      </div>

      <div className="flex flex-col bg-zinc-100 px-2 my-5 gap-3">
        <h1 className="font-semibold">Taut d'intérêt</h1>
        <p className="text-gray-500">4%</p>
      </div>

      <div className="flex flex-col justify-between bg-zinc-100 px-2 my-5 gap-3 py-1.5">
        <div className="flex justify-between w-full">
          <h1 className="font-semibold">Type de membre</h1>
          <span
            className="bg-orange-800 rounded-full w-6 h-6 cursor-pointer flex items-center justify-center"
            onClick={() => setModal("open")}
          >
            <Plus size={15} className="text-white" />
          </span>
        </div>

        <div>
          {kinds.map((kind) => (
            <div className="flex justify-between items-center" key={kind.id}>
              <div className="flex gap-0.5">
                <Dot color="gray" />
                <p className="text-orange-800 text-sm">{kind.nom}</p>
              </div>
              <Eye size={17}/>
            </div>
          ))}
        </div>
      </div>
      {<CreateKind onClose={() => setModal(null)} open={modal} />}
    </RootLayout>
  );
};

export default SettingPage;
