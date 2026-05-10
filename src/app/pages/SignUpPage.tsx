import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Phone, User, Lock, Check } from "lucide-react";

export function SignUpPage() {
  const [step, setStep] = useState<"phone" | "verify" | "details">("phone");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jobType, setJobType] = useState("");
  const [isJobSeeker, setIsJobSeeker] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("verify");
    }, 1000);
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (verificationCode === "1234") {
        setLoading(false);
        setStep("details");
      } else {
        setError("Kod noto'g'ri. Qaytadan urinib ko'ring.");
        setLoading(false);
      }
    }, 1000);
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              {step === "phone" && <Phone className="w-8 h-8 text-primary" />}
              {step === "verify" && <Check className="w-8 h-8 text-primary" />}
              {step === "details" && <User className="w-8 h-8 text-primary" />}
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {step === "phone" && "Ro'yxatdan o'tish"}
              {step === "verify" && "Kodni tasdiqlash"}
              {step === "details" && "Ma'lumotlarni to'ldirish"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {step === "phone" && "Telefon raqamingizni kiriting"}
              {step === "verify" && "SMS orqali yuborilgan kodni kiriting"}
              {step === "details" && "Profilingizni yakunlang"}
            </p>
          </div>

          {step === "phone" && (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

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
                    className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-98"
              >
                {loading ? "Yuborilmoqda..." : "Davom etish"}
              </button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Akkauntingiz bormi?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Kirish
                  </Link>
                </p>
              </div>
            </form>
          )}

          {step === "verify" && (
            <form onSubmit={handleVerifySubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="code" className="block text-sm font-semibold text-foreground mb-2">
                  Tasdiqlash kodi
                </label>
                <input
                  id="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  maxLength={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-center text-2xl tracking-widest font-bold"
                  placeholder="1234"
                />
              </div>

              <p className="text-sm text-center text-muted-foreground">
                {phone} raqamiga kod yuborildi
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-98"
              >
                {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
              </button>

              <button
                type="button"
                onClick={() => setStep("phone")}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Raqamni o'zgartirish
              </button>
            </form>
          )}

          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                  <p className="text-sm text-destructive">{error}</p>
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
                    className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Javohir Davlatov"
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
                    className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="javohir_2024"
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
                    minLength={6}
                    className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Siz kimisiz?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsJobSeeker(true)}
                    className={`px-4 py-3 border-2 rounded-xl text-sm font-medium transition-all ${
                      isJobSeeker
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    Ishchi
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsJobSeeker(false)}
                    className={`px-4 py-3 border-2 rounded-xl text-sm font-medium transition-all ${
                      !isJobSeeker
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    Ish beruvchi
                  </button>
                </div>
              </div>

              {isJobSeeker && (
                <div>
                  <label htmlFor="jobType" className="block text-sm font-semibold text-foreground mb-2">
                    Kasb turi
                  </label>
                  <input
                    id="jobType"
                    type="text"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    required={isJobSeeker}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Masalan: Tozalovchi, Haydovchi"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-98"
              >
                {loading ? "Yaratilmoqda..." : "Ro'yxatdan o'tish"}
              </button>
            </form>
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
