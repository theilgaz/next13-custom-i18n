"use client"

import { useLang } from "@/app/lang-provider"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const {t} = useLang()
  const router = useRouter()
  return (
 <>
  <button onClick={() => {
    router.push("/profile")
  }}
  >{t("common.profile")}</button>
 <button>{t("common.settings")}</button>
 <button>{t("common.application")}</button>
 <button>{t("common.system")}</button>
 <button>{t("buttons.close")}</button>
 </>
  )
}
