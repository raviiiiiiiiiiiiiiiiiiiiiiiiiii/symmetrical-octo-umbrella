import VaranasiToAyodhyaPage from "@/components/tempo-traveller/VaranasiToAyodhyaPage";
import Script from "next/script";

export default function Page() {
  return (
    <>
      <Script
        id="varanasi-to-ayodhya-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://www.yatratravelindia.com/tempo-traveller/varanasi-to-ayodhya#service",
            "name": "Varanasi to Ayodhya Tempo Traveller | Yatra Travel India",
            "description":
              "Book a Tempo Traveller from Varanasi to Ayodhya for Ram Janmabhoomi darshan and pilgrimage. Fixed all-inclusive fares from Rs 12,000. 9, 12, 16, 20 seater and Luxury options available.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Yatra Travel India",
              "url": "https://www.yatratravelindia.com",
              "telephone": "+91-9044019511",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Varanasi",
                "addressRegion": "Uttar Pradesh",
                "addressCountry": "IN",
              },
            },
            "areaServed": [
              { "@type": "City", "name": "Varanasi" },
              { "@type": "City", "name": "Ayodhya" },
            ],
            "serviceType": "Tempo Traveller Rental Service",
            "offers": [
              { "@type": "Offer", "name": "9 Seater Tempo Traveller Varanasi to Ayodhya", "price": "12000", "priceCurrency": "INR" },
              { "@type": "Offer", "name": "12 Seater Tempo Traveller Varanasi to Ayodhya", "price": "14000", "priceCurrency": "INR" },
              { "@type": "Offer", "name": "16 Seater Tempo Traveller Varanasi to Ayodhya", "price": "15000", "priceCurrency": "INR" },
              { "@type": "Offer", "name": "20 Seater Tempo Traveller Varanasi to Ayodhya", "price": "17000", "priceCurrency": "INR" },
              { "@type": "Offer", "name": "Luxury Tempo Traveller Varanasi to Ayodhya", "price": "19000", "priceCurrency": "INR" },
            ],
            "availableChannel": {
              "@type": "ServiceChannel",
              "servicePhone": "+91-9044019511",
            },
            "keywords":
              "Varanasi to Ayodhya Tempo Traveller, Ram Janmabhoomi Darshan, Group Pilgrimage, Yatra Travel India",
          }),
        }}
      />
      <VaranasiToAyodhyaPage />
    </>
  );
}
