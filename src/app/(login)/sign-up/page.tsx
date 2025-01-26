import { getUser } from "@/queries/user";
import { redirect } from "next/navigation";
import SignUp from "../signup";
import "@/styles/globals.css";

export default async function SignUpPage() {
  const user = await getUser();
  if (user) {
    return redirect("/app");
  }

  return <SignUp mode="signup" />;
}
