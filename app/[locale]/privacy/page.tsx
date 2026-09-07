import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — CipherPay',
  description: 'How CipherPay processes payment, account, and optional integration data.',
};

const lastUpdated = 'September 8, 2026';

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: 'var(--font-geist-mono), monospace', fontSize: 13, lineHeight: 1.6 }}>
      <SiteHeader />

      <main style={{ maxWidth: 700, margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--cp-text-muted)', fontSize: 12, marginBottom: 40 }}>
          Last updated: {lastUpdated}
        </p>

        <Section id="01" title="Who we are">
          <P>
            CipherPay is a product of Atmosphere Labs. We build open-source payment
            infrastructure for Zcash (ZEC). Our service enables merchants to accept
            shielded Zcash payments through hosted checkout pages, APIs, and
            e-commerce integrations (Shopify, WooCommerce).
          </P>
        </Section>

        <Section id="02" title="Data we collect">
          <P>
            <Strong>From merchants:</Strong> Email address, API keys, and store configuration
            (e.g., Shopify domain, webhook URLs). This is the minimum required to
            operate the service.
          </P>
          <P>
            <Strong>From customers (buyers):</Strong> Standard checkout does not request a buyer name,
            email, shipping address or phone number. The merchant&apos;s shop may collect these separately.
            Optional event registration asks for a name and email and sends them to the merchant&apos;s Luma event.
            Shopify order authorization may process a customer ID or checkout token. These are not included in payment invoices.
          </P>
          <P>
            <Strong>Payment data:</Strong> We store invoice amounts, currency, payment addresses, transaction IDs,
            product descriptions and payment status. A merchant-provided incoming viewing key lets CipherPay read incoming
            amounts and memos for that account; it cannot spend funds. Use a dedicated commerce wallet account to limit visibility.
            Shielded payment details are hidden from public observers, but incoming amounts are visible to CipherPay and the recipient.
          </P>
          <P>
            <Strong>Website operation:</Strong> We do not use advertising trackers. Essential cookies support
            language selection and authenticated sessions. Hosting and security providers process network metadata,
            including IP addresses, to deliver and protect the service.
          </P>
        </Section>

        <Section id="03" title="Shopify integration">
          <P>
            Our Shopify app requests <Code>read_orders</Code> and <Code>write_orders</Code> permissions
            to create payment invoices and mark orders as paid. We read order amounts
            and product names to generate invoices. Shopify responses can contain customer information. We use a customer ID or checkout token only to authorize access to the correct order;
            payment mappings retain the order ID, invoice ID, amount, currency and status.
          </P>
          <P>
            Payment session data (order ID, amount, invoice reference) is stored
            for 30 days to support retries and reconciliation. Failed fulfillment jobs remain until resolved or the shop is deleted.
            Operational credentials are encrypted before storage. Uninstall revokes settings sessions and removes shop credentials.
          </P>
        </Section>

        <Section id="04" title="Data sharing">
          <P>
            We do not sell personal data. Hosting providers and Upstash process service data on our behalf.
            Resend processes merchant recovery and billing emails when configured. Luma receives attendee details when a buyer
            chooses an integrated event registration. Shopify receives order payment updates. Merchants receive invoice webhooks.
          </P>
          <P>
            Invoice data is processed through the Zcash blockchain, which is a public
            network. However, shielded transactions do not reveal sender, receiver,
            or amount information publicly.
          </P>
        </Section>

        <Section id="05" title="Data retention">
          <P>
            Prepaid agent sessions expire after 24 hours; Shopify payment mappings expire after 30 days.
            Optional attendee details are removed after successful registration, after seven days for expired/refunded invoices,
            or after 30 days otherwise. Merchant invoice records remain while the account is active for payment reconciliation.
            Account deletion removes related operational records atomically. Minimal transaction-consumption records remain
            to prevent old deposits being spent again and contain no merchant identity or bearer token. Backups have a separate retention period.
          </P>
        </Section>

        <Section id="06" title="Security">
          <P>
            All API communication uses TLS encryption. Webhook signatures are
            verified using HMAC-SHA256. Access tokens and API keys are stored
            with application-level encryption and access controls. CipherPay does not require wallet seeds or spending keys.
          </P>
        </Section>

        <Section id="07" title="Your rights">
          <P>
            You can request access to, correction of, or deletion of your data
            at any time by contacting us. Uninstalling the Shopify app removes its connection; deleting the CipherPay merchant account removes its invoice and account records, subject to the replay-prevention and backup retention described above.
          </P>
        </Section>

        <Section id="08" title="Contact">
          <P>
            For privacy questions or data requests:{' '}
            <a href="mailto:privacy@cipherpay.app" style={{ color: 'var(--cp-cyan)', textDecoration: 'none' }}>
              privacy@cipherpay.app
            </a>
          </P>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">{id} // {title}</span>
        </div>
        <div style={{ padding: '16px 18px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 12, color: 'var(--cp-text-muted)', lineHeight: 1.8, marginTop: 0, marginBottom: 12 }}>
      {children}
    </p>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: 'var(--cp-text)', fontWeight: 600 }}>{children}</strong>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code style={{
      backgroundColor: 'var(--cp-surface)',
      padding: '2px 6px',
      borderRadius: 3,
      fontSize: 11,
      color: 'var(--cp-cyan)',
    }}>
      {children}
    </code>
  );
}
