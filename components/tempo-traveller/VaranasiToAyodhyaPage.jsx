"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import Navbar from "@/components/Navbar";
import BookingTabs from "@/components/BookingTabs";
import {
  FaClock, FaMedal, FaShieldAlt, FaUserCheck, FaWhatsapp,
  FaBus, FaBusAlt, FaCheckCircle, FaMapMarkerAlt, FaPhoneAlt,
  FaUsers, FaStar, FaRoad, FaInfoCircle
} from "react-icons/fa";
import RouteLoader from "@/components/Loader/RouteLoader";
import Footer from "@/components/footer/Footer";
import AuthInit from "@/components/login/AuthInit";
import FeatureCards from "@/components/tempo-traveller/FeatureCards";
import TempoImageCards from "@/components/tempo-traveller/TempoImageCards";
import TempoSeatConfig from "@/components/tempo-traveller/TempoSeatConfig";
import GoogleMapsScriptLoader from "@/components/googleComponents/GoogleMapsScriptLoader";
import SEOJsonLD from "@/components/SEOJsonLD";
import { TypewriterText } from "@/components/home/TypewriterText";
import { HiArrowRight, HiChevronDown } from "react-icons/hi";
import { MdLocationOn, MdAccessTime, MdDirectionsBus } from "react-icons/md";

// --- DATA ---
const fareData = [
  { type: "9 Seater Tempo Traveller", capacity: "6 to 9 people", fare: "Rs 12,000 onwards" },
  { type: "12 Seater Tempo Traveller", capacity: "10 to 12 people", fare: "Rs 14,000 onwards" },
  { type: "16 Seater Tempo Traveller", capacity: "13 to 16 people", fare: "Rs 15,000 onwards" },
  { type: "20 Seater Tempo Traveller", capacity: "17 to 20 people", fare: "Rs 17,000 onwards" },
  { type: "Luxury Tempo Traveller", capacity: "9 to 16 people", fare: "Rs 19,000 onwards" },
];

const routeDetails = [
  { detail: "Distance", info: "200 km (actual ~210–220 km with city approaches)" },
  { detail: "Drive Time", info: "3.5 to 4 hours (4–5 hrs with stops/traffic)" },
  { detail: "Route", info: "NH19 east to Sultanpur, then NH330/NH28 via Faizabad (Rama Path)" },
  { detail: "Road Condition", info: "Excellent 4–6 lane national highways; smooth asphalt, well-lit" },
  { detail: "Best Departure Time", info: "5:00–5:30 AM for day trip (reach Ayodhya by 9–10 AM)" },
  { detail: "Best Return Time", info: "5:00 PM from Ayodhya (arrive Varanasi 9–10 PM)" },
  { detail: "Tolls & Fuel Stops", info: "3–4 tolls (~Rs 400–500 total, included); dhabas at Sultanpur & Faizabad" },
  { detail: "Key Landmarks", info: "Sultanpur markets, Faizabad (Nageshwarnath Temple), Ayodhya Ram Path" },
];

const attractions = [
  {
    name: "Hanuman Garhi",
    subtitle: "The Beginning",
    icon: "🚩",
    desc: "Every serious Ayodhya pilgrimage begins here — not at Ram Janmabhoomi. 76 steps cut into the hillside lead to the most recognisable temple on the Ayodhya skyline. Lord Hanuman is the guardian of the city and visiting Hanuman before Ram darshan is the correct sequence that most devoted pilgrims follow instinctively. Allow a full hour.",
    tip: "Palanquin carriers are available at the base for elderly group members.",
  },
  {
    name: "Ram Janmabhoomi",
    subtitle: "The Reason Most Groups Are Here",
    icon: "🛕",
    desc: "The Ram Lalla darshan at Ram Janmabhoomi is the centrepiece of this pilgrimage. Queue time before 10 AM on weekdays runs 1–2 hours on a normal day. Three hours is the right allocation for the full visit — security check, queue, darshan, and exit. Phones are strictly not permitted inside the complex.",
    tip: "Leave phones in the tempo traveller. Traditional dress required — shorts and sleeveless clothing are turned away.",
  },
  {
    name: "Kanak Bhawan",
    subtitle: "The One That Surprises Every Group",
    icon: "✨",
    desc: "Five minutes from Ram Janmabhoomi on foot. The temple gifted by Queen Kaikeyi to Sita after her marriage to Lord Ram. Interiors painted gold, quieter and more intimate than the main complex. The stop most groups are glad they included when they initially considered skipping it.",
    tip: "Allow 30 to 45 minutes. Go in without rushing.",
  },
  {
    name: "Saryu Ghat",
    subtitle: "Where the Day Settles",
    icon: "🌊",
    desc: "The river where Lord Ram is believed to have taken his final departure. Ram ki Paidi is the most accessible ghat for groups arriving by tempo traveller. A boat ride gives a perspective on Ayodhya no road-based stop provides. The late afternoon light on the Saryu is the kind of thing most groups say they were not expecting to find as moving as they did.",
    tip: "Allow 30 to 45 minutes. Do not treat it as a quick box to tick before the drive home.",
  },
];

