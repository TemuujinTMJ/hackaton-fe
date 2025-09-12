"use client";

import Image from "next/image";

export default function Login() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID;
    const tenantId = process.env.NEXT_PUBLIC_AZURE_TENANT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_AZURE_REDIRECT_URI;

    const authUrl =
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize` +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri ?? "")}` +
      `&response_mode=query` +
      `&scope=openid profile email User.Read`;

    window.location.href = authUrl;
  };

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

          <button
            // variant="ghost"
            className="w-[370px] flex items-center bg-white text-black py-6 rounded-2xl justify-center gap-2"
            onClick={handleLogin}
          >
            <Image
              src={"/login/microsoft-icon.png"}
              alt="microsoft"
              width={16}
              height={16}
              priority
            />
            <p className="text-[13px]">Microsoft office 365</p>
          </button>

          {/* <InfoTooltip
            text="Бүртгэл үүсгэх бол HR-тай холбогдоно уу."
            side="bottom"
            icon={
              <p className="underline text-blue-700 font-semibold tracking-wide">
                Бүртгэлгүй ?
              </p>
            }
          /> */}
        </div>
        <div className="text-center text-[12px] text-gray-400 justify-self-end">
          <div>Powered by 3M-FOUND-HACKATON</div>
          <div>Copyright © 2025 3M Found. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
