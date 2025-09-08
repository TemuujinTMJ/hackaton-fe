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
      <div className="bg-[url(/login/bg-animate.png)] w-[60%] bg-cover bg-no-repeat bg-center"></div>

      <div
        className="w-[40%] flex flex-col justify-center items-center gap-10 
            bg-gradient-to-r from-[#010D47] via-[#350f6a] to-[#77036b] animate-gradient"
      >
        <div className="relative">
          <Image
            src="/login/blob.png"
            alt="blob"
            width={60}
            height={60}
            className="animate-blobMotion [animation-delay:1.2s]"
          />
        </div>

        <div className="flex flex-col justify-around gap-6 rounded-[12px] items-center p-6">
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
          <h6 className="Inter text-[11px] text-[#dddddd]"></h6>
        </div>
      </div>
    </div>
  );
}
