"use client";

import { useEffect, useState } from "react";
import AuthModel from "@/components/AuthModel";

interface ModalProviderProps {

}

const ModalProvider: React.FC<ModalProviderProps> = ({

}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
    <AuthModel></AuthModel>
    </>
  );
}

export default ModalProvider;