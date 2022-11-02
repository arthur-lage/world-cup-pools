import { FormEvent, useState } from "react";
import Image from "next/image";

import Logo from "../assets/logo.svg";
import Illustration from "../assets/illustration.png";
import Avatars from "../assets/avatars.png";
import CheckIcon from "../assets/check.svg";

import { api } from "../services/api";

import { ModalWrapper } from "../components/ModalWrapper";
import { CodeModal } from "../components/CodeModal";

import cogoToast from "cogo-toast";
import { Loading } from "../components/Loading";

interface HomeProps {
  count: {
    users: number;
    pools: number;
    guesses: number;
  };
}

export default function Home(props: HomeProps) {
  const [isCreatingPool, setIsCreatingPool] = useState(false)
  const [poolTitle, setPoolTitle] = useState("");
  
  const [modalType, setModalType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentCode, setCurrentCode] = useState("");

  function openModal(newModalType: string) {
    setModalType(newModalType);
    setIsModalOpen(true);
  }

  function closeModal() {
    setModalType("");
    document.body.style.overflow = "auto"
    setIsModalOpen(false);
  }

  async function createPool(e: FormEvent) {
    e.preventDefault();

    if (poolTitle.length === 0) {
      return cogoToast.error("Você precisa de um nome para o bolão!");
    }

    setIsCreatingPool(true);

    const res = await api.post("/pools", {
      title: poolTitle,
    });
    
    cogoToast.success("Bolão criado com sucesso!")

    setCurrentCode(res.data.code);
    openModal("code");
    setIsCreatingPool(false);
    
    document.body.style.overflow = "hidden"
  }

  return (
    <div className="flex gap-[112px] items-center bg-lines min-h-[100vh] px-[160px] py-[66px]">
      <ModalWrapper isModalOpen={isModalOpen}>
        {modalType === "code" && (
          <CodeModal closeModal={closeModal} code={currentCode} />
        )}
      </ModalWrapper>

      <main>
        <Image className="mb-[60px]" src={Logo} alt="NLW Copa logo" />

        <h1 className="w-[489px] font-roboto font-bold text-white text-5xl leading-[60px]">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="flex items-center gap-2 my-10">
          <Image src={Avatars} alt="Avatars of users." />

          <span className="font-bold text-[#E1E1E6] font-roboto text-lg">
            <span className="text-[#129E57]">+ {props.count.users}</span>{" "}
            pessoas já estão usando
          </span>
        </div>

        <form onSubmit={createPool} className="flex items-center gap-2">
          <input
            className="rounded-md w-[306px] border outline-none border-[#323238] bg-[#202024] pl-6 py-[18px] text-[#C4C4CC] placeholder:text-[#C4C4CC] font-roboto text-sm"
            placeholder="Qual o nome do bolão?"
            type="text"
            value={poolTitle}
            onChange={(e) => setPoolTitle(e.target.value)}
          />
          <button
            type="submit"
            className="font-bold flex items-center justify-center text-center text-sm font-roboto text-[#09090A] px-6 py-5 bg-[#F7DD43] rounded-md"
          >
            {isCreatingPool ? <Loading /> : <span>CRIAR MEU BOLÃO</span>}
          </button>
        </form>

        <p className="mt-[16.5px] font-roboto text-sm text-[#8D8D99] w-[400px] leading-[22.4px]">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="w-full h-[1px] my-10 bg-[#323238]"></div>

        <div className="flex items-center">
          <div className="flex items-center gap-6">
            <Image src={CheckIcon} alt="Green Check Icon" />
            <div className="flex flex-col gap-2">
              <span className="font-roboto font-bold text-2xl text-[#e1e1e6]">
                + {props.count.pools}
              </span>
              <span className="font-roboto text-base text-[#e1e1e6]">
                Bolões criados
              </span>
            </div>
          </div>

          <div className="w-[1px] h-16 bg-[#323238] mx-[64.5px]"></div>

          <div className="flex items-center gap-6">
            <Image src={CheckIcon} alt="Green Check Icon" />
            <div className="flex flex-col gap-2">
              <span className="font-roboto font-bold text-2xl text-[#e1e1e6]">
                + {props.count.guesses}
              </span>
              <span className="font-roboto text-base text-[#e1e1e6]">
                Palpites enviados
              </span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={Illustration}
        alt="Two phones using the World Cup Pools app!"
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [usersCountRes, poolsCountRes, guessesCountRes] = await Promise.all([
    api.get("/users/count"),
    api.get("/pools/count"),
    api.get("/guesses/count"),
  ]);

  return {
    props: {
      count: {
        users: usersCountRes.data.count,
        pools: poolsCountRes.data.count,
        guesses: guessesCountRes.data.count,
      },
    },
  };
};
