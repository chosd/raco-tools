export default function ImageUpload({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    onUpload(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
}