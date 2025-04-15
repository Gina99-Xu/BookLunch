import UserPreferenceForm from "../_components/UserPreferenceForm";
import { auth } from "../_lib/auth";
import { getUserById } from "../_lib/data-service";
import { redirect } from 'next/navigation';

export default async function PreferencesPage() {
    const session = await auth();
    if (!session) {
        redirect('/login');
    }

    const userData = await getUserById(session.user.id);
    if (!userData) {
        // If no user data exists, we should create it first
        // This should be handled by the auth callback, but we'll add a safety check here
        redirect('/login');
    }

    return (
        <UserPreferenceForm userId={session.user.id} />
    );
}