const packageOptions = [
  {
    days: "One Day",
    icon: "⚡",
    color: "bg-blue-50 border-blue-200",
    headerColor: "text-[#2482c2]",
    desc: "Works for groups that have already spent time in Varanasi and are adding Ayodhya as a focused pilgrimage extension. 5 AM departure covers Hanuman Garhi, Ram Janmabhoomi, Kanak Bhawan, and Saryu Ghat — back in Varanasi by 9 PM.",
  },
  {
    days: "Two Days",
    icon: "🌅",
    color: "bg-orange-50 border-orange-200",
    headerColor: "text-orange-600",
    desc: "Day one in Varanasi: Kashi Vishwanath darshan, morning Ganga boat ride, Dashashwamedh Ganga Aarti. Day two: tempo traveller departs 5 AM for the full Ayodhya circuit. Neither city feels squeezed in.",
  },
  {
    days: "Three Days",
    icon: "🏆",
    color: "bg-green-50 border-green-200",
    headerColor: "text-green-600",
    desc: "Two full days in Varanasi. One full day in Ayodhya. Return on day four. Most groups who do it this way say they would not change the structure. Multi day 12 seater packages start at Rs 25,000 with driver accommodation included.",
  },
];

const preDepartureChecklist = [
  {
    title: "Phones sorted",
    desc: "Everyone needs to know before departure that phones stay in the tempo traveller at Ram Janmabhoomi. A five-minute group briefing the night before saves 20 minutes of confusion at the temple gate.",
  },
  {
    title: "Clothing checked",
    desc: "Traditional dress for every group member. The Ram Janmabhoomi security team turns away pilgrims in shorts and sleeveless clothing. Check clothing the evening before.",
  },
  {
    title: "Cash in small denominations",
    desc: "Palanquin at Hanuman Garhi, boat at Saryu, prasad at Kanak Bhawan, small donations at the ghats. Rs 10, Rs 20, and Rs 50 notes make every stop easier.",
  },
  {
    title: "One person leading the group",
    desc: "Through the security check, through the queue, through the exit. One designated coordinator means every stop takes half the time it would otherwise.",
  },
  {
    title: "5 AM confirmed with the driver",
    desc: "Not approximately 5. Not 5:15 if the group is ready. 5 AM. The group moving at 5 AM is in the good version of this day. The group having chai at 5:30 is already in a different itinerary.",
  },
];

const vehicleGuide = [
  {
    size: "9 Seater",
    for: "Small family of 6–8 people",
    desc: "Comfortable on NH19 and NH28. Right size when the group is genuinely 8 people with manageable bags.",
    fare: "Rs 12,000 onwards",
  },
  {
    size: "12 Seater",
    for: "Medium family groups of 10–12 people",
    desc: "Most consistently booked size on this route. The space difference over a 9 seater is noticeable on a 4-hour highway journey. Per head cost split across 12 people makes it the most practical choice.",
    fare: "Rs 14,000 onwards",
  },
  {
    size: "16 Seater",
    for: "Extended families and religious groups of 13–16",
    desc: "The comfort level for elderly members across a full pilgrimage day is meaningfully better than trying to fit 13 people into a 12 seater.",
    fare: "Rs 15,000 onwards",
  },
  {
    size: "20 Seater",
    for: "Large joint families and temple trust groups of 17–20",
    desc: "One tempo traveller, everyone together. Coordinating across two separate cabs at Ram Janmabhoomi entry points creates problems the pilgrimage day does not need.",
    fare: "Rs 17,000 onwards",
  },
  {
    size: "Luxury Tempo Traveller",
    for: "Groups with elderly or mobility-limited members",
    desc: "Fully reclining seats, air suspension, multi-zone AC, charging points at every seat. For families with post-operative members or anyone with joint, cardiac, or mobility considerations.",
    fare: "Rs 19,000 onwards",
  },
];

