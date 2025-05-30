'use client'
import Spinner from "./Spinner";
import dynamic from "next/dynamic";


export const LazyMap = dynamic(
  () => import("@/app/_components/MyMap"),
  {
    ssr: false,
    loading: () => <Spinner />
  }
);


