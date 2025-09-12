import Image from "next/image";
import Login from "./login";

export default async function page() {
  return (
    <div className="w-full h-screen flex">
      <div className="bg-[url(/login/tp-back.png)] w-[50%] rounded-2xl p-6 m-12 bg-cover bg-no-repeat bg-center"></div>

      <div className="absolute right-0 w-[50%] h-full flex flex-col justify-between items-center gap-10 p-12">
        <div className="flex flex-col justify-around gap-6 rounded-[12px] items-center pt-56">
          <div className="relative">
            <Image
              src="/login/blob.png"
              alt="blob"
              width={100}
              height={100}
              className="animate-blob-float drop-shadow-glow"
            />
          </div>
          <h1 className="font-semibold text-[32px]">Нэвтрэх</h1>
          <Login />
        </div>
        <div className="text-center text-[12px] text-gray-400 justify-self-end">
          <div>Powered by 3M-FOUND-HACKATON</div>
          <div>Copyright © 2025 3M Found. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
