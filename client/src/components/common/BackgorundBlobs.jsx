export default function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute bottom-0 right-1 w-[600px] h-[400px] bg-fuchsia-400/20 rounded-full blur-[240px]" />
      <div className="absolute top-5 left-1/4 w-[600px] h-[800px] bg-cyan-600/30 rounded-full blur-[240px]" />
    </div>
  );
}
