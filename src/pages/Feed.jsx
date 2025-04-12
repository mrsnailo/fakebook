import AddPost from "../components/posts/AddPost";

export default function Feed() {
  return (
    <div className="home-container flex justify-center">
      <div className="feed">
        {/* Post section  */}
        <section className="my-5 w-[500px]">
          <AddPost />
        </section>
      </div>
    </div>
  );
}