const faqs = [
  {
    question: "How do I book a tempo traveller from Varanasi to Ayodhya?",
    answer: "Call or WhatsApp Yatra Travel India on 9044019511. Share the group size, travel date, and preferred departure time. The booking is confirmed on the same call with vehicle details, driver name, pickup time, and fixed all-inclusive fare. No advance payment required. No cancellation fee for bookings cancelled more than 48 hours before travel date.",
  },
  {
    question: "How much does tempo traveller hire from Varanasi to Ayodhya cost?",
    answer: "Tempo traveller hire from Varanasi to Ayodhya starts at Rs 6,000 one way for a 9 seater and Rs 7,500 one way for a 12 seater. Return package for a 12 seater starts at Rs 14,000. Every fare includes fuel, toll on NH19 and NH28, parking at all Ayodhya stops, and driver allowance for the full day. Nothing is added after the trip ends.",
  },
  {
    question: "What is the tempo traveller price for a family of 10?",
    answer: "A 12 seater is the right vehicle for a family of 10. The price starts at Rs 7,500 one way and Rs 14,000 return. Split across 10 family members that is Rs 750 per person one way for a door-to-door pilgrimage transfer between two of the most sacred cities in India.",
  },
  {
    question: "Are phones allowed inside Ram Janmabhoomi Temple?",
    answer: "No. Mobile phones are strictly not permitted inside the Ram Janmabhoomi complex. This is enforced at every security point without exceptions. The tempo traveller driver parks near the designated vehicle area and phones stay in the vehicle throughout the darshan. Brief every group member about this before arrival at the temple, not at the entry gate.",
  },
  {
    question: "Can I book a 12 seater tempo traveller from Varanasi to Ayodhya?",
    answer: "Yes. The 12 seater is the most booked vehicle size on this route. Comfortably seats 10 to 12 people with pilgrimage luggage and puja items. One way fare starts at Rs 7,500 and return package starts at Rs 14,000. Call 9044019511 to check availability on the preferred date.",
  },
  {
    question: "Is luxury tempo traveller available for hire from Varanasi to Ayodhya?",
    answer: "Yes. Luxury tempo traveller is available for groups where comfort is a priority. Fully reclining seats, air suspension, multi-zone AC, and charging points at every seat. One way fare starts at Rs 11,000 and return package at Rs 20,000. Strongly recommended for groups with elderly passengers or mobility-limited family members.",
  },
  {
    question: "What does a one day Varanasi to Ayodhya trip cover?",
    answer: "A one day trip with a 5 AM departure covers the complete Ayodhya pilgrimage circuit: Hanuman Garhi morning visit, Ram Janmabhoomi darshan, Kanak Bhawan, and Saryu Ghat boat ride. Return to Varanasi by 9 PM. One way fare for a 12 seater starts at Rs 7,500. Return package starts at Rs 14,000.",
  },
  {
    question: "How do I get the best tempo traveller rate for Varanasi to Ayodhya?",
    answer: "Book directly rather than through aggregators or third party platforms. Call Yatra Travel India on 9044019511. Direct bookings get the base rate without platform markup, confirmed vehicle details before the travel date, and a driver briefed on the group's requirements. Book at least 5–7 days in advance on regular dates and 2–3 weeks in advance during festival periods.",
  },
  {
    question: "Which is the best route from Varanasi to Ayodhya by tempo traveller?",
    answer: "NH19 from Varanasi to Jaunpur then NH28 via Sultanpur and Faizabad into Ayodhya. This is the most direct and best maintained route. Road condition is good throughout and most experienced drivers on this corridor use this route as standard. Total distance 200 km.",
  },
  {
    question: "Can I book a Varanasi to Ayodhya round trip tempo traveller?",
    answer: "Yes. The round trip package is the most commonly booked option. Round trip for a 12 seater starts at Rs 14,000. The round trip package includes the vehicle for the full day in Ayodhya with driver waiting at every stop — not just the two-way transfer.",
  },
  {
    question: "How far in advance should I book?",
    answer: "For regular weekday travel, 3–5 days advance is generally sufficient. For weekend travel, 1–2 weeks. For Ram Navami, Diwali, Parikrama Panchami, and other major Ayodhya festival dates, book 3–4 weeks in advance. Since the 2024 Ram Lalla Temple consecration demand during festival periods has increased significantly.",
  },
  {
    question: "Is there a 9 seater tempo traveller available from Varanasi to Ayodhya?",
    answer: "Yes. The 9 seater is the right option for small family pilgrimages of 6–8 people with moderate luggage. One way fare starts at Rs 6,000 and return package at Rs 11,000. For families of 8 or more carrying substantial pilgrimage luggage or travelling with elderly members who need extra space, the 12 seater is the better choice.",
  },
  {
    question: "What is the best time to visit Ayodhya from Varanasi?",
    answer: "October to March for the most comfortable weather across both cities. October and November have the added significance of Diwali which Ayodhya celebrates with extraordinary scale. Ram Navami in March or April is the most significant festival at Ram Janmabhoomi but also the busiest period. For a first visit without overwhelming crowds, a regular weekday between November and February is the most manageable window.",
  },
  {
    question: "What is the difference between a tempo traveller and a cab for this route?",
    answer: "A cab seats 4–6 people. A 12 seater tempo traveller seats 10–12 people. For groups of 8 or more the per head cost of the tempo traveller is consistently lower than booking multiple cabs. Beyond cost, the tempo traveller keeps the entire group in one vehicle for the full day — no separate arrival times at Ram Janmabhoomi, no coordinating two drivers through Ayodhya.",
  },
  {
    question: "How do I confirm my booking with Yatra Travel India?",
    answer: "Call or WhatsApp 9044019511. The booking is confirmed verbally on the same call with vehicle type, seating capacity, driver name, pickup location, departure time, and the fixed all-inclusive fare. A confirmation message is sent to the WhatsApp number provided. No advance payment required on most standard dates. The driver contacts the group the evening before travel with a final confirmation.",
  },
];

