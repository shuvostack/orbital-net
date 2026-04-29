export const metadata = {
  title: "Refund Policy | Orbital Net",
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-zinc-300">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Refund Policy</h1>
        
        <div className="space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
          <section>
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">1. Prepaid Services</h2>
            <p className="leading-relaxed">
              As an Internet Service Provider (ISP), Orbital Net operates on a strictly prepaid basis. Once a monthly subscription fee is paid and the service is activated, the amount is generally non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">2. Connection Setup Failure</h2>
            <p className="leading-relaxed">
              If a customer has paid the installation or advance setup fee online, but Orbital Net is unable to provide the connection due to technical unfeasibility or lack of coverage in the customer's area, a 100% full refund will be initiated within 7-10 working days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">3. Disconnection</h2>
            <p className="leading-relaxed">
              If a customer wishes to disconnect their service, they must notify us before the start of the next billing cycle. No partial refunds will be provided for mid-month disconnections. Refund for any refundable deposit (if applicable for ONU/Router) will be processed after the safe return of the equipment.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}