import { useState } from "react";
import { Link } from "react-router";
import { Search, SlidersHorizontal, MapPin, Clock, Flame, Users2 } from "lucide-react";

interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedTime: string;
  applicants: number;
  image: string;
}

const mockJobs: JobPost[] = [
  {
    id: "1",
    title: "Tozalovchi",
    company: "Comfort Clean",
    location: "Toshkent, Chilonzor",
    salary: "3-5 mln/oy",
    type: "To'liq ish kuni",
    postedTime: "2 soat oldin",
    applicants: 12,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Haydovchi",
    company: "Yandex Taxi",
    location: "Toshkent",
    salary: "4-7 mln/oy",
    type: "Erkin grafik",
    postedTime: "5 soat oldin",
    applicants: 28,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Oshpaz",
    company: "Samarkand Darvoza",
    location: "Samarqand",
    salary: "4-6 mln/oy",
    type: "To'liq ish kuni",
    postedTime: "1 kun oldin",
    applicants: 19,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Bog'bon",
    company: "Green Garden",
    location: "Toshkent, Yunusobod",
    salary: "3-4 mln/oy",
    type: "Mavsumiy",
    postedTime: "1 kun oldin",
    applicants: 8,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    title: "Enaga",
    company: "Kids Care",
    location: "Toshkent, Mirzo Ulug'bek",
    salary: "2.5-3.5 mln/oy",
    type: "To'liq ish kuni",
    postedTime: "2 kun oldin",
    applicants: 15,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    title: "Duradgor",
    company: "Mebelchi Usta",
    location: "Andijon",
    salary: "5-8 mln/oy",
    type: "Shartnoma",
    postedTime: "3 kun oldin",
    applicants: 22,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
  },
];

export function HomePage() {
  const [activeFilter, setActiveFilter] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");

  const filterButtons = [
    { id: "recommended", label: "Siz uchun", icon: Flame },
    { id: "today", label: "Bugungi e'lonlar", icon: Clock },
    { id: "hiring", label: "Ko'p ishchi kerak", icon: Users2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto">
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <h1
              className="text-5xl font-bold tracking-tight text-primary"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
            >
              POLVON
            </h1>
            <Link
              to="/profile"
              className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              JD
            </Link>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ish izlash, kompaniya..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <button className="w-12 h-12 flex items-center justify-center bg-card border border-border rounded-xl hover:bg-muted transition-colors active:scale-95">
              <SlidersHorizontal className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {filterButtons.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-foreground border border-border hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {mockJobs.map((job) => (
              <Link
                key={job.id}
                to={`/job/${job.id}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 active:scale-98"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold">
                    {job.type}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-foreground line-clamp-1 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{job.company}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="line-clamp-1">{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs font-bold text-primary">{job.salary}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users2 className="w-3 h-3" />
                      <span>{job.applicants}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
