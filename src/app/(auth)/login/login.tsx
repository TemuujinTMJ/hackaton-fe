"use client";
import React from "react";
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
    <button
      className="w-[370px] flex items-center bg-white text-black py-6 rounded-2xl justify-center gap-2 
                       microsoft-login-btn transform transition-all duration-300 ease-out group
                       hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 
                       hover:bg-gradient-to-r hover:from-white hover:to-blue-50
                       active:scale-95 active:duration-75"
      onClick={handleLogin}
    >
      <Image
        src={"/login/microsoft-icon.png"}
        alt="microsoft"
        width={16}
        height={16}
        priority
        className="transition-transform duration-300 group-hover:rotate-12"
      />
      <p className="text-[13px] font-medium transition-colors duration-300">
        Microsoft office 365
      </p>
    </button>
  );
}
