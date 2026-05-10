import { useState } from "react";
import { Link } from "react-router";
import { Search, SlidersHorizontal, MapPin, X } from "lucide-react";

interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
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
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Haydovchi",
    company: "Yandex Taxi",
    location: "Toshkent",
    salary: "4-7 mln/oy",
    type: "Erkin grafik",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Oshpaz",
    company: "Samarkand Darvoza",
    location: "Samarqand",
    salary: "4-6 mln/oy",
    type: "To'liq ish kuni",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Bog'bon",
    company: "Green Garden",
    location: "Toshkent, Yunusobod",
    salary: "3-4 mln/oy",
    type: "Mavsumiy",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    title: "Enaga",
    company: "Kids Care",
    location: "Toshkent, Mirzo Ulug'bek",
    salary: "2.5-3.5 mln/oy",
    type: "To'liq ish kuni",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    title: "Duradgor",
    company: "Mebelchi Usta",
    location: "Andijon",
    salary: "5-8 mln/oy",
    type: "Shartnoma",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
  },
];

export function SearchJobsPage() {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    location: "",
  });

  const filteredJobs = mockJobs.filter((job) => {
    const matchesQuery =
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase());
    const matchesType = !filters.type || job.type === filters.type;
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    return matchesQuery && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Ish izlash</h1>
          <p className="text-muted-foreground">Minglab e'lonlar ichidan toping</p>
        </div>

        <div className="px-4 pb-4">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ish nomi, kompaniya..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
                showFilters
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:bg-muted"
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {showFilters && (
            <div className="p-4 bg-card border border-border rounded-xl mb-4 space-y-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Filtrlar</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Ish turi</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Hammasi</option>
                  <option value="To'liq ish kuni">To'liq ish kuni</option>
                  <option value="Erkin grafik">Erkin grafik</option>
                  <option value="Mavsumiy">Mavsumiy</option>
                  <option value="Shartnoma">Shartnoma</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Joylashuv</label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  placeholder="Shahar yoki viloyat"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                onClick={() => setFilters({ type: "", location: "" })}
                className="w-full px-4 py-2 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors"
              >
                Tozalash
              </button>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredJobs.length} ta ish topildi
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredJobs.map((job) => (
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
                  <div className="pt-2 border-t border-border">
                    <span className="text-xs font-bold text-primary">{job.salary}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Hech narsa topilmadi</h3>
              <p className="text-sm text-muted-foreground">
                Qidiruv so'rovingizni yoki filtrlarni o'zgartiring
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
