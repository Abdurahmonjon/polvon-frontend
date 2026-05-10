import { useState } from "react";
import { Search, MessageCircle, MoreVertical } from "lucide-react";

interface Chat {
  id: string;
  name: string;
  company: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Akmal Rahimov",
    company: "Comfort Clean",
    lastMessage: "Arizangiz qabul qilindi! Intervyu uchun qachon kelishingiz mumkin?",
    timestamp: "2 daq",
    unread: 2,
    avatar: "AR",
    online: true,
  },
  {
    id: "2",
    name: "Dilshod Karimov",
    company: "Yandex Taxi",
    lastMessage: "Haydovchi lavozimi bo'yicha gaplashishni xohlaymiz",
    timestamp: "1 soat",
    unread: 1,
    avatar: "DK",
    online: true,
  },
  {
    id: "3",
    name: "Nigora Azimova",
    company: "Kids Care",
    lastMessage: "Tajribangiz juda yaxshi! Keyingi bosqich haqida gaplashamiz",
    timestamp: "3 soat",
    unread: 0,
    avatar: "NA",
    online: false,
  },
  {
    id: "4",
    name: "Jamshid Mahmudov",
    company: "Green Garden",
    lastMessage: "Murojaat uchun rahmat. Ko'rib chiqaman va javob beraman",
    timestamp: "1 kun",
    unread: 0,
    avatar: "JM",
    online: false,
  },
  {
    id: "5",
    name: "Sevara Toshmatova",
    company: "Mebelchi Usta",
    lastMessage: "Uchrashuvda ko'rishganimizdan xursand bo'ldim!",
    timestamp: "2 kun",
    unread: 0,
    avatar: "ST",
    online: false,
  },
];

export function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-3xl font-bold text-foreground">Xabarlar</h1>
        <p className="text-muted-foreground mt-1">Ish beruvchilar va ishchilar bilan aloqa</p>
      </div>

      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Suhbatlarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="space-y-1 px-2">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                {chat.avatar}
              </div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground flex-shrink-0">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.company}</p>
              <p className="text-sm text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {chat.unread > 0 && (
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                  {chat.unread}
                </div>
              )}
              <button className="p-1 hover:bg-muted rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredChats.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <MessageCircle className="w-16 h-16 text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground text-center">Suhbatlar topilmadi</p>
        </div>
      )}
    </div>
  );
}
