import Link from 'next/link';

export const metadata = {
    title: 'Pro Gym - Terms of Service',
};

const TermsOfServicePage = () => {
    return (
        <div className="min-h-screen bg-skin pt-[100px] from-main/10 to-[#725CAD]/10 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-[#725CAD]/20">
            <div className="bg-main p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">Terms of Service</h1>
            </div>
            
            <div className="p-6 md:p-8">
            <div className="prose max-w-none text-main">
                <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <section className="mt-6">
                <h2 className="text-xl font-semibold text-main mb-4">1. Introduction</h2>
                <p>Welcome to our application. These Terms of Service govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.</p>
                </section>
                
                <section className="mt-6">
                <h2 className="text-xl font-semibold text-main mb-4">2. User Accounts</h2>
                <p>When you create an account with us, you must provide accurate information. You are responsible for maintaining the security of your account and for all activities that occur under your account.</p>
                </section>
                
                <section className="mt-6">
                <h2 className="text-xl font-semibold text-main mb-4">3. Acceptable Use</h2>
                <p>You agree not to use the service for any unlawful purpose or in any way that might harm, damage, or disparage any other party. Without limiting the foregoing, you agree not to:</p>
                <ul className="list-disc pl-5 mt-2">
                    <li>Engage in any activity that interferes with or disrupts the service</li>
                    <li>Attempt to access accounts or systems that you are not authorized to access</li>
                    <li>Use the service to distribute unsolicited promotional or commercial content</li>
                </ul>
                </section>
                
                <section className="mt-6">
                <h2 className="text-xl font-semibold text-main mb-4">4. Intellectual Property</h2>
                <p>All content included on the site, such as text, graphics, logos, and software, is the property of the company or its content suppliers and protected by intellectual property laws.</p>
                </section>
                
                <section className="mt-6">
                <h2 className="text-xl font-semibold text-main mb-4">5. Termination</h2>
                <p>We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                </section>
                
                <section className="mt-6">
                <h2 className="text-xl font-semibold text-main mb-4">6. Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. We will provide notice of any changes by updating the "Last updated" date at the top of this page.</p>
                </section>
                
                <section className="mt-6">
                <h2 className="text-xl font-semibold text-main mb-4">7. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at <Link href="mailto:terms@example.com" className="text-[#725CAD] hover:underline">terms@example.com</Link>.</p>
                </section>
            </div>
            </div>
        </div>
        </div>
    );
};

export default TermsOfServicePage;