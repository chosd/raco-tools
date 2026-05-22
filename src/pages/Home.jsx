import Layout from "../components/common/Layout";

export default function Home() {
  return (
    <Layout>
      <div>
        <h2 className="text-3xl font-bold mb-4">
          Developer Utilities
        </h2>

        <p className="text-zinc-400">
          개인 개발용 툴 모음
        </p>
      </div>
    </Layout>
  );
}