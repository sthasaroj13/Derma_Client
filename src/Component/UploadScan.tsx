const UploadScan: React.FC = () => {
  return (
    <section className="py-16 bg-orange-50 px-6 text-center">
      <h2 className="text-3xl font-bold text-orange-700 mb-6">
        Try Derma AI Now
      </h2>
      <p className="text-orange-900 mb-8">
        Upload a clear photo of your face or skin area and let our AI do the
        rest.
      </p>
      <input
        type="file"
        accept="image/*"
        className="mb-4 border border-orange-400 p-2 rounded-md"
      />
      <br />
      <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600">
        Analyze Skin
      </button>
    </section>
  );
};

export default UploadScan;
