"use client"

import { useLang } from "@/app/lang-provider"
import { useRouter } from "next/navigation"

export default function Profile() {
  const {t} = useLang()
  const router = useRouter()

  return (
 <>
 <button onClick={() => {
    router.push("/dashboard")
  }}>{t("common.dashboard")}</button>
 <button>{t("buttons.add")}</button>
 <button>{t("buttons.edit")}</button>
 <button>{t("buttons.delete")}</button>
 <button>{t("buttons.close")}</button>
 </>
  )
}
