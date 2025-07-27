import Link from 'next/link';

export const metadata = {
    title: 'Pro Gym - Privacy Policy',
};

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-skin pt-[100px] from-main/10 to-[#725CAD]/10 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-[#725CAD]/20">
                <div className="bg-main p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white text-center">Privacy Policy</h1>
                </div>
                
                <div className="p-6 md:p-8">
                <div className="prose max-w-none text-main">
                    <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    
                    <section className="mt-6">
                    <h2 className="text-xl font-semibold text-main mb-4">1. Introduction</h2>
                    <p>This Privacy Policy explains how we collect, use, and disclose your personal information when you use our services.</p>
                    </section>
                    
                    <section className="mt-6">
                    <h2 className="text-xl font-semibold text-main mb-4">2. Information We Collect</h2>
                    <p>We collect information that you provide directly to us, such as when you create an account, including:</p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Any other information you choose to provide</li>
                    </ul>
                    <p className="mt-2">We also automatically collect certain information about your device and usage of our services.</p>
                    </section>
                    
                    <section className="mt-6">
                    <h2 className="text-xl font-semibold text-main mb-4">3. How We Use Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Communicate with you about your account</li>
                        <li>Send you technical notices and security alerts</li>
                        <li>Personalize your experience</li>
                    </ul>
                    </section>
                    
                    <section className="mt-6">
                    <h2 className="text-xl font-semibold text-main mb-4">4. Sharing of Information</h2>
                    <p>We do not share your personal information with third parties except in the following circumstances:</p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>With your consent</li>
                        <li>For legal reasons, such as to comply with a subpoena</li>
                        <li>With service providers who need access to such information to carry out work on our behalf</li>
                    </ul>
                    </section>
                    
                    <section className="mt-6">
                    <h2 className="text-xl font-semibold text-main mb-4">5. Security</h2>
                    <p>We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access.</p>
                    </section>
                    
                    <section className="mt-6">
                    <h2 className="text-xl font-semibold text-main mb-4">6. Your Choices</h2>
                    <p>You may update or correct your account information at any time by logging into your account. You can also contact us to request deletion of your personal information.</p>
                    </section>
                    
                    <section className="mt-6">
                    <h2 className="text-xl font-semibold text-main mb-4">7. Changes to This Policy</h2>
                    <p>We may update this privacy policy from time to time. We will notify you of any changes by updating the date at the top of this page.</p>
                    </section>
                    
                    <section className="mt-6">
                    <h2 className="text-xl font-semibold text-main mb-4">8. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at <Link href="mailto:privacy@example.com" className="text-[#725CAD] hover:underline">privacy@example.com</Link>.</p>
                    </section>
                </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;