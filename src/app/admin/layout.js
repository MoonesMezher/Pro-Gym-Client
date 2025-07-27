import AdminLayout from './AdminLayout';

export const metadata = {
    title: "Pro Gym - Dashboard",
    description: "Pro Gym Dashboard",
};

export default function RootLayout({ children }) {
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    );
}