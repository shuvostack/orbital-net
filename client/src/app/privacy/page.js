export const metadata = {
  title: "Privacy Policy | Orbital Net",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-zinc-300">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
          <section>
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information to provide better internet services to our users. This includes personal details such as your name, contact number, email address, and installation address (NID details if required by BTRC). We also collect technical data related to your internet usage for billing and troubleshooting purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">2. How We Use Information</h2>
            <p className="leading-relaxed">
              The information we collect is strictly used to set up your broadband connection, manage your billing cycle, communicate service updates, and provide customer support. We do not sell or share your personal data with third-party marketing agencies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">3. Data Security</h2>
            <p className="leading-relaxed">
              We implement industry-standard security measures to protect your personal and payment information. Online payments made through our website are processed via a secure, encrypted payment gateway (SSLCommerz) and we do not store your credit card or bank details on our servers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}