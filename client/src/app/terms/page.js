export const metadata = {
  title: "Terms and Conditions | Orbital Net",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-zinc-300">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms and Conditions</h1>
        
        <div className="space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
          <section>
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">1. Service Agreement</h2>
            <p className="leading-relaxed">
              By subscribing to Orbital Net's internet services, you agree to comply with our acceptable use policy. The service is provided on a prepaid monthly basis. Internet speeds mentioned in our packages are "up to" speeds and may vary based on network conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">2. Billing and Payments</h2>
            <p className="leading-relaxed">
              Monthly bills must be paid in advance before the start of the billing cycle. Failure to pay the bill on time will result in temporary suspension of the connection. Reconnection may require clearing all due payments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">3. Equipment and Installation</h2>
            <p className="leading-relaxed">
              Any hardware (ONU/Router) provided by Orbital Net remains the property of the company unless explicitly purchased by the customer. The customer is responsible for the safety of the equipment provided at their premises.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}