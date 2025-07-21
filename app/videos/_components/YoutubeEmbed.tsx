type YouTubeEmbedProps = {
  videoId: string;
};

export default function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 h-full w-full"
      ></iframe>
    </div>
  );
}
