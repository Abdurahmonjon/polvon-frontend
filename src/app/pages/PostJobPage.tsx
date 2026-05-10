import { useState } from "react";
import { useNavigate } from "react-router";
import { Briefcase, MapPin, DollarSign, Upload, X } from "lucide-react";

export function PostJobPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages([...images, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4 pt-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">E'lon berish</h1>
          <p className="text-muted-foreground mt-1">Ish e'loningizni joylashtiring</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
              Ish nomi
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Masalan: Tozalovchi, Haydovchi"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
              Ish tavsifi
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
              className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              placeholder="Ish haqida batafsil yozing: vaqt, talablar, va boshqalar..."
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-foreground mb-2">
              Joylashuv
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Masalan: Toshkent, Chilonzor"
              />
            </div>
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-semibold text-foreground mb-2">
              Ish haqi
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="salary"
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Masalan: 3-5 mln/oy"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Rasmlar (5 tagacha)
            </label>
            <div className="space-y-3">
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {images.length < 5 && (
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Rasm yuklash</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="pt-4 pb-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-98"
            >
              {loading ? "Joylashtirilmoqda..." : "E'lon berish"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
