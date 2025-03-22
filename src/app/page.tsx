export default function Home() {
  return (
    <main className="flex flex-col w-full bg-main-background">
      <div className="h-14 w-full">
        <span>Друзья</span>
        <button>в сети</button>
        <button>все</button>
        <button>Добавить в друзья</button>
      </div>
      <div className="h-full w-full">friend list</div>
    </main>
  );
}
