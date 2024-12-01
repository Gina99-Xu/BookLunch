import SelectedCountry from "@/app/_components/SelectedCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getUserByEmail } from "@/app/_lib/data-service";

export default async function Page() {

  const session = await auth();
  const loggedUser = await getUserByEmail(session.user.email);

  return (<div>
    <h2 className="font-semibold text-2xl text-primary-850 mb-4">Update your profile</h2>
    <p className="text-lg mb-8 text-primary-850">My Personal Information</p>
    <UpdateProfileForm loggedUser={loggedUser}>
      <SelectedCountry className="px-4 py-4 bg-primary-200 text-primary-800 "
        name="nationality"
        id="nationality"
        defaultCountry={loggedUser.nationality}
      />
    </UpdateProfileForm>
  </div>)
}