import SignupForm from '@/components/blocks/SignupForm';

export const metadata = {
    title: "Pro Gym - Signup",
    description: "Pro Gym",
};

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-skin flex items-center justify-center p-4">
            <SignupForm />
        </div>
    );
}