import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { MapPin, Clock, Phone, MessageCircle, ChevronLeft, Share2, Heart } from "lucide-react";

const mockJobs = [
  {
    id: "1",
    title: "Tozalovchi",
    company: "Comfort Clean",
    location: "Toshkent, Chilonzor",
    salary: "3-5 mln/oy",
    type: "To'liq ish kuni",
    postedTime: "2 soat oldin",
    description:
      "Bizga tajribali va mas'uliyatli tozalovchi kerak. Ish vaqti ertalab 8:00 dan kechqurun 18:00 gacha. Haftada 6 kun ish. Tushlik va ariza berish vaqti beriladi. Barcha zarur jihozlar va kimyoviy moddalar kompaniya tomonidan ta'minlanadi.",
    posterName: "Akmal Rahimov",
    posterPhone: "+998 90 123 45 67",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&h=600&fit=crop",
    ],
  },
];

export function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const job = mockJobs[0];

  const similarJobs = [
    {
      id: "2",
      title: "Haydovchi",
      company: "Yandex Taxi",
      location: "Toshkent",
      salary: "4-7 mln/oy",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
    },
    {
      id: "3",
      title: "Oshpaz",
      company: "Samarkand Darvoza",
      location: "Samarqand",
      salary: "4-6 mln/oy",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setSaved(!saved)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Heart className={`w-5 h-5 ${saved ? "fill-primary text-primary" : "text-foreground"}`} />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        <div className="aspect-[4/3] relative bg-muted">
          <img
            src={job.images[currentImage]}
            alt={job.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">
            {currentImage + 1}/{job.images.length}
          </div>
        </div>

        <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {job.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                currentImage === idx ? "border-primary" : "border-border"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <div className="px-4 py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Clock className="w-4 h-4" />
            <span>{job.postedTime}</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">{job.title}</h1>
          <p className="text-base text-muted-foreground mb-3">{job.company}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="px-3 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary">
              {job.salary}
            </div>
            <div className="px-3 py-1.5 bg-card border border-border rounded-full text-sm">
              {job.type}
            </div>
          </div>

          <div className="border-t border-border pt-4 mb-4">
            <h2 className="text-lg font-bold text-foreground mb-2">Ta'rif</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
          </div>

          <div className="flex items-start justify-between p-4 bg-card border border-border rounded-xl mb-4">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">E'lon beruvchi</p>
              <p className="font-semibold text-foreground mb-1">{job.posterName}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-bold text-foreground mb-3">O'xshash ishlar</h2>
            <div className="space-y-2">
              {similarJobs.map((similar) => (
                <Link
                  key={similar.id}
                  to={`/job/${similar.id}`}
                  className="flex gap-3 p-3 bg-card border border-border rounded-xl hover:shadow-md transition-all"
                >
                  <img
                    src={similar.image}
                    alt={similar.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">{similar.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{similar.company}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary">{similar.salary}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{similar.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="fixed bottom-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-10">
          <div className="max-w-md mx-auto flex gap-3">
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="flex-1 px-6 py-4 bg-card border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>{showPhone ? job.posterPhone : "Qo'ng'iroq"}</span>
            </button>
            <button
              onClick={() => navigate("/chat")}
              className="flex-1 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Yozish</span>
            </button>
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
