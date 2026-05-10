import { useState } from "react";
import { Link } from "react-router";
import { User, Phone, Lock, Save, Settings, LogOut, MapPin } from "lucide-react";

interface MyPost {
  id: string;
  title: string;
  location: string;
  salary: string;
  image: string;
}

const mockMyPosts: MyPost[] = [
  {
    id: "1",
    title: "Tozalovchi",
    location: "Toshkent, Chilonzor",
    salary: "3-5 mln/oy",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Bog'bon",
    location: "Toshkent, Yunusobod",
    salary: "3-4 mln/oy",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
  },
];

export function ProfilePage() {
  const [name, setName] = useState("Javohir Davlatov");
  const [jobType, setJobType] = useState("Tozalovchi");
  const [phone, setPhone] = useState("+998 90 123 45 67");
  const [username, setUsername] = useState("javohir_2024");
  const [password, setPassword] = useState("••••••••");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="relative h-32 bg-gradient-to-br from-primary via-primary to-secondary">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-3xl font-bold border-4 border-background shadow-xl">
              JD
            </div>
          </div>
        </div>

        <div className="pt-14 px-4 pb-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">{name}</h1>
          <p className="text-muted-foreground mt-1">{jobType}</p>
        </div>

        <div className="px-4 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-3">Mening e'lonlarim</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {mockMyPosts.map((post) => (
              <Link
                key={post.id}
                to={`/job/${post.id}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-foreground line-clamp-1 mb-1">{post.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="line-clamp-1">{post.location}</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <span className="text-xs font-bold text-primary">{post.salary}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4">
          <h2 className="text-lg font-bold text-foreground mb-3">Profilni tahrirlash</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {success && (
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl">
                <p className="text-sm text-primary font-medium">Profil muvaffaqiyatli yangilandi!</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                To'liq ism
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="jobType" className="block text-sm font-semibold text-foreground mb-2">
                Kasb turi
              </label>
              <input
                id="jobType"
                type="text"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
                className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Masalan: Tozalovchi, Haydovchi"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                Telefon raqam
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-foreground mb-2">
                Foydalanuvchi nomi
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Parol
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              <span>O'zgarishlarni saqlash</span>
            </button>
          </form>
        </div>

        <div className="px-4 mt-6 space-y-2">
          <button className="w-full px-4 py-3 bg-card border border-border rounded-xl hover:bg-muted transition-colors flex items-center gap-3 text-left">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Sozlamalar</span>
          </button>
          <button className="w-full px-4 py-3 bg-card border border-border rounded-xl hover:bg-destructive/10 transition-colors flex items-center gap-3 text-left">
            <LogOut className="w-5 h-5 text-destructive" />
            <span className="font-medium text-destructive">Chiqish</span>
          </button>
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
