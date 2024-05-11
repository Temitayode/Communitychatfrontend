import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CommunityTopic from "../../components/CommunityTopic/CommunityTopic";

const Bookmarks = () => {
  const [topics, setTopics] = useState([]);
  console.log("🚀 ~ Bookmarks ~ topics:", topics);
  const [refetchTopics, setRefetchTopics] = useState(false);

  useEffect(() => {
    const getTopics = async () => {
      const res = await fetch(`/api/community/topics?bookmarks=true`);

      const data = await res.json();
      if (!data.success) {
        return toast.error(data.msg);
      }
      setTopics(data.data);
    };
    getTopics();
  }, [refetchTopics]);

  const handleBookmark = async (payload) => {
    const res = await fetch("/api/community/topics/bookmarks/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!data.success) {
      return toast.error(data.msg);
    }
    toast.success(data.msg);
    setRefetchTopics(!refetchTopics);
  };

  return (
    <section className="space-y-5">
      {topics.length > 0 ? (
        <div className="space-y-8">
          {topics &&
            topics.map((topic) => (
              <CommunityTopic
                key={topic._id}
                {...topic}
                showBookMark={true}
                handleBookmark={handleBookmark}
              />
            ))}
        </div>
      ) : (
        <div className="w-full mt-20 flex items-center justify-center text-[#bb350c]">
          No bookmarks yet...
        </div>
      )}
    </section>
  );
};

export default Bookmarks;