// FAQ Accordion Item
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
      <button
        className="w-full flex justify-between items-center px-5 py-4 text-left bg-white hover:bg-[#f0f7ff] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-gray-800 pr-4">{question}</span>
        <HiChevronDown
          className={`flex-shrink-0 text-[#2482c2] text-xl transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 py-4 bg-[#f9fbff] border-t border-gray-100 text-gray-700 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function VaranasiToAyodhyaPage() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const { pickupLocation, dropLocation, pickupDate, returnDate, pickupTime } = useBooking();

  const onSubmit = () => {
    setLoader(true);
    let detectedServiceType = "One Way";
    if (returnDate === "" && dropLocation === "") detectedServiceType = "Cab Rental Service";
    else if (returnDate !== "") detectedServiceType = "Round Trip";
    router.push(
      `/booking/select_car?pickup_location=${pickupLocation}&service_type=${encodeURIComponent(detectedServiceType)}&drop_location=${dropLocation}&pickup_date=${pickupDate}&pickup_time=${pickupTime}&return_date=${returnDate}`
    );
    setTimeout(() => setLoader(false), 2000);
  };

  return (
    <>
      <SEOJsonLD />
      <GoogleMapsScriptLoader onLoad={() => {}} />
      <AuthInit />
      <Navbar />
      {loader && <RouteLoader />}

      {/* === HERO SECTION === */}
      <div className="relative min-h-screen flex flex-col items-center justify-start pt-20 pb-20 px-4">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/bg.webp')` }}
        />
        <div className="text-center z-10 mb-6 mt-4">
          <h1 className="uppercase font-black text-3xl md:text-6xl text-white tracking-tighter drop-shadow-2xl">
            <TypewriterText />
          </h1>
        </div>
        <div className="w-[80%] md:w-[50%] max-w-3xl z-10">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-full pb-12">
            <BookingTabs />
            <div className="flex justify-center -mt-10 relative z-30">
              <button
                onClick={onSubmit}
                disabled={!pickupLocation?.trim()}
                className={`group flex items-center gap-4 px-12 md:px-20 py-3 md:py-4 rounded-2xl font-black uppercase text-xl md:text-3xl transition-all duration-300 shadow-[0_20px_50px_rgba(37,99,235,0.3)] transform active:scale-95 ${
                  !pickupLocation?.trim()
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-[#254997] hover:bg-orange-500 text-white hover:shadow-orange-500/40"
                }`}
              >
                Search Cabs
                <HiArrowRight className="group-hover:translate-x-3 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-[80%] md:w-[65%]">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg"><FaShieldAlt /></div>
            <div><h4 className="text-white font-bold text-sm">Safe & Secure</h4><p className="text-gray-300 text-[10px] uppercase font-medium">Verified Drivers & Vehicles</p></div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg"><FaUserCheck /></div>
            <div><h4 className="text-white font-bold text-sm">Expert Chauffeurs</h4><p className="text-gray-300 text-[10px] uppercase font-medium">Professional & Punctual</p></div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg"><FaClock /></div>
            <div><h4 className="text-white font-bold text-sm">24/7 Support</h4><p className="text-gray-300 text-[10px] uppercase font-medium">We are always here for you</p></div>
          </div>
        </div>
      </div>

      {/* Feature Icons */}
      <FeatureCards />

      {/* === INTRO SECTION === */}
      <section className="max-w-5xl mx-auto px-5 py-12 text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#2482c2] mb-6">
          Varanasi to Ayodhya Tempo Traveller — Yatra Travel India
        </h1>
        <p className="text-lg leading-relaxed text-center mb-6">
          Kashi has the Ganga and one of the most powerful Jyotirlingas in India. Ayodhya has the Ram Janmabhoomi and the river where Lord Ram himself is said to have taken his final departure from this world. Putting both in the same journey is not just a logistical convenience — for millions of pilgrims it is the natural way these two sacred cities were always meant to be visited. Together.
        </p>
        <p className="text-lg leading-relaxed text-center mb-6">
          200 km separates them. A good road connects them. And a Yatra Travel India tempo traveller carries the whole group from one to the other without anyone arriving separately, without meters running in three different cabs, and without the kind of coordination that takes more out of a pilgrimage day than any queue at any temple ever could.
        </p>
        <div className="flex justify-center mt-6">
          <a
            href="tel:9044019511"
            className="flex items-center gap-3 bg-[#2482c2] hover:bg-[#1a6aaa] text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg"
          >
            <FaPhoneAlt /> Call 9044019511 to Book
          </a>
        </div>
      </section>

      {/* === FARE TABLE === */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <FaBus className="text-[#2482c2] text-2xl" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2482c2]">
              Varanasi to Ayodhya Tempo Traveller Fare
            </h2>
          </div>
          <p className="text-gray-600 mb-6">Fixed all-inclusive fares. Fuel, tolls on NH19 and NH28, parking, and driver allowance — all included. The number confirmed at booking is the number paid when the group returns to Varanasi.</p>
          <div className="overflow-x-auto bg-[#f7fbff] rounded-2xl shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2482c2] text-white text-left">
                  <th className="py-3 px-4 font-semibold">Vehicle Type</th>
                  <th className="py-3 px-4 font-semibold">Seating Capacity</th>
                  <th className="py-3 px-4 font-semibold">Base Fare</th>
                  <th className="py-3 px-4 font-semibold">Book Now</th>
                </tr>
              </thead>
              <tbody>
                {fareData.map((row, i) => (
                  <tr key={i} className={`border-b border-gray-200 hover:bg-[#e9f4fb] transition ${i % 2 === 0 ? "" : "bg-white"}`}>
                    <td className="py-3 px-4 text-gray-800 font-medium">{row.type}</td>
                    <td className="py-3 px-4 text-gray-700">{row.capacity}</td>
                    <td className="py-3 px-4 font-semibold text-[#2482c2]">{row.fare}</td>
                    <td className="py-3 px-4">
                      <a href="tel:9044019511" className="bg-[#2482c2] hover:bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
                        CALL US
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">*Multi day packages include driver accommodation. Call 9044019511 for exact fare based on travel date.</p>
        </div>
      </section>

      {/* === ROUTE AND DISTANCE === */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <FaRoad className="text-[#2482c2] text-2xl" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2482c2]">Route & Distance — Varanasi to Ayodhya</h2>
          </div>
          <p className="text-gray-700 mb-6">
            Varanasi → Jaunpur → Sultanpur → Faizabad → Ayodhya. NH19 becoming NH28. 200 km. 3.5 to 4 hours on a normal day. Leave at 5 in the morning and the group is walking into Hanuman Garhi before 9 AM with the entire day still ahead.
          </p>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2482c2] text-white text-left">
                  <th className="py-3 px-4 font-semibold">Detail</th>
                  <th className="py-3 px-4 font-semibold">Information</th>
                </tr>
              </thead>
              <tbody>
                {routeDetails.map((row, i) => (
                  <tr key={i} className={`border-b border-gray-200 ${i % 2 === 0 ? "bg-[#f7fbff]" : "bg-white"}`}>
                    <td className="py-3 px-4 font-semibold text-gray-800 w-1/3">{row.detail}</td>
                    <td className="py-3 px-4 text-gray-700">{row.info}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* === VEHICLE IMAGES === */}
      <TempoImageCards cd={{ cityname: "Varanasi to Ayodhya" }} />

      {/* === AYODHYA ATTRACTIONS === */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#2482c2] mb-4">
            Ayodhya — What to See & What Every Group Should Know
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            An honest account of what a group spending one day in Ayodhya actually sees, does, and experiences at each stop — not a list of identical two-line descriptions.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {attractions.map((place, i) => (
              <div key={i} className="bg-[#f7fbff] rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{place.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{place.name}</h3>
                    <p className="text-[#2482c2] text-sm font-medium">{place.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{place.desc}</p>
                <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2 flex items-start gap-2">
                  <FaInfoCircle className="text-orange-400 mt-1 flex-shrink-0" />
                  <p className="text-orange-700 text-sm">{place.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SEAT CONFIG === */}
      <TempoSeatConfig cd={{ cityname: "Varanasi to Ayodhya" }} city="varanasi-to-ayodhya" />

      {/* === DEPARTURE TIMING === */}
      <section className="py-14 bg-[#f0f7ff]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#2482c2] mb-8">
            Departure Timing — The Decision That Changes Everything
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 border border-green-300 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">✅</span>
                <h3 className="text-xl font-bold text-green-700">Leave at 5:00 AM</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /><span>Reach Ayodhya by 8:30–9:00 AM</span></li>
                <li className="flex items-start gap-2"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /><span>Hanuman Garhi in the cool morning</span></li>
                <li className="flex items-start gap-2"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /><span>Ram Lalla queue before the daily peak (1–2 hrs)</span></li>
                <li className="flex items-start gap-2"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /><span>Kanak Bhawan in the early afternoon at its quietest</span></li>
                <li className="flex items-start gap-2"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /><span>Saryu Ghat for the golden hour before the return</span></li>
                <li className="flex items-start gap-2"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /><span>Back in Varanasi by 9:00 PM with the full day complete</span></li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">⚠️</span>
                <h3 className="text-xl font-bold text-red-600">Leave at 8:00 AM</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-1 flex-shrink-0">✗</span><span>Reach Ayodhya at 11:30 AM</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-1 flex-shrink-0">✗</span><span>Join the midday Ram Lalla queue (4–6 hrs on weekends)</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-1 flex-shrink-0">✗</span><span>Complete darshan between 4:00–5:00 PM</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-1 flex-shrink-0">✗</span><span>Drive back through the evening traffic</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-1 flex-shrink-0">✗</span><span>Reach Varanasi tired, having seen significantly less</span></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6 font-medium">The 5 AM alarm is the itinerary. Everything else organises itself around it.</p>
        </div>
      </section>

      {/* === PACKAGE OPTIONS === */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#2482c2] mb-10">
            One Day, Two Days, or Three Days — Which One Is Right?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packageOptions.map((pkg, i) => (
              <div key={i} className={`rounded-2xl p-6 border ${pkg.color} shadow-md hover:shadow-lg transition-all`}>
                <div className="text-4xl mb-3">{pkg.icon}</div>
                <h3 className={`text-2xl font-bold mb-3 ${pkg.headerColor}`}>{pkg.days}</h3>
                <p className="text-gray-700 leading-relaxed">{pkg.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-[#f0f7ff] border border-[#2482c2]/30 rounded-2xl p-5 text-center">
            <p className="text-gray-700">Multi day 12 seater packages start at <strong className="text-[#2482c2]">Rs 25,000</strong> with driver accommodation included.</p>
            <a href="tel:9044019511" className="inline-flex items-center gap-2 mt-3 bg-[#2482c2] hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              <FaPhoneAlt /> Call 9044019511 to Build Your Tour
            </a>
          </div>
        </div>
      </section>

      {/* === VEHICLE GUIDE === */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <MdDirectionsBus className="text-[#2482c2] text-3xl" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2482c2]">Which Tempo Traveller for Which Group</h2>
          </div>
          <p className="text-gray-600 mb-8">The question is not which vehicle sounds right — it is which vehicle is right for the specific group you actually have.</p>
          <div className="space-y-4">
            {vehicleGuide.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:border-[#2482c2]/40 transition-all flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-block bg-[#2482c2] text-white font-bold px-4 py-2 rounded-xl text-sm">{v.size}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 mb-1">{v.for}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
                <div className="flex-shrink-0">
                  <p className="font-bold text-[#2482c2] text-sm">{v.fare}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === PRE-DEPARTURE CHECKLIST === */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#2482c2] mb-8">
            Before Anyone Gets in the Vehicle — Five Things
          </h2>
          <div className="space-y-4">
            {preDepartureChecklist.map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#f7fbff] rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#2482c2] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">{i + 1}</div>
                <div>
                  <p className="font-bold text-gray-800 mb-1">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === WHY YATRA === */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#2482c2] mb-8">
            Why Yatra Travel India for Varanasi to Ayodhya?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <MdDirectionsBus className="text-3xl" />, title: "Vehicle at Pickup on Time", desc: "The vehicle at the pickup point at the time agreed. Not approximately, not 5 minutes late." },
              { icon: <FaMapMarkerAlt className="text-3xl" />, title: "Driver Who Knows Ayodhya", desc: "Familiar with the new road layout, designated pilgrimage vehicle parking, and accessible entry points for elderly passengers." },
              { icon: <FaStar className="text-3xl" />, title: "Fare That Doesn't Change", desc: "A fare that does not change between the booking call and the return to Varanasi. That is the whole promise." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="w-16 h-16 bg-[#2482c2] text-white rounded-full flex items-center justify-center mx-auto mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FAQs === */}
      <section className="max-w-4xl mx-auto my-12 px-4">
        <h2 className="text-3xl font-bold text-center text-[#2482c2] mb-8">
          Frequently Asked Questions — Varanasi to Ayodhya Tempo Traveller
        </h2>
        <div className="space-y-1">
          {faqs.map((faq, i) => (
            <FaqItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-[#2482c2] py-12 px-6 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Book Your Varanasi to Ayodhya Tempo Traveller?</h2>
        <p className="text-white/80 mb-6 max-w-2xl mx-auto">Vehicle confirmed, driver assigned, fare locked. Everything sorted before the pilgrimage begins.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:9044019511" className="flex items-center justify-center gap-2 bg-white text-[#2482c2] hover:bg-orange-50 font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg">
            <FaPhoneAlt /> Call 9044019511
          </a>
          <a href="https://wa.me/919044019511" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg">
            <FaWhatsapp /> WhatsApp Us
          </a>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919044019511"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-green-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <FaWhatsapp size={32} color="#fff" />
      </a>

      <Footer />
    </>
  );
}
