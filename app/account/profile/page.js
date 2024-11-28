import SelectedCountry from "@/app/_components/SelectedCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";

export default function Page() {
  return (<div>
    <h2 className="font-semibold text-2xl text-primary-850 mb-4">Update your profile</h2>
    <p className="text-lg mb-8 text-primary-850">My Personal Information</p>
    <UpdateProfileForm>
      <SelectedCountry className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm" />
    </UpdateProfileForm>
  </div>)
}