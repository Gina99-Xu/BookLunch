import SelectedCountry from "@/app/_components/SelectedCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getUserByEmail } from "@/app/_lib/data-service";

export const metadata = {
  title: 'Account'
}
export default async function Page() {

  const session = await auth();
  const loggedUser = await getUserByEmail(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-primary-850 mb-4">My Profile</h2>
      <UpdateProfileForm loggedUser={loggedUser}>
        <SelectedCountry className="px-4 py-4 bg-primary-200 text-primary-800 "
          name="nationality"
          id="nationality"
          defaultCountry={loggedUser.nationality}
        />
      </UpdateProfileForm>
    </div>
  )
}