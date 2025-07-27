import LoginForm from '@/components/blocks/LoginForm';

export const metadata = {
    title: "Pro Gym - Login",
    description: "Pro Gym",
};

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-skin flex items-center justify-center p-4">
            <LoginForm />
        </div>
    );
}