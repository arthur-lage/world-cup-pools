import { CheckCircle, Clipboard, X } from "phosphor-react";
import { IModal } from "../interfaces/IModal";

import cogoToast from 'cogo-toast'

interface CodeModalProps extends IModal {
  code: string;
}

export function CodeModal({ closeModal, code }: CodeModalProps) {
  async function copyCode() {
    await navigator.clipboard.writeText(code);
    
    cogoToast.success("O código foi copiado para a área de transferência.")
  }

  return (
    <div className="z-50 relative w-[37.5rem] h-[25rem] bg-zinc-800 flex flex-col items-center justify-center rounded-lg">
      <button
        onClick={closeModal}
        className="transition-all duration-150 p-2 hover:bg-zinc-600 bg-zinc-700 rounded-full cursor-pointer absolute top-3 right-3"
      >
        <X weight="bold" className="text-white text-xl" />
      </button>

      <CheckCircle className="text-green-500 text-[72px] mb-4" />

      <h2 className=" text-2xl text-zinc-100 font-bold font-roboto text-center">Bolão criado com sucesso!</h2>
      <p className="w-[28rem] text-lg text-zinc-400 my-6 font-medium text-center">
        Parabéns, você criou um novo bolão! Copie o link abaixo e compartilhe
        com os seus amigos!
      </p>

      <div className="flex items-center gap-2">
        <p className="rounded-md text-center w-[245px] border outline-none border-[#323238] bg-[#202024] py-[18px] text-[#C4C4CC] placeholder:text-[#C4C4CC] font-roboto text-lg">
          {code}
        </p>

        <button
          className="w-16 h-full bg-[#F7DD43] hover:brightness-75 transition-all duration-150 flex items-center justify-center rounded-lg"
          onClick={copyCode}
        >
          <Clipboard weight="fill" className="text-zinc-900 text-2xl" />
        </button>
      </div>
    </div>
  );
}
