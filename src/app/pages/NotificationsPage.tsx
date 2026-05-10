import { Bell, BriefcaseIcon, MessageSquare, UserPlus, Clock } from "lucide-react";

interface Notification {
  id: string;
  type: "job" | "message" | "follow" | "system";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "job",
    title: "Yangi ish topildi",
    description: "Tozalovchi lavozimi sizning profilingizga mos keladi",
    time: "2 daqiqa oldin",
    read: false,
  },
  {
    id: "2",
    type: "message",
    title: "Comfort Clean'dan xabar",
    description: "Tozalovchi lavozimi bo'yicha gaplashishni xohlaymiz",
    time: "1 soat oldin",
    read: false,
  },
  {
    id: "3",
    type: "follow",
    title: "Yangi obunachi",
    description: "Green Garden sizni kuzatmoqda",
    time: "3 soat oldin",
    read: true,
  },
  {
    id: "4",
    type: "job",
    title: "Arizangiz ko'rildi",
    description: "Kids Care haydovchi lavozimiga arizangizni ko'rdi",
    time: "5 soat oldin",
    read: true,
  },
  {
    id: "5",
    type: "system",
    title: "Profil to'ldirildi",
    description: "Profilingiz 100% to'ldirilgan va ish beruvchilarga ko'rinadi",
    time: "1 kun oldin",
    read: true,
  },
];

export function NotificationsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case "job":
        return <BriefcaseIcon className="w-5 h-5" />;
      case "message":
        return <MessageSquare className="w-5 h-5" />;
      case "follow":
        return <UserPlus className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-3xl font-bold text-foreground">Xabarlar</h1>
        <p className="text-muted-foreground mt-1">Faoliyatingizdan xabardor bo'ling</p>
      </div>

      <div className="px-4 space-y-2">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-xl bg-card border border-border transition-all ${
              !notification.read ? "bg-primary/5 border-primary/20" : ""
            }`}
          >
            <div className="flex gap-3">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  !notification.read
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground">{notification.title}</h3>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                  {notification.description}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{notification.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
