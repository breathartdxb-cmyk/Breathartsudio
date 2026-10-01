import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PJ7Q6MX4');
        `}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PJ7Q6MX4"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      <main
        className="main-content"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg)",
        }}
      >
        <div
          className="container"
          style={{
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto",
            padding: "4rem 2rem",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(158, 112, 96, 0.1)",
              color: "var(--color-gold)",
              marginBottom: "2rem",
            }}
          >
            <CheckCircle size={40} strokeWidth={1.5} />
          </div>

          <h1
            className="cinematic-title"
            style={{
              fontSize: "3rem",
              marginBottom: "1.5rem",
              color: "var(--color-white)",
            }}
          >
            Thank You
          </h1>

          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "1.1rem",
              lineHeight: "1.8",
              marginBottom: "3rem",
            }}
          >
            Thank you for choosing BreathArt Studio! We look forward to
            capturing your beautiful moments.
          </p>

          <Link
            href="/"
            className="btn btn-gold"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Return to Home <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </>
  );
}